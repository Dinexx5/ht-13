import { paginatedViewModel } from '../../shared/models/pagination';
import { Response } from 'express';
import { userViewModel } from './users.schema';
import { UsersService } from './users.service';
import { UsersQueryRepository } from './users.query-repo';
import { CreateUserModel } from './userModels';
export declare class UsersController {
    protected usersService: UsersService;
    protected usersQueryRepository: UsersQueryRepository;
    constructor(usersService: UsersService, usersQueryRepository: UsersQueryRepository);
    getUsers(paginationQuery: any): Promise<paginatedViewModel<userViewModel[]>>;
    createUser(inputModel: CreateUserModel): Promise<userViewModel>;
    deleteUser(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
