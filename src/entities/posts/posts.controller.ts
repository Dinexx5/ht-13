import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { Response } from 'express';
import { createPostInputModelWithBlogId, PostViewModel, updatePostModel } from './posts.schema';
import { PostsService } from './posts.service';
import { PostsQueryRepository } from './posts.query-repo';
import { CommentViewModel, CreateCommentModel, LikeInputModel } from '../comments/comments.schema';
import { CommentsQueryRepository } from '../comments/comments.query-repo';
import { AuthGuard } from '../auth/guards/auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { CustomRequest, GetUserGuard } from '../auth/guards/getuser.guard';

@Controller('posts')
export class PostsController {
  constructor(
    protected postsService: PostsService,
    protected postsQueryRepository: PostsQueryRepository,
    protected commentsQueryRepository: CommentsQueryRepository,
  ) {}
  @UseGuards(GetUserGuard)
  @Get()
  async getPosts(@CurrentUser() userId, @Query() paginationQuery) {
    const returnedPosts: paginatedViewModel<PostViewModel[]> =
      await this.postsQueryRepository.getAllPosts(paginationQuery, undefined, userId);

    return returnedPosts;
  }
  @UseGuards(GetUserGuard)
  @Get(':id')
  async getPost(@CurrentUser() userId, @Param('id') id: string, @Res() res: Response) {
    const post: PostViewModel | null = await this.postsQueryRepository.findPostById(id, userId);
    if (!post) {
      return res.sendStatus(404);
    }
    return res.send(post);
  }
  @UseGuards(AuthGuard)
  @Post()
  async createPost(@Body() inputModel: createPostInputModelWithBlogId) {
    return await this.postsService.createPost(inputModel);
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
  @UseGuards(GetUserGuard)
  @Get(':id/comments')
  async getComments(
    @CurrentUser() userId,
    @Param('id') postId: string,
    @Query() paginationQuery: paginationQuerys,
    @Res() res: Response,
  ) {
    const foundPost: PostViewModel | null = await this.postsQueryRepository.findPostById(postId);
    if (!foundPost) {
      return res.sendStatus(404);
    }
    const returnedComments: paginatedViewModel<CommentViewModel[]> =
      await this.commentsQueryRepository.getAllCommentsForPost(paginationQuery, postId, userId);
    return res.send(returnedComments);
  }
  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  async createComment(
    @CurrentUser() userId,
    @Param('id') postId: string,
    @Body() inputModel: CreateCommentModel,
    @Res() res: Response,
  ) {
    const newComment: CommentViewModel = await this.postsService.createComment(
      postId,
      inputModel,
      userId,
    );
    if (!newComment) return res.sendStatus(404);
    return res.status(201).send(newComment);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/:id/like-status')
  async likePost(
    @CurrentUser() userId,
    @Param('id') postId: string,
    @Body() inputModel: LikeInputModel,
    @Res() res: Response,
  ) {
    const isLiked: boolean = await this.postsService.likePost(
      postId,
      inputModel.likeStatus,
      userId,
    );
    if (!isLiked) return res.sendStatus(404);
    return res.sendStatus(204);
  }
}
