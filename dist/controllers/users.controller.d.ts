import { paginatedViewModel } from '../models/pagination';
import { Response } from 'express';
import { createUserModel, userViewModel } from '../domain/users.schema';
import { UsersService } from '../domain/users.service';
import { UsersQueryRepository } from '../repos/users.query-repo';
export declare class UsersController {
    protected usersService: UsersService;
    protected usersQueryRepository: UsersQueryRepository;
    constructor(usersService: UsersService, usersQueryRepository: UsersQueryRepository);
    getUsers(paginationQuery: any): Promise<paginatedViewModel<userViewModel[]>>;
    createUser(inputModel: createUserModel): Promise<userViewModel>;
    deleteUser(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
