import { paginatedViewModel, paginationQuerys } from '../models/pagination';
import { Response } from 'express';
import { createPostInputModelWithBlogId, postViewModel, updatePostModel } from '../domain/posts.schema';
import { PostsService } from '../application/posts.service';
import { PostsQueryRepository } from '../repos/posts.query-repo';
import { createCommentModel } from '../domain/comments.schema';
import { CommentsQueryRepository } from '../repos/comments.query-repo';
import { CommentsService } from '../application/comments.service';
export declare class PostsController {
    protected postsService: PostsService;
    protected postsQueryRepository: PostsQueryRepository;
    protected commentsQueryRepository: CommentsQueryRepository;
    protected commentsService: CommentsService;
    constructor(postsService: PostsService, postsQueryRepository: PostsQueryRepository, commentsQueryRepository: CommentsQueryRepository, commentsService: CommentsService);
    getPosts(paginationQuery: any): Promise<paginatedViewModel<postViewModel[]>>;
    getPost(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createPost(inputModel: createPostInputModelWithBlogId): Promise<postViewModel>;
    updatePost(inputModel: updatePostModel, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deletePost(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getComments(postId: string, paginationQuery: paginationQuerys, res: Response): Promise<Response<any, Record<string, any>>>;
    createComment(req: any, postId: string, inputModel: createCommentModel, res: Response): Promise<Response<any, Record<string, any>>>;
}
