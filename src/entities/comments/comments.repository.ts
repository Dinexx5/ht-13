import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './comments.schema';

@Injectable()
export class CommentsRepository {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async findComment(_id: mongoose.Types.ObjectId) {
    const commentInstance = await this.commentModel.findOne({ _id: _id });
    return commentInstance;
  }

  async save(instance: any) {
    instance.save();
  }
}
