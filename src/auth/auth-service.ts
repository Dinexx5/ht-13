import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../application/users.service';
import ObjectId = module;
import * as module from 'module';
import { Token, TokenDocument } from '../domain/token.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TokenRepository } from '../repos/token.repository';
import { DevicesService } from '../application/devices.service';
import { createUserModel, newPasswordModel } from '../domain/users.schema';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { EmailAdapter } from '../adapters/email.adapter';
import { Device, DeviceDocument } from '../domain/devices.schema';
import { DevicesRepository } from '../repos/devices.repository';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailAdapter: EmailAdapter,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    protected tokenRepository: TokenRepository,
    protected devicesService: DevicesService,
    protected devicesRepository: DevicesRepository,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByLoginOrEmail(username);
    if (user) {
      return user._id;
    }
    return null;
  }

  async createJwtAccessToken(userId: ObjectId) {
    const payload = { userId: userId };
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '6000s',
    });
    console.log(accessToken);
    return accessToken;
  }
  async createJwtRefreshToken(
    userId: mongoose.Schema.Types.ObjectId,
    deviceName: string,
    ip: string,
  ) {
    const deviceId = new Date().toISOString();
    const payload = { userId: userId, deviceId: deviceId };
    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '6000s',
    });
    const result = this.jwtService.verify(refreshToken, { secret: jwtConstants.secret });
    const issuedAt = new Date(result.iat * 1000).toISOString();
    const expiredAt = new Date(result.exp * 1000).toISOString();
    const tokenMetaDTO = {
      _id: new mongoose.Types.ObjectId(),
      issuedAt: issuedAt,
      userId: userId,
      deviceId: deviceId,
      deviceName: deviceName,
      ip: ip,
      expiredAt: expiredAt,
    };
    const tokenInstance = new this.tokenModel(tokenMetaDTO);
    await this.tokenRepository.save(tokenInstance);
    await this.devicesService.createDevice(userId, ip, deviceName, deviceId, issuedAt);
    return refreshToken;
  }
  async updateJwtRefreshToken(refreshToken: string) {
    const result: any = await this.getTokenInfo(refreshToken);
    const { deviceId, userId, exp } = result;
    const previousExpirationDate = new Date(exp * 1000).toISOString();
    const tokenInstance: TokenDocument = await this.tokenRepository.findToken(
      previousExpirationDate,
    );
    if (!tokenInstance) throw new UnauthorizedException();
    const newPayload = { userId: userId, deviceId: deviceId };
    const newRefreshToken = this.jwtService.sign(newPayload);
    const newResult: any = await this.getTokenInfo(newRefreshToken);
    const newIssuedAt = new Date(newResult.iat * 1000).toISOString();
    const newExpiredAt = new Date(newResult.exp * 1000).toISOString();
    tokenInstance.expiredAt = newExpiredAt;
    tokenInstance.issuedAt = newIssuedAt;
    await this.tokenRepository.save(tokenInstance);
    return newRefreshToken;
  }
  async getTokenInfo(token: string) {
    try {
      const result: any = this.jwtService.verify(token, { secret: jwtConstants.secret });
      return result;
    } catch (error) {
      return null;
    }
  }
  async deleteCurrentToken(token: string) {
    const result: any = await this.getTokenInfo(token);
    const expirationDate = new Date(result.exp * 1000).toISOString();
    const tokenInstance: TokenDocument = await this.tokenRepository.findToken(expirationDate);
    if (!tokenInstance) throw new UnauthorizedException();
    await tokenInstance.deleteOne();
  }
  async deleteDeviceForLogout(token: string) {
    const result: any = await this.getTokenInfo(token);
    const deviceId = result.deviceId;
    const deviceInstance = await this.devicesRepository.findDeviceById(deviceId);
    await deviceInstance.deleteOne();
  }
  async deleteAllSessionsWithoutActive(refreshToken: string, userId: mongoose.Types.ObjectId) {
    const result = await this.getTokenInfo(refreshToken);
    await this.devicesRepository.deleteAllSessionsWithoutActive(result.deviceId, userId);
  }
  async createUser(inputModel: createUserModel) {
    const passwordHash = await this.usersService.generateHash(inputModel.password);
    const userDTO = {
      _id: new mongoose.Types.ObjectId(),
      accountData: {
        login: inputModel.login,
        passwordHash: passwordHash,
        email: inputModel.email,
        createdAt: new Date().toISOString(),
      },
      emailConfirmation: {
        confirmationCode: uuidv4(),
        expirationDate: add(new Date(), {
          hours: 1,
        }),
        isConfirmed: false,
      },
      passwordRecovery: {
        recoveryCode: null,
        expirationDate: null,
      },
    };
    const userInstance = await this.usersService.saveUser(userDTO);
    try {
      await this.emailAdapter.sendEmailForConfirmation(
        inputModel.email,
        userInstance.emailConfirmation.confirmationCode,
      );
    } catch (error) {
      console.error(error);
      return null;
    }
    return userInstance;
  }
  async resendEmail(email: string): Promise<boolean> {
    const confirmationCode = uuidv4();
    try {
      await this.emailAdapter.sendEmailForConfirmation(email, confirmationCode);
    } catch (error) {
      console.error(error);
      return false;
    }
    const isUpdated = await this.usersService.updateCode(email, confirmationCode);
    if (!isUpdated) return false;
    return true;
  }
  async confirmEmail(code: string): Promise<boolean> {
    const isConfirmed = await this.usersService.updateConfirmation(code);
    if (!isConfirmed) return false;
    return true;
  }
  async sendEmailForPasswordRecovery(email: string): Promise<boolean> {
    const confirmationCode = uuidv4();
    const isUpdated = await this.usersService.updateRecoveryCode(email, confirmationCode);
    if (!isUpdated) return false;
    try {
      await this.emailAdapter.sendEmailForPasswordRecovery(email, confirmationCode);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
  async updatePassword(inputModel: newPasswordModel): Promise<boolean> {
    const isUpdated = await this.usersService.updatePassword(inputModel);
    if (!isUpdated) return false;
    return true;
  }
}
