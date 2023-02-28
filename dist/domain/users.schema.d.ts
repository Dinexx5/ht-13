import mongoose, { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    _id: mongoose.Schema.Types.ObjectId;
    login: string;
    email: string;
    createdAt: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
export declare class createUserModel {
    login: string;
    email: string;
    password: string;
    constructor(login: string, email: string, password: string);
}
export declare class userViewModel {
    id: string;
    login: string;
    email: string;
    createdAt: string;
    constructor(id: string, login: string, email: string, createdAt: string);
}
