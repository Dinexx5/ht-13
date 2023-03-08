import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from '../domain/users.schema';
export declare class UsersRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findUserById(_id: mongoose.Types.ObjectId): Promise<mongoose.Document<unknown, any, User> & Omit<User & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    findUserByConfirmationCode(code: string): Promise<mongoose.Document<unknown, any, User> & Omit<User & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    findUserByRecoveryCode(code: string): Promise<mongoose.Document<unknown, any, User> & Omit<User & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    findUserByLoginOrEmail(loginOrEmail: string): Promise<mongoose.Document<unknown, any, User> & Omit<User & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    save(instance: any): Promise<void>;
}
