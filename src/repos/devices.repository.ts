import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument } from '../domain/devices.schema';

@Injectable()
export class DevicesRepository {
  constructor(@InjectModel(Device.name) private deviceModel: Model<DeviceDocument>) {}

  async findDeviceById(deviceId: string) {
    const deviceInstance = await this.deviceModel.findOne({ deviceId: deviceId });
    return deviceInstance;
  }

  async save(instance: any) {
    instance.save();
  }
}
