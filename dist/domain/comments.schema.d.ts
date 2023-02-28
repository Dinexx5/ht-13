import mongoose, { HydratedDocument } from 'mongoose';
export type CommentDocument = HydratedDocument<Comment>;
export declare class LikingUsers {
    _id: mongoose.Schema.Types.ObjectId;
    myStatus: string;
}
export declare class LikesInfo {
    likesCount: number;
    dislikesCount: number;
}
export declare class CommentatorModel {
    userId: string;
    userLogin: string;
}
export declare class Comment {
    _id: mongoose.Schema.Types.ObjectId;
    content: string;
    commentatorInfo: CommentatorModel;
    createdAt: string;
    likingUsers: LikingUsers[];
    postId: string;
    likesInfo: LikesInfo;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment>;
export declare class createCommentModel {
    content: string;
    constructor(content: string);
}
export declare class commentViewModel {
    id: string;
    content: string;
    commentatorInfo: {
        userId: string;
        userLogin: string;
    };
    createdAt: string;
    likesInfo: {
        likesCount: number;
        dislikesCount: number;
        myStatus: string;
    };
    constructor(id: string, content: string, commentatorInfo: {
        userId: string;
        userLogin: string;
    }, createdAt: string, likesInfo: {
        likesCount: number;
        dislikesCount: number;
        myStatus: string;
    });
}
