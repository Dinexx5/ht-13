import { Controller, Delete, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../domain/blogs.schema';
import { Response } from 'express';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../domain/posts.schema';
import { User, UserDocument } from '../domain/users.schema';
import { Comment, CommentDocument } from '../domain/comments.schema';

@Controller('testing')
export class TestingController {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}
  @Delete('all-data')
  async deleteAll(@Res() res: Response) {
    await this.blogModel.deleteMany({});
    await this.postModel.deleteMany({});
    await this.userModel.deleteMany({});
    await this.commentModel.deleteMany({});
    return res.sendStatus(204);
  }
}
