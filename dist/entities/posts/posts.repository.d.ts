import mongoose, { Model } from 'mongoose';
import { Post, PostDocument } from './posts.schema';
export declare class PostsRepository {
    private postModel;
    constructor(postModel: Model<PostDocument>);
    findPostInstance(_id: mongoose.Types.ObjectId): Promise<mongoose.Document<unknown, any, Post> & Omit<Post & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    save(instance: any): Promise<void>;
}
