import mongoose, { Model, ObjectId } from 'mongoose';
import { DevicesRepository } from '../repos/devices.repository';
import { DeviceDocument, deviceViewModel } from '../domain/devices.schema';
export declare class DevicesService {
    protected devicesRepository: DevicesRepository;
    private deviceModel;
    constructor(devicesRepository: DevicesRepository, deviceModel: Model<DeviceDocument>);
    filter: {
        status: string;
    };
    createDevice(userId: ObjectId, ip: string, deviceName: string, deviceId: string, issuedAt: string): Promise<void>;
    findActiveDevices(userId: mongoose.Types.ObjectId): Promise<deviceViewModel[]>;
    deleteSessionById(userId: mongoose.Types.ObjectId, deviceId: string): Promise<string>;
}
