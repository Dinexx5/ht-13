import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Comment,
  CommentDocument,
  commentViewModel,
  createCommentModel,
} from '../domain/comments.schema';
import { CommentsRepository } from '../repos/comments.repository';
import { UsersRepository } from '../repos/users.repository';

@Injectable()
export class CommentsService {
  constructor(
    protected filter: { status: string } = { status: '204' },
    protected commentsRepository: CommentsRepository,
    protected usersRepository: UsersRepository,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}
  async createComment(
    postId: string,
    inputModel: createCommentModel,
    userId: mongoose.Types.ObjectId,
  ): Promise<commentViewModel> {
    const userInstance = await this.usersRepository.findUserById(userId);
    const commentDTO = {
      _id: new mongoose.Types.ObjectId(),
      content: inputModel.content,
      commentatorInfo: {
        userId: userInstance._id.toString(),
        userLogin: userInstance.accountData.login,
      },
      createdAt: new Date().toISOString(),
      likingUsers: [],
      postId: postId,
      likesInfo: {
        likesCount: 0,
        dislikesCount: 0,
      },
    };
    const commentInstance = new this.commentModel(commentDTO);
    await this.commentsRepository.save(commentInstance);
    return {
      id: commentInstance._id.toString(),
      content: commentInstance.content,
      commentatorInfo: {
        userId: commentInstance.commentatorInfo.userId,
        userLogin: commentInstance.commentatorInfo.userLogin,
      },
      createdAt: commentInstance.createdAt,
      likesInfo: {
        likesCount: commentInstance.likesInfo.likesCount,
        dislikesCount: commentInstance.likesInfo.dislikesCount,
        myStatus: 'None',
      },
    };
  }
  async updateCommentById(
    commentId: string,
    inputModel: createCommentModel,
    userId: mongoose.Types.ObjectId,
  ) {
    const _id = new mongoose.Types.ObjectId(commentId);
    const commentInstance = await this.commentsRepository.findComment(_id);
    if (!commentInstance) {
      this.filter.status = '404';
      return this.filter.status;
    }
    if (commentInstance.commentatorInfo.userId !== userId.toString()) {
      this.filter.status = '403';
      return this.filter.status;
    }
    commentInstance.content = inputModel.content;
    await this.commentsRepository.save(commentInstance);
    return this.filter.status;
  }

  async deleteCommentById(commentId: string, userId: mongoose.Types.ObjectId) {
    const _id = new mongoose.Types.ObjectId(commentId);
    const commentInstance = await this.commentsRepository.findComment(_id);
    if (!commentInstance) {
      this.filter.status = '404';
      return this.filter.status;
    }
    if (commentInstance.commentatorInfo.userId !== userId.toString()) {
      this.filter.status = '403';
      return this.filter.status;
    }
    await commentInstance.deleteOne();
    return this.filter.status;
  }
}
