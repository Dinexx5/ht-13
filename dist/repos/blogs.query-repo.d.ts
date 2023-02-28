import { BlogDocument, blogViewModel } from '../domain/blogs.schema';
import { Model } from 'mongoose';
import { paginatedViewModel, paginationQuerys } from '../models/pagination';
export declare class BlogsQueryRepository {
    private blogModel;
    constructor(blogModel: Model<BlogDocument>);
    getAllBlogs(query: paginationQuerys): Promise<paginatedViewModel<blogViewModel[]>>;
    findBlogById(blogId: string): Promise<blogViewModel | null>;
}
