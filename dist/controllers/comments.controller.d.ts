import { Response } from 'express';
import { CommentsQueryRepository } from '../repos/comments.query-repo';
export declare class CommentsController {
    protected commentsQueryRepository: CommentsQueryRepository;
    constructor(commentsQueryRepository: CommentsQueryRepository);
    getComment(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
