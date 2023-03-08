import { Injectable } from '@nestjs/common';
import mongoose, { Model, ObjectId } from 'mongoose';
import { DevicesRepository } from '../repos/devices.repository';
import { Device, DeviceDocument } from '../domain/devices.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DevicesService {
  constructor(
    protected devicesRepository: DevicesRepository,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async createDevice(
    userId: ObjectId,
    ip: string,
    deviceName: string,
    deviceId: string,
    issuedAt: string,
  ) {
    const deviceDTO = {
      _id: new mongoose.Types.ObjectId(),
      userId: userId,
      ip: ip,
      title: deviceName,
      deviceId: deviceId,
      lastActiveDate: issuedAt,
    };
    const deviceInstance = new this.deviceModel(deviceDTO);
    await this.devicesRepository.save(deviceInstance);
  }
  async deleteDevice(deviceId: string) {
    const deviceInstance = await this.devicesRepository.findDeviceById(deviceId);
    await deviceInstance.deleteOne();
  }
}
