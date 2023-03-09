import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Comment,
  CommentDocument,
  CommentViewModel,
  CreateCommentModel,
  LikingUsers,
} from '../domain/comments.schema';
import { CommentsRepository } from '../repos/comments.repository';
import { UsersRepository } from '../repos/users.repository';

@Injectable()
export class CommentsService {
  constructor(
    protected commentsRepository: CommentsRepository,
    protected usersRepository: UsersRepository,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}
  filter: { status: string } = { status: '204' };
  async createComment(
    postId: string,
    inputModel: CreateCommentModel,
    userId: mongoose.Types.ObjectId,
  ): Promise<CommentViewModel> {
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
    inputModel: CreateCommentModel,
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
  async likeComment(
    commentId: string,
    likeStatus: string,
    userId: mongoose.Types.ObjectId,
  ): Promise<boolean> {
    const _id = new mongoose.Types.ObjectId(commentId);
    const commentInstance = await this.commentsRepository.findComment(_id);
    console.log(commentInstance);
    if (!commentInstance) {
      return false;
    }
    const callback = (user: LikingUsers) => user.id === userId.toString();
    const isUserLikedBefore = commentInstance.likingUsers.find(callback);
    if (!isUserLikedBefore) {
      commentInstance.likingUsers.push({ id: userId.toString(), myStatus: 'None' });
      // await this.commentsRepository.save(commentInstance);
    }
    const indexOfUser = commentInstance.likingUsers.findIndex(callback);
    debugger;
    const myStatus = commentInstance.likingUsers.find(callback)!.myStatus;
    switch (likeStatus) {
      case 'Like':
        if (myStatus === 'Like') {
          commentInstance.likingUsers[indexOfUser].myStatus = 'Like';
        }
        if (myStatus === 'None') {
          ++commentInstance!.likesInfo.likesCount;
          commentInstance.likingUsers[indexOfUser].myStatus = 'Like';
        }
        if (myStatus === 'Dislike') {
          --commentInstance!.likesInfo.dislikesCount;
          ++commentInstance!.likesInfo.likesCount;
          commentInstance.likingUsers[indexOfUser].myStatus = 'Like';
        }
        break;
      case 'Dislike':
        if (myStatus === 'Like') {
          --commentInstance!.likesInfo.likesCount;
          ++commentInstance!.likesInfo.dislikesCount;
          commentInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
        }
        if (myStatus === 'None') {
          ++commentInstance!.likesInfo.dislikesCount;
          commentInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
        }
        if (myStatus === 'Dislike') {
          commentInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
        }
        break;
      case 'None':
        if (myStatus === 'Like') {
          --commentInstance!.likesInfo.likesCount;
          commentInstance.likingUsers[indexOfUser].myStatus = 'None';
        }
        if (myStatus === 'Dislike') {
          --commentInstance!.likesInfo.dislikesCount;
          commentInstance.likingUsers[indexOfUser].myStatus = 'None';
        }
        if (myStatus === 'None') {
          commentInstance.likingUsers[indexOfUser].myStatus = 'None';
        }
        break;
    }
    await this.commentsRepository.save(commentInstance);
    return true;
  }
}
