import { BlogsService } from '../application/blogs.service';
import { BlogsQueryRepository } from '../repos/blogs.query-repo';
import { blogViewModel, createBlogModel, updateBlogModel } from '../domain/blogs.schema';
import { paginatedViewModel } from '../models/pagination';
import { Response } from 'express';
import { createPostModel } from '../domain/posts.schema';
import { PostsService } from '../application/posts.service';
import { PostsQueryRepository } from '../repos/posts.query-repo';
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
    getPosts(blogId: string, paginationQuery: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
