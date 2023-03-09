import mongoose, { Model } from 'mongoose';
import { Device, DeviceDocument } from '../domain/devices.schema';
export declare class DevicesRepository {
    private deviceModel;
    constructor(deviceModel: Model<DeviceDocument>);
    findDeviceById(deviceId: string): Promise<mongoose.Document<unknown, any, Device> & Omit<Device & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    findSessions(userId: mongoose.Types.ObjectId): Promise<mongoose.LeanDocument<mongoose.Document<unknown, any, Device> & Omit<Device & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>[]>;
    deleteAllSessionsWithoutActive(deviceId: string, userId: mongoose.Types.ObjectId): Promise<void>;
    findSessionByDeviceId(deviceId: string): Promise<mongoose.Document<unknown, any, Device> & Omit<Device & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    save(instance: any): Promise<void>;
}
