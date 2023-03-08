import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { paginatedViewModel, paginationQuerys } from '../models/pagination';
import { Response } from 'express';
import {
  createPostInputModelWithBlogId,
  postViewModel,
  updatePostModel,
} from '../domain/posts.schema';
import { PostsService } from '../application/posts.service';
import { PostsQueryRepository } from '../repos/posts.query-repo';
import { commentViewModel, createCommentModel } from '../domain/comments.schema';
import { CommentsQueryRepository } from '../repos/comments.query-repo';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CommentsService } from '../application/comments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(
    protected postsService: PostsService,
    protected postsQueryRepository: PostsQueryRepository,
    protected commentsQueryRepository: CommentsQueryRepository,
    protected commentsService: CommentsService,
  ) {}
  @Get()
  async getPosts(@Query() paginationQuery) {
    const returnedPosts: paginatedViewModel<postViewModel[]> =
      await this.postsQueryRepository.getAllPosts(paginationQuery);
    return returnedPosts;
  }
  @Get(':id')
  async getPost(@Param('id') id: string, @Res() res: Response) {
    const post: postViewModel | null = await this.postsQueryRepository.findPostById(id);
    if (!post) {
      return res.sendStatus(404);
    }
    return res.send(post);
  }
  @UseGuards(AuthGuard)
  @Post()
  async createPost(@Body() inputModel: createPostInputModelWithBlogId) {
    const createdInstance = await this.postsService.createPost(inputModel);
    return createdInstance;
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async updatePost(
    @Body() inputModel: updatePostModel,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const isUpdated = await this.postsService.UpdatePostById(inputModel, id);
    if (!isUpdated) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.postsService.deletePostById(id);
    if (!isDeleted) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  }
  @Get(':id/comments')
  async getComments(
    @Param('id') postId: string,
    @Query() paginationQuery: paginationQuerys,
    @Res() res: Response,
  ) {
    const foundPost: postViewModel | null = await this.postsQueryRepository.findPostById(postId);
    if (!foundPost) {
      return res.sendStatus(404);
    }
    const returnedComments: paginatedViewModel<commentViewModel[]> =
      await this.commentsQueryRepository.getAllCommentsForPost(paginationQuery, postId);
    return res.send(returnedComments);
  }
  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  async createComment(
    @Request() req,
    @Param('id') postId: string,
    @Body() inputModel: createCommentModel,
    @Res() res: Response,
  ) {
    const newComment: commentViewModel = await this.postsService.createComment(
      postId,
      inputModel,
      req.user,
    );
    if (!newComment) return res.sendStatus(404);
    return res.status(201).send(newComment);
  }
}
