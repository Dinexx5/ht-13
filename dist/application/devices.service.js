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
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const devices_repository_1 = require("../repos/devices.repository");
const devices_schema_1 = require("../domain/devices.schema");
const mongoose_2 = require("@nestjs/mongoose");
let DevicesService = class DevicesService {
    constructor(devicesRepository, deviceModel) {
        this.devicesRepository = devicesRepository;
        this.deviceModel = deviceModel;
    }
    async createDevice(userId, ip, deviceName, deviceId, issuedAt) {
        const deviceDTO = {
            _id: new mongoose_1.default.Types.ObjectId(),
            userId: userId,
            ip: ip,
            title: deviceName,
            deviceId: deviceId,
            lastActiveDate: issuedAt,
        };
        const deviceInstance = new this.deviceModel(deviceDTO);
        await this.devicesRepository.save(deviceInstance);
    }
    async deleteDevice(deviceId) {
        const deviceInstance = await this.devicesRepository.findDeviceById(deviceId);
        await deviceInstance.deleteOne();
    }
};
DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)(devices_schema_1.Device.name)),
    __metadata("design:paramtypes", [devices_repository_1.DevicesRepository,
        mongoose_1.Model])
], DevicesService);
exports.DevicesService = DevicesService;
//# sourceMappingURL=devices.service.js.map