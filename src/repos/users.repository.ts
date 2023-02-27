import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from '../domain/users.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserInstance(_id: mongoose.Types.ObjectId) {
    const userInstance = await this.userModel.findOne({ _id: _id });
    return userInstance;
  }

  async save(instance: any) {
    instance.save();
  }
}
