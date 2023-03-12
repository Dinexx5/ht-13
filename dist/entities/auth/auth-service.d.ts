import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TokenDocument } from '../tokens/token.schema';
import mongoose, { Model } from 'mongoose';
import { TokenRepository } from '../tokens/token.repository';
import { DevicesService } from '../devices/devices.service';
import { EmailAdapter } from '../../adapters/email.adapter';
import { DeviceDocument } from '../devices/devices.schema';
import { DevicesRepository } from '../devices/devices.repository';
import { CreateUserModel, NewPasswordModel } from '../users/userModels';
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
    validateUser(username: string, password: string): Promise<any>;
    createJwtAccessToken(userId: mongoose.Types.ObjectId): Promise<string>;
    createJwtRefreshToken(userId: mongoose.Schema.Types.ObjectId, deviceName: string, ip: string): Promise<string>;
    updateJwtRefreshToken(deviceId: string, exp: number, userId: mongoose.Types.ObjectId): Promise<string>;
    getTokenInfo(token: string): Promise<any>;
    deleteCurrentToken(token: string): Promise<void>;
    deleteDeviceForLogout(token: string): Promise<void>;
    createUser(inputModel: CreateUserModel): Promise<mongoose.Document<unknown, any, import("../users/users.schema").User> & Omit<import("../users/users.schema").User & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never>>;
    resendEmail(email: string): Promise<boolean>;
    confirmEmail(code: string): Promise<boolean>;
    sendEmailForPasswordRecovery(email: string): Promise<boolean>;
    updatePassword(inputModel: NewPasswordModel): Promise<boolean>;
}
