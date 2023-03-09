/// <reference types="node" />
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../application/users.service';
import ObjectId = module;
import * as module from 'module';
import { TokenDocument } from '../domain/token.schema';
import mongoose, { Model } from 'mongoose';
import { TokenRepository } from '../repos/token.repository';
import { DevicesService } from '../application/devices.service';
import { createUserModel, newPasswordModel } from '../domain/users.schema';
import { EmailAdapter } from '../adapters/email.adapter';
import { DeviceDocument } from '../domain/devices.schema';
import { DevicesRepository } from '../repos/devices.repository';
export declare class AuthService {
    private readonly emailAdapter;
    private readonly usersService;
    private readonly jwtService;
    protected tokenRepository: TokenRepository;
    protected devicesService: DevicesService;
    protected devicesRepository: DevicesRepository;
    private tokenModel;
    private deviceModel;
    constructor(emailAdapter: EmailAdapter, usersService: UsersService, jwtService: JwtService, tokenRepository: TokenRepository, devicesService: DevicesService, devicesRepository: DevicesRepository, tokenModel: Model<TokenDocument>, deviceModel: Model<DeviceDocument>);
    validateUser(username: string, pass: string): Promise<any>;
    createJwtAccessToken(userId: ObjectId): Promise<string>;
    createJwtRefreshToken(userId: mongoose.Schema.Types.ObjectId, deviceName: string, ip: string): Promise<string>;
    updateJwtRefreshToken(refreshToken: string): Promise<string>;
    getTokenInfo(token: string): Promise<any>;
    deleteCurrentToken(token: string): Promise<void>;
    deleteDeviceForLogout(token: string): Promise<void>;
    deleteAllSessionsWithoutActive(refreshToken: string, userId: mongoose.Types.ObjectId): Promise<void>;
    createUser(inputModel: createUserModel): Promise<mongoose.Document<unknown, any, import("../domain/users.schema").User> & Omit<import("../domain/users.schema").User & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never>>;
    resendEmail(email: string): Promise<boolean>;
    confirmEmail(code: string): Promise<boolean>;
    sendEmailForPasswordRecovery(email: string): Promise<boolean>;
    updatePassword(inputModel: newPasswordModel): Promise<boolean>;
}
