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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth-service");
const devices_service_1 = require("../application/devices.service");
const mongoose_1 = __importDefault(require("mongoose"));
const jwt_refresh_guard_1 = require("../auth/guards/jwt-refresh.guard");
const devices_repository_1 = require("../repos/devices.repository");
let DevicesController = class DevicesController {
    constructor(authService, devicesService, devicesRepository) {
        this.authService = authService;
        this.devicesService = devicesService;
        this.devicesRepository = devicesRepository;
    }
    async getActiveSessions(req, res) {
        const userId = new mongoose_1.default.Types.ObjectId(req.user.userId);
        const foundDevices = await this.devicesService.findActiveDevices(userId);
        return res.send(foundDevices);
    }
    async deleteAllSessions(req, res) {
        const userId = new mongoose_1.default.Types.ObjectId(req.user.userId);
        await this.devicesRepository.deleteAllSessionsWithoutActive(req.user.deviceId, userId);
        return res.sendStatus(204);
    }
    async deleteSession(req, deviceId, res) {
        const userId = new mongoose_1.default.Types.ObjectId(req.user.userId);
        const status = await this.devicesService.deleteSessionById(userId, req.user.deviceId);
        return res.sendStatus(+status);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshAuthGuard),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "getActiveSessions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshAuthGuard),
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "deleteAllSessions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "deleteSession", null);
DevicesController = __decorate([
    (0, common_1.Controller)('/security/devices'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        devices_service_1.DevicesService,
        devices_repository_1.DevicesRepository])
], DevicesController);
exports.DevicesController = DevicesController;
//# sourceMappingURL=devices.controller.js.map