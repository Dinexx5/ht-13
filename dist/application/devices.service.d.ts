import { Model, ObjectId } from 'mongoose';
import { DevicesRepository } from '../repos/devices.repository';
import { DeviceDocument } from '../domain/devices.schema';
export declare class DevicesService {
    protected devicesRepository: DevicesRepository;
    private deviceModel;
    constructor(devicesRepository: DevicesRepository, deviceModel: Model<DeviceDocument>);
    createDevice(userId: ObjectId, ip: string, deviceName: string, deviceId: string, issuedAt: string): Promise<void>;
    deleteDevice(deviceId: string): Promise<void>;
}
