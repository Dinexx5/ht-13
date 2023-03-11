import { BlogDocument } from '../domain/blogs.schema';
import { Response } from 'express';
import { Model } from 'mongoose';
import { PostDocument } from '../domain/posts.schema';
import { UserDocument } from '../domain/users.schema';
import { CommentDocument } from '../domain/comments.schema';
import { AttemptDocument } from '../domain/attempts.schema';
import { TokenDocument } from '../domain/token.schema';
import { DeviceDocument } from '../domain/devices.schema';
export declare class TestingController {
    private blogModel;
    private postModel;
    private userModel;
    private commentModel;
    private attemptModel;
    private tokenModel;
    private deviceModel;
    constructor(blogModel: Model<BlogDocument>, postModel: Model<PostDocument>, userModel: Model<UserDocument>, commentModel: Model<CommentDocument>, attemptModel: Model<AttemptDocument>, tokenModel: Model<TokenDocument>, deviceModel: Model<DeviceDocument>);
    deleteAll(res: Response): Promise<Response<any, Record<string, any>>>;
}
