import { BlogsRepository } from '../repos/blogs.repository';
import { BlogDocument, blogViewModel, createBlogModel, updateBlogModel } from '../domain/blogs.schema';
import { Model } from 'mongoose';
export declare class BlogsService {
    protected blogsRepository: BlogsRepository;
    private blogModel;
    constructor(blogsRepository: BlogsRepository, blogModel: Model<BlogDocument>);
    createBlog(inputModel: createBlogModel): Promise<blogViewModel>;
    deleteBlogById(blogId: string): Promise<boolean>;
    UpdateBlogById(blogBody: updateBlogModel, blogId: string): Promise<boolean>;
}
