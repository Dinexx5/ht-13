import { UserDocument, userViewModel } from './users.schema';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { Model } from 'mongoose';
export declare class UsersQueryRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getAllUsers(query: paginationQuerys): Promise<paginatedViewModel<userViewModel[]>>;
}
