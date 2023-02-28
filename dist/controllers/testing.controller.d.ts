import { BlogDocument } from '../domain/blogs.schema';
import { Response } from 'express';
import { Model } from 'mongoose';
import { PostDocument } from '../domain/posts.schema';
import { UserDocument } from '../domain/users.schema';
import { CommentDocument } from '../domain/comments.schema';
export declare class TestingController {
    private blogModel;
    private postModel;
    private userModel;
    private commentModel;
    constructor(blogModel: Model<BlogDocument>, postModel: Model<PostDocument>, userModel: Model<UserDocument>, commentModel: Model<CommentDocument>);
    deleteAll(res: Response): Promise<Response<any, Record<string, any>>>;
}
