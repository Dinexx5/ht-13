export declare class CreateUserModel {
    login: string;
    email: string;
    password: string;
}
export declare class ResendEmailModel {
    email: string;
}
export declare class PasswordRecoveryModel {
    email: string;
}
export declare class ConfirmEmailModel {
    code: string;
}
export declare class NewPasswordModel {
    newPassword: string;
    recoveryCode: string;
}
export declare class authModel {
    loginOrEmail: string;
    password: string;
}
