"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../application/users.service");
const token_schema_1 = require("../domain/token.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const token_repository_1 = require("../repos/token.repository");
const devices_service_1 = require("../application/devices.service");
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const email_adapter_1 = require("../adapters/email.adapter");
let AuthService = class AuthService {
    constructor(emailAdapter, usersService, jwtService, tokenRepository, devicesService, tokenModel) {
        this.emailAdapter = emailAdapter;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.devicesService = devicesService;
        this.tokenModel = tokenModel;
    }
    async validateUser(username, pass) {
        const user = await this.usersService.findUserByLoginOrEmail(username);
        if (user) {
            return user._id;
        }
        return null;
    }
    async createJwtAccessToken(userId) {
        const payload = { userId: userId };
        return this.jwtService.sign(payload);
    }
    async createJwtRefreshToken(userId, deviceName, ip) {
        const deviceId = new Date().toISOString();
        const payload = { userId: userId, deviceId: deviceId };
        const refreshToken = this.jwtService.sign(payload);
        const result = this.jwtService.verify(refreshToken);
        const issuedAt = new Date(result.iat * 1000).toISOString();
        const expiredAt = new Date(result.exp * 1000).toISOString();
        const tokenMetaDTO = {
            _id: new mongoose_1.default.Types.ObjectId(),
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
    async updateJwtRefreshToken(refreshToken) {
        const result = await this.getRefreshTokenInfo(refreshToken);
        const { deviceId, userId, exp } = result;
        const previousExpirationDate = new Date(exp * 1000).toISOString();
        const tokenInstance = await this.tokenRepository.findToken(previousExpirationDate);
        if (!tokenInstance)
            throw new common_1.UnauthorizedException();
        const newPayload = { userId: userId, deviceId: deviceId };
        const newRefreshToken = this.jwtService.sign(newPayload);
        const newResult = await this.getRefreshTokenInfo(newRefreshToken);
        const newIssuedAt = new Date(newResult.iat * 1000).toISOString();
        const newExpiredAt = new Date(newResult.exp * 1000).toISOString();
        tokenInstance.expiredAt = newExpiredAt;
        tokenInstance.issuedAt = newIssuedAt;
        await this.tokenRepository.save(tokenInstance);
        return newRefreshToken;
    }
    async getRefreshTokenInfo(token) {
        try {
            const result = this.jwtService.verify(token);
            return result;
        }
        catch (error) {
            return null;
        }
    }
    async deleteSession(token) {
        const result = await this.getRefreshTokenInfo(token);
        const expirationDate = new Date(result.exp * 1000).toISOString();
        const tokenInstance = await this.tokenRepository.findToken(expirationDate);
        if (!tokenInstance)
            throw new common_1.UnauthorizedException();
        await tokenInstance.deleteOne();
    }
    async deleteDevice(token) {
        const result = await this.getRefreshTokenInfo(token);
        const deviceId = result.deviceId;
        await this.devicesService.deleteDevice(deviceId);
    }
    async createUser(inputModel) {
        const passwordHash = await this.usersService.generateHash(inputModel.password);
        const userDTO = {
            _id: new mongoose_1.default.Types.ObjectId(),
            accountData: {
                login: inputModel.login,
                passwordHash: passwordHash,
                email: inputModel.email,
                createdAt: new Date().toISOString(),
            },
            emailConfirmation: {
                confirmationCode: (0, uuid_1.v4)(),
                expirationDate: (0, date_fns_1.add)(new Date(), {
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
            await this.emailAdapter.sendEmailForConfirmation(inputModel.email, userInstance.emailConfirmation.confirmationCode);
        }
        catch (error) {
            console.error(error);
            return null;
        }
        return userInstance;
    }
    async resendEmail(email) {
        const confirmationCode = (0, uuid_1.v4)();
        try {
            await this.emailAdapter.sendEmailForConfirmation(email, confirmationCode);
        }
        catch (error) {
            console.error(error);
            return false;
        }
        const isUpdated = await this.usersService.updateCode(email, confirmationCode);
        if (!isUpdated)
            return false;
        return true;
    }
    async confirmEmail(code) {
        const isConfirmed = await this.usersService.updateConfirmation(code);
        if (!isConfirmed)
            return false;
        return true;
    }
    async sendEmailForPasswordRecovery(email) {
        const confirmationCode = (0, uuid_1.v4)();
        const isUpdated = await this.usersService.updateRecoveryCode(email, confirmationCode);
        if (!isUpdated)
            return false;
        try {
            await this.emailAdapter.sendEmailForPasswordRecovery(email, confirmationCode);
        }
        catch (error) {
            console.error(error);
            return false;
        }
        return true;
    }
    async updatePassword(inputModel) {
        const isUpdated = await this.usersService.updatePassword(inputModel);
        if (!isUpdated)
            return false;
        return true;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, mongoose_2.InjectModel)(token_schema_1.Token.name)),
    __metadata("design:paramtypes", [email_adapter_1.EmailAdapter,
        users_service_1.UsersService,
        jwt_1.JwtService,
        token_repository_1.TokenRepository,
        devices_service_1.DevicesService,
        mongoose_1.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth-service.js.map