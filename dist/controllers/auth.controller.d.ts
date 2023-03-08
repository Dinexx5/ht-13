import { AuthService } from '../auth/auth-service';
import { Response } from 'express';
import { UsersRepository } from '../repos/users.repository';
import { confirmEmailModel, createUserModel, newPasswordModel, passwordRecoveryModel, resendEmailModel } from '../domain/users.schema';
export declare class AuthController {
    private readonly authService;
    protected usersRepository: UsersRepository;
    constructor(authService: AuthService, usersRepository: UsersRepository);
    login(req: any, res: Response): Promise<void>;
    getProfile(req: any, res: Response): Promise<void>;
    getRefreshToken(req: any, res: Response): Promise<void>;
    deleteSession(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    registerUser(inputModel: createUserModel, res: Response): Promise<Response<any, Record<string, any>>>;
    resendEmail(inputModel: resendEmailModel, res: Response): Promise<Response<any, Record<string, any>>>;
    confirmEmail(inputModel: confirmEmailModel, res: Response): Promise<Response<any, Record<string, any>>>;
    recoverPassword(inputModel: passwordRecoveryModel, res: Response): Promise<Response<any, Record<string, any>>>;
    newPassword(inputModel: newPasswordModel, res: Response): Promise<Response<any, Record<string, any>>>;
}
