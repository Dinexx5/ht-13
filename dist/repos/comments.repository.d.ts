import mongoose, { Model } from 'mongoose';
import { Comment, CommentDocument } from '../domain/comments.schema';
export declare class CommentsRepository {
    private commentModel;
    constructor(commentModel: Model<CommentDocument>);
    findComment(_id: mongoose.Types.ObjectId): Promise<mongoose.Document<unknown, any, Comment> & Omit<Comment & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    save(instance: any): Promise<void>;
}
