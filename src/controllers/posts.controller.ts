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
  PostViewModel,
  updatePostModel,
} from '../domain/posts.schema';
import { PostsService } from '../application/posts.service';
import { PostsQueryRepository } from '../repos/posts.query-repo';
import { CommentViewModel, CreateCommentModel, LikeInputModel } from '../domain/comments.schema';
import { CommentsQueryRepository } from '../repos/comments.query-repo';
import { AuthGuard } from '../auth/guards/auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth-service';

@Controller('posts')
export class PostsController {
  constructor(
    protected authService: AuthService,
    protected postsService: PostsService,
    protected postsQueryRepository: PostsQueryRepository,
    protected commentsQueryRepository: CommentsQueryRepository,
  ) {}
  @Get()
  async getPosts(@Request() req, @Query() paginationQuery) {
    const isToken = { token: null };
    if (!req.headers.authorization) isToken.token = null;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const result = await this.authService.getTokenInfo(token);
      isToken.token = result.userId;
    }
    const returnedPosts: paginatedViewModel<PostViewModel[]> =
      await this.postsQueryRepository.getAllPosts(paginationQuery, undefined, isToken.token);
    return returnedPosts;
  }
  @Get(':id')
  async getPost(@Request() req, @Param('id') id: string, @Res() res: Response) {
    const isToken = { token: null };
    if (!req.headers.authorization) isToken.token = null;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const result = await this.authService.getTokenInfo(token);
      isToken.token = result.userId;
    }
    const post: PostViewModel | null = await this.postsQueryRepository.findPostById(
      id,
      isToken.token,
    );
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
    @Request() req,
    @Param('id') postId: string,
    @Query() paginationQuery: paginationQuerys,
    @Res() res: Response,
  ) {
    const isToken = { token: null };
    if (!req.headers.authorization) isToken.token = null;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const result = await this.authService.getTokenInfo(token);
      isToken.token = result.userId;
    }
    const foundPost: PostViewModel | null = await this.postsQueryRepository.findPostById(postId);
    if (!foundPost) {
      return res.sendStatus(404);
    }
    const returnedComments: paginatedViewModel<CommentViewModel[]> =
      await this.commentsQueryRepository.getAllCommentsForPost(
        paginationQuery,
        postId,
        isToken.token,
      );
    return res.send(returnedComments);
  }
  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  async createComment(
    @Request() req,
    @Param('id') postId: string,
    @Body() inputModel: CreateCommentModel,
    @Res() res: Response,
  ) {
    const newComment: CommentViewModel = await this.postsService.createComment(
      postId,
      inputModel,
      req.user,
    );
    if (!newComment) return res.sendStatus(404);
    return res.status(201).send(newComment);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/:id/like-status')
  async likePost(
    @Request() req,
    @Param('id') postId: string,
    @Body() inputModel: LikeInputModel,
    @Res() res: Response,
  ) {
    const isLiked: boolean = await this.postsService.likePost(
      postId,
      inputModel.likeStatus,
      req.user,
    );
    if (!isLiked) return res.sendStatus(404);
    return res.sendStatus(204);
  }
}
