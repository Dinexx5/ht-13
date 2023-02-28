import { paginatedViewModel, paginationQuerys } from '../models/pagination';
import { Response } from 'express';
import { createPostInputModelWithBlogId, postViewModel, updatePostModel } from '../domain/posts.schema';
import { PostsService } from '../application/posts.service';
import { PostsQueryRepository } from '../repos/posts.query-repo';
import { CommentsQueryRepository } from '../repos/comments.query-repo';
export declare class PostsController {
    protected postsService: PostsService;
    protected postsQueryRepository: PostsQueryRepository;
    protected commentsQueryRepository: CommentsQueryRepository;
    constructor(postsService: PostsService, postsQueryRepository: PostsQueryRepository, commentsQueryRepository: CommentsQueryRepository);
    getPosts(paginationQuery: any): Promise<paginatedViewModel<postViewModel[]>>;
    getPost(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createPost(inputModel: createPostInputModelWithBlogId): Promise<postViewModel>;
    updatePost(inputModel: updatePostModel, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deletePost(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getComments(postId: string, paginationQuery: paginationQuerys, res: Response): Promise<Response<any, Record<string, any>>>;
}
