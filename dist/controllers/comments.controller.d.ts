import { Response } from 'express';
import { CommentsQueryRepository } from '../repos/comments.query-repo';
import { CreateCommentModel, LikeInputModel } from '../domain/comments.schema';
import { CommentsService } from '../application/comments.service';
import { AuthService } from '../auth/auth-service';
export declare class CommentsController {
    protected authService: AuthService;
    protected commentsQueryRepository: CommentsQueryRepository;
    protected commentsService: CommentsService;
    constructor(authService: AuthService, commentsQueryRepository: CommentsQueryRepository, commentsService: CommentsService);
    getComment(req: any, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateComment(req: any, commentId: string, inputModel: CreateCommentModel, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteComment(req: any, commentId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    likeComment(req: any, commentId: string, inputModel: LikeInputModel, res: Response): Promise<Response<any, Record<string, any>>>;
}
