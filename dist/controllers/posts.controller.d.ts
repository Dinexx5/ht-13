import { paginatedViewModel, paginationQuerys } from '../models/pagination';
import { Response } from 'express';
import { createPostInputModelWithBlogId, PostViewModel, updatePostModel } from '../domain/posts.schema';
import { PostsService } from '../application/posts.service';
import { PostsQueryRepository } from '../repos/posts.query-repo';
import { CreateCommentModel, LikeInputModel } from '../domain/comments.schema';
import { CommentsQueryRepository } from '../repos/comments.query-repo';
import { AuthService } from '../auth/auth-service';
export declare class PostsController {
    protected authService: AuthService;
    protected postsService: PostsService;
    protected postsQueryRepository: PostsQueryRepository;
    protected commentsQueryRepository: CommentsQueryRepository;
    constructor(authService: AuthService, postsService: PostsService, postsQueryRepository: PostsQueryRepository, commentsQueryRepository: CommentsQueryRepository);
    getPosts(req: any, paginationQuery: any): Promise<paginatedViewModel<PostViewModel[]>>;
    getPost(req: any, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createPost(inputModel: createPostInputModelWithBlogId): Promise<PostViewModel>;
    updatePost(inputModel: updatePostModel, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deletePost(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getComments(req: any, postId: string, paginationQuery: paginationQuerys, res: Response): Promise<Response<any, Record<string, any>>>;
    createComment(req: any, postId: string, inputModel: CreateCommentModel, res: Response): Promise<Response<any, Record<string, any>>>;
    likePost(req: any, postId: string, inputModel: LikeInputModel, res: Response): Promise<Response<any, Record<string, any>>>;
}
