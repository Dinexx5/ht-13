import mongoose, { Model } from 'mongoose';
import { Blog, BlogDocument } from '../domain/blogs.schema';
export declare class BlogsRepository {
    private blogModel;
    constructor(blogModel: Model<BlogDocument>);
    findBlogInstance(_id: mongoose.Types.ObjectId): Promise<mongoose.Document<unknown, any, Blog> & Omit<Blog & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    save(instance: any): Promise<void>;
}
