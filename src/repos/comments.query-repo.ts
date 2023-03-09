import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comment, CommentDocument, CommentViewModel } from '../domain/comments.schema';
import { paginatedViewModel, paginationQuerys } from '../models/pagination';

function mapCommentToViewModel(comment: CommentDocument, userId?: string | null): CommentViewModel {
  if (!userId) {
    return mapperToCommentViewModel(comment);
  }
  const isUserLikedBefore = comment.likingUsers.find((user) => user.id === userId)!;
  if (!isUserLikedBefore) {
    return mapperToCommentViewModel(comment);
  }
  const myStatus = isUserLikedBefore.myStatus;
  return mapperToCommentViewModel(comment, myStatus);
}

function mapCommentsToViewModel(this: any, comment: CommentDocument): CommentViewModel {
  if (!this || !this.user) {
    return mapperToCommentViewModel(comment);
  }
  const userId = this.user;
  const isUserLikedBefore = comment.likingUsers.find((user) => user.id === userId)!;
  if (!isUserLikedBefore) {
    return mapperToCommentViewModel(comment);
  }
  const myStatus = isUserLikedBefore.myStatus;
  return mapperToCommentViewModel(comment, myStatus);
}

function mapperToCommentViewModel(comment: CommentDocument, myStatus?: string): CommentViewModel {
  const filter = { myStatus: 'None' };
  if (myStatus) {
    filter.myStatus = myStatus;
  }
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
      myStatus: filter.myStatus,
    },
  };
}

export class CommentsQueryRepository {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}
  async getAllCommentsForPost(
    query: paginationQuerys,
    postId: string,
    userId?: string | null,
  ): Promise<paginatedViewModel<CommentViewModel[]>> {
    const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10 } = query;

    const sortDirectionNumber: 1 | -1 = sortDirection === 'desc' ? -1 : 1;
    const skippedCommentsNumber = (+pageNumber - 1) * +pageSize;

    const countAll = await this.commentModel.countDocuments({ postId: postId });
    const commentsDb = await this.commentModel
      .find({ postId: postId })
      .sort({ [sortBy]: sortDirectionNumber })
      .skip(skippedCommentsNumber)
      .limit(+pageSize)
      .lean();

    const commentsView = commentsDb.map(mapCommentsToViewModel, { user: userId });
    return {
      pagesCount: Math.ceil(countAll / +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: countAll,
      items: commentsView,
    };
  }

  async findCommentById(
    commentId: string,
    userId?: string | null,
  ): Promise<CommentViewModel | null> {
    const _id = new mongoose.Types.ObjectId(commentId);
    const foundComment: CommentDocument | null = await this.commentModel.findOne({ _id: _id });
    console.log(foundComment);
    if (!foundComment) {
      return null;
    }
    return mapCommentToViewModel(foundComment, userId);
  }
}
