import mongoose, { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare class emailConfirmationSchema {
    confirmationCode: string;
    expirationDate: Date;
    isConfirmed: boolean;
    createdAt: string;
}
export declare class passwordRecoverySchema {
    recoveryCode: string;
    expirationDate: Date;
}
export declare class accountDataSchema {
    login: string;
    email: string;
    createdAt: string;
    passwordHash: string;
}
export declare class User {
    _id: mongoose.Schema.Types.ObjectId;
    accountData: accountDataSchema;
    emailConfirmation: emailConfirmationSchema;
    passwordRecovery: passwordRecoverySchema;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
export declare class userViewModel {
    id: string;
    login: string;
    email: string;
    createdAt: string;
    constructor(id: string, login: string, email: string, createdAt: string);
}
