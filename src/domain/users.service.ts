import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  createUserModel,
  User,
  UserDocument,
  userViewModel,
} from './users.schema';
import { UsersRepository } from '../repos/users.repository';

@Injectable()
export class UsersService {
  constructor(
    protected usersRepository: UsersRepository,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(inputModel: createUserModel): Promise<userViewModel> {
    const userDTO = {
      _id: new mongoose.Types.ObjectId(),
      login: inputModel.login,
      password: inputModel.password,
      email: inputModel.email,
      createdAt: new Date().toISOString(),
    };
    const userInstance: UserDocument = new this.userModel(userDTO);
    await this.usersRepository.save(userInstance);

    return {
      id: userInstance._id.toString(),
      login: userInstance.login,
      email: userInstance.email,
      createdAt: userInstance.createdAt,
    };
  }
  async deleteUserById(userId: string): Promise<boolean> {
    const _id = new mongoose.Types.ObjectId(userId);
    const userInstance = await this.usersRepository.findUserInstance(_id);
    if (!userInstance) return false;
    await userInstance.deleteOne();
    return true;
  }
}
