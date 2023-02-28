import { Model } from 'mongoose';
import { CommentDocument, commentViewModel } from '../domain/comments.schema';
import { paginatedViewModel, paginationQuerys } from '../models/pagination';
export declare class CommentsQueryRepository {
    private commentModel;
    constructor(commentModel: Model<CommentDocument>);
    getAllCommentsForPost(query: paginationQuerys, postId: string): Promise<paginatedViewModel<commentViewModel[]>>;
    findCommentById(commentId: string): Promise<commentViewModel | null>;
}
