import { BlogsService } from './blogs.service';
import { BlogsQueryRepository } from './blogs.query-repo';
import { blogViewModel, createBlogModel, updateBlogModel } from './blogs.schema';
import { paginatedViewModel } from '../../shared/models/pagination';
import { Response } from 'express';
import { createPostModel } from '../posts/posts.schema';
import { PostsService } from '../posts/posts.service';
import { PostsQueryRepository } from '../posts/posts.query-repo';
export declare class BlogsController {
    protected blogsService: BlogsService;
    protected blogsQueryRepository: BlogsQueryRepository;
    protected postsService: PostsService;
    protected postsQueryRepository: PostsQueryRepository;
    constructor(blogsService: BlogsService, blogsQueryRepository: BlogsQueryRepository, postsService: PostsService, postsQueryRepository: PostsQueryRepository);
    getBlogs(paginationQuery: any): Promise<paginatedViewModel<blogViewModel[]>>;
    getBlog(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createBlog(inputModel: createBlogModel): Promise<blogViewModel>;
    updateBlog(inputModel: updateBlogModel, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteBlog(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createPost(inputModel: createPostModel, blogId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getPosts(userId: any, blogId: string, paginationQuery: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
