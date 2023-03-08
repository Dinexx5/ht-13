import mongoose, { Model } from 'mongoose';
import { CommentDocument, commentViewModel, createCommentModel } from '../domain/comments.schema';
import { CommentsRepository } from '../repos/comments.repository';
import { UsersRepository } from '../repos/users.repository';
export declare class CommentsService {
    protected commentsRepository: CommentsRepository;
    protected usersRepository: UsersRepository;
    private commentModel;
    constructor(commentsRepository: CommentsRepository, usersRepository: UsersRepository, commentModel: Model<CommentDocument>);
    createComment(postId: string, inputModel: createCommentModel, userId: mongoose.Types.ObjectId): Promise<commentViewModel>;
}
