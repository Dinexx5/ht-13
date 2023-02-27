import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Comment,
  CommentDocument,
  commentViewModel,
} from '../domain/comments.schema';
import { paginatedViewModel, paginationQuerys } from '../models/pagination';

function mapperToCommentViewModel(comment: CommentDocument): commentViewModel {
  return {
    id: comment._id.toString(),
    content: comment.content,
    commentatorInfo: {
      userId: comment.commentatorInfo.userId,
      userLogin: comment.commentatorInfo.userLogin,
    },
    createdAt: comment.createdAt,
    likesInfo: {
      likesCount: comment.likesInfo.likesCount,
      dislikesCount: comment.likesInfo.dislikesCount,
      myStatus: 'None',
    },
  };
}

export class CommentsQueryRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}
  async getAllCommentsForPost(
    query: paginationQuerys,
    postId: string,
  ): Promise<paginatedViewModel<commentViewModel[]>> {
    const {
      sortDirection = 'desc',
      sortBy = 'createdAt',
      pageNumber = 1,
      pageSize = 10,
    } = query;

    const sortDirectionNumber: 1 | -1 = sortDirection === 'desc' ? -1 : 1;
    const skippedCommentsNumber = (+pageNumber - 1) * +pageSize;

    const countAll = await this.commentModel.countDocuments({ postId: postId });
    const commentsDb = await this.commentModel
      .find({ postId: postId })
      .sort({ [sortBy]: sortDirectionNumber })
      .skip(skippedCommentsNumber)
      .limit(+pageSize)
      .lean();

    const commentsView = commentsDb.map(mapperToCommentViewModel);
    return {
      pagesCount: Math.ceil(countAll / +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: countAll,
      items: commentsView,
    };
  }

  async findCommentById(commentId: string): Promise<commentViewModel | null> {
    const _id = new mongoose.Types.ObjectId(commentId);
    const foundComment: CommentDocument | null =
      await this.commentModel.findOne({ _id: _id });
    if (!foundComment) {
      return null;
    }
    return mapperToCommentViewModel(foundComment);
  }
}
