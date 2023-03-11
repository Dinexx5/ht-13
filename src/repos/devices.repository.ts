import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument } from '../domain/devices.schema';

@Injectable()
export class DevicesRepository {
  constructor(@InjectModel(Device.name) private deviceModel: Model<DeviceDocument>) {}

  async findDeviceById(deviceId: string) {
    return this.deviceModel.findOne({ deviceId: deviceId });
  }
  async findSessions(userId: mongoose.Types.ObjectId) {
    return this.deviceModel.find({ userId: userId });
  }
  async deleteAllSessionsWithoutActive(deviceId: string, userId: mongoose.Types.ObjectId) {
    await this.deviceModel.deleteMany({
      $and: [{ userId: userId }, { deviceId: { $ne: deviceId } }],
    });
  }
  async findSessionByDeviceId(deviceId: string) {
    return this.deviceModel.findOne({ deviceId: deviceId });
  }
  async save(instance: any) {
    instance.save();
  }
}
