import { Model } from 'mongoose';
import { CommentDocument, CommentViewModel } from '../domain/comments.schema';
import { paginatedViewModel, paginationQuerys } from '../models/pagination';
export declare class CommentsQueryRepository {
    private commentModel;
    constructor(commentModel: Model<CommentDocument>);
    getAllCommentsForPost(query: paginationQuerys, postId: string, userId?: string | null): Promise<paginatedViewModel<CommentViewModel[]>>;
    findCommentById(commentId: string, userId?: string | null): Promise<CommentViewModel | null>;
}
