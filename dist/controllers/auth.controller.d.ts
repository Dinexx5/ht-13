import { AuthService } from '../auth/auth-service';
import { Response } from 'express';
import { UsersRepository } from '../repos/users.repository';
import { ConfirmEmailModel, CreateUserModel, NewPasswordModel, PasswordRecoveryModel, ResendEmailModel } from '../models/userModels';
export declare class AuthController {
    private readonly authService;
    protected usersRepository: UsersRepository;
    constructor(authService: AuthService, usersRepository: UsersRepository);
    login(req: any, res: Response): Promise<void>;
    getProfile(req: any, res: Response): Promise<void>;
    getRefreshToken(req: any, res: Response): Promise<void>;
    deleteCurrentSession(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    registerUser(inputModel: CreateUserModel, res: Response): Promise<Response<any, Record<string, any>>>;
    resendEmail(inputModel: ResendEmailModel, res: Response): Promise<Response<any, Record<string, any>>>;
    confirmEmail(inputModel: ConfirmEmailModel, res: Response): Promise<Response<any, Record<string, any>>>;
    recoverPassword(inputModel: PasswordRecoveryModel, res: Response): Promise<Response<any, Record<string, any>>>;
    newPassword(inputModel: NewPasswordModel, res: Response): Promise<Response<any, Record<string, any>>>;
}
