import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from '../application/blogs.service';
import { BlogsQueryRepository } from '../repos/blogs.query-repo';
import { blogViewModel, createBlogModel, updateBlogModel } from '../domain/blogs.schema';
import { paginatedViewModel } from '../models/pagination';
import { Response } from 'express';
import { createPostModel, PostViewModel } from '../domain/posts.schema';
import { PostsService } from '../application/posts.service';
import { PostsQueryRepository } from '../repos/posts.query-repo';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('blogs')
export class BlogsController {
  constructor(
    protected blogsService: BlogsService,
    protected blogsQueryRepository: BlogsQueryRepository,
    protected postsService: PostsService,
    protected postsQueryRepository: PostsQueryRepository,
  ) {}
  @Get()
  async getBlogs(@Query() paginationQuery) {
    const returnedBlogs: paginatedViewModel<blogViewModel[]> =
      await this.blogsQueryRepository.getAllBlogs(paginationQuery);
    return returnedBlogs;
  }
  @Get(':id')
  async getBlog(@Param('id') id: string, @Res() res: Response) {
    const blog: blogViewModel | null = await this.blogsQueryRepository.findBlogById(id);
    if (!blog) {
      return res.sendStatus(404);
    }
    return res.send(blog);
  }
  @UseGuards(AuthGuard)
  @Post()
  async createBlog(@Body() inputModel: createBlogModel) {
    const createdInstance: blogViewModel = await this.blogsService.createBlog(inputModel);
    return createdInstance;
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateBlog(
    @Body() inputModel: updateBlogModel,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const isUpdated = await this.blogsService.UpdateBlogById(inputModel, id);
    if (!isUpdated) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteBlog(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.blogsService.deleteBlogById(id);
    if (!isDeleted) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  }
  @UseGuards(AuthGuard)
  @Post(':id/posts')
  async createPost(
    @Body() inputModel: createPostModel,
    @Param('id') blogId: string,
    @Res() res: Response,
  ) {
    const postDto = { ...inputModel, blogId };
    const post = await this.postsService.createPost(postDto);
    if (!post) return res.sendStatus(404);
    return res.send(post);
  }
  @Get(':id/posts')
  async getPosts(@Param('id') blogId: string, @Query() paginationQuery, @Res() res: Response) {
    const blog = await this.blogsQueryRepository.findBlogById(blogId);
    if (!blog) return res.sendStatus(404);
    const returnedPosts: paginatedViewModel<PostViewModel[]> =
      await this.postsQueryRepository.getAllPosts(paginationQuery, blogId);
    return res.send(returnedPosts);
  }
}
