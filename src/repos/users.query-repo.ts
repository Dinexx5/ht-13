import { User, UserDocument, userViewModel } from '../domain/users.schema';
import { paginatedViewModel, paginationQuerys } from '../models/pagination';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

function mapDbUserToUserViewModel(user: UserDocument): userViewModel {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
}
export class UsersQueryRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(
    query: paginationQuerys,
  ): Promise<paginatedViewModel<userViewModel[]>> {
    const {
      sortDirection = 'desc',
      sortBy = 'createdAt',
      pageNumber = 1,
      pageSize = 10,
      searchLoginTerm = null,
      searchEmailTerm = null,
    } = query;
    const sortDirectionInt: 1 | -1 = sortDirection === 'desc' ? -1 : 1;
    const skippedUsersCount = (+pageNumber - 1) * +pageSize;

    const filter = {} as {
      login?: { $regex: string; $options: string };
      email?: { $regex: string; $options: string };
      $or?: [
        { email: { $regex: string; $options: string } },
        { login: { $regex: string; $options: string } },
      ];
    };
    if (searchLoginTerm && !searchEmailTerm) {
      filter.login = { $regex: searchLoginTerm, $options: 'i' };
    }
    if (searchEmailTerm && !searchLoginTerm) {
      filter.email = { $regex: searchEmailTerm, $options: 'i' };
    }
    if (searchLoginTerm && searchEmailTerm) {
      filter.$or = [
        { email: { $regex: searchEmailTerm, $options: 'i' } },
        { login: { $regex: searchLoginTerm, $options: 'i' } },
      ];
    }

    const countAll = await this.userModel.countDocuments(filter);
    const usersDb = await this.userModel
      .find(filter)
      .sort({ [sortBy]: sortDirectionInt })
      .skip(skippedUsersCount)
      .limit(+pageSize)
      .lean();

    const usersView = usersDb.map(mapDbUserToUserViewModel);
    return {
      pagesCount: Math.ceil(countAll / +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: countAll,
      items: usersView,
    };
  }
}
