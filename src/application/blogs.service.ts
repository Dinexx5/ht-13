import { BlogsRepository } from '../repos/blogs.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Blog,
  BlogDocument,
  blogViewModel,
  createBlogModel,
  updateBlogModel,
} from '../domain/blogs.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class BlogsService {
  constructor(
    protected blogsRepository: BlogsRepository,
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}

  async createBlog(inputModel: createBlogModel): Promise<blogViewModel> {
    const blogDTO = {
      _id: new mongoose.Types.ObjectId(),
      name: inputModel.name,
      description: inputModel.description,
      isMembership: false,
      websiteUrl: inputModel.websiteUrl,
      createdAt: new Date().toISOString(),
    };
    const blogInstance = new this.blogModel(blogDTO);
    await this.blogsRepository.save(blogInstance);

    return {
      name: blogInstance.name,
      description: blogInstance.description,
      websiteUrl: blogInstance.websiteUrl,
      isMembership: blogInstance.isMembership,
      createdAt: blogInstance.createdAt,
      id: blogInstance._id.toString(),
    };
  }
  async deleteBlogById(blogId: string): Promise<boolean> {
    const _id = new mongoose.Types.ObjectId(blogId);
    const blogInstance = await this.blogsRepository.findBlogInstance(_id);
    if (!blogInstance) return false;
    await blogInstance.deleteOne();
    return true;
  }

  async UpdateBlogById(blogBody: updateBlogModel, blogId: string): Promise<boolean> {
    const { name, description, websiteUrl } = blogBody;
    const _id = new mongoose.Types.ObjectId(blogId);
    const blogInstance = await this.blogsRepository.findBlogInstance(_id);
    if (!blogInstance) return false;
    blogInstance.name = name;
    blogInstance.description = description;
    blogInstance.websiteUrl = websiteUrl;
    await this.blogsRepository.save(blogInstance);
    return true;
  }
}
