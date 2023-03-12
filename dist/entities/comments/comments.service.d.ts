import mongoose, { Model } from 'mongoose';
import { CommentDocument, CommentViewModel, CreateCommentModel } from './comments.schema';
import { CommentsRepository } from './comments.repository';
import { UsersRepository } from '../users/users.repository';
export declare class CommentsService {
    protected commentsRepository: CommentsRepository;
    protected usersRepository: UsersRepository;
    private commentModel;
    constructor(commentsRepository: CommentsRepository, usersRepository: UsersRepository, commentModel: Model<CommentDocument>);
    filter: {
        status: string;
    };
    createComment(postId: string, inputModel: CreateCommentModel, userId: mongoose.Types.ObjectId): Promise<CommentViewModel>;
    updateCommentById(commentId: string, inputModel: CreateCommentModel, userId: mongoose.Types.ObjectId): Promise<string>;
    deleteCommentById(commentId: string, userId: mongoose.Types.ObjectId): Promise<string>;
    likeComment(commentId: string, likeStatus: string, userId: mongoose.Types.ObjectId): Promise<boolean>;
}
