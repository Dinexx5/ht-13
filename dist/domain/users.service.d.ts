import { Model } from 'mongoose';
import { createUserModel, UserDocument, userViewModel } from './users.schema';
import { UsersRepository } from '../repos/users.repository';
export declare class UsersService {
    protected usersRepository: UsersRepository;
    private userModel;
    constructor(usersRepository: UsersRepository, userModel: Model<UserDocument>);
    createUser(inputModel: createUserModel): Promise<userViewModel>;
    deleteUserById(userId: string): Promise<boolean>;
}
