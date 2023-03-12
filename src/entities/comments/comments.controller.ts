import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CommentsQueryRepository } from './comments.query-repo';
import { CommentViewModel, CreateCommentModel, LikeInputModel } from './comments.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { AuthService } from '../auth/auth-service';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { CustomRequest } from '../auth/guards/getuser.guard';

@Controller('comments')
export class CommentsController {
  constructor(
    protected commentsQueryRepository: CommentsQueryRepository,
    protected commentsService: CommentsService,
  ) {}

  @Get(':id')
  async getComment(@CurrentUser() userId, @Param('id') id: string, @Res() res: Response) {
    const comment: CommentViewModel | null = await this.commentsQueryRepository.findCommentById(
      id,
      userId,
    );
    if (!comment) return res.sendStatus(404);
    return res.send(comment);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateComment(
    @CurrentUser() userId,
    @Param('id') commentId: string,
    @Body() inputModel: CreateCommentModel,
    @Res() res: Response,
  ) {
    const receivedStatus = await this.commentsService.updateCommentById(
      commentId,
      inputModel,
      userId,
    );
    return res.sendStatus(+receivedStatus);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(@CurrentUser() userId, @Param('id') commentId: string, @Res() res: Response) {
    const receivedStatus = await this.commentsService.deleteCommentById(commentId, userId);
    return res.sendStatus(+receivedStatus);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/:id/like-status')
  async likeComment(
    @CurrentUser() userId,
    @Param('id') commentId: string,
    @Body() inputModel: LikeInputModel,
    @Res() res: Response,
  ) {
    const isLiked: boolean = await this.commentsService.likeComment(
      commentId,
      inputModel.likeStatus,
      userId,
    );
    if (!isLiked) return res.sendStatus(404);
    return res.sendStatus(204);
  }
}
