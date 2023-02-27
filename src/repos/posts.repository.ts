import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post, PostDocument } from '../domain/posts.schema';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findPostInstance(_id: mongoose.Types.ObjectId) {
    const postInstance = await this.postModel.findOne({ _id: _id });
    return postInstance;
  }

  async save(instance: any) {
    instance.save();
  }
}
