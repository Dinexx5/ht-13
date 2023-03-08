import mongoose, { Model } from 'mongoose';
import { createUserModel, newPasswordModel, User, UserDocument, userViewModel } from '../domain/users.schema';
import { UsersRepository } from '../repos/users.repository';
export declare class UsersService {
    protected usersRepository: UsersRepository;
    private userModel;
    constructor(usersRepository: UsersRepository, userModel: Model<UserDocument>);
    createUser(inputModel: createUserModel): Promise<userViewModel>;
    deleteUserById(userId: string): Promise<boolean>;
    findUserByLoginOrEmail(login: string): Promise<UserDocument | null>;
    generateHash(password: string): Promise<string>;
    saveUser(userDTO: any): Promise<mongoose.Document<unknown, any, User> & Omit<User & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never>>;
    updateCode(email: string, code: string): Promise<boolean>;
    updateConfirmation(code: string): Promise<boolean>;
    updateRecoveryCode(email: string, confirmationCode: string): Promise<boolean>;
    updatePassword(inputModel: newPasswordModel): Promise<boolean>;
}
