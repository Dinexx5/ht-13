import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blogs.schema';

@Injectable()
export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async findBlogInstance(_id: mongoose.Types.ObjectId) {
    const blogInstance = await this.blogModel.findOne({ _id: _id });
    return blogInstance;
  }

  async save(instance: any) {
    instance.save();
  }
}
