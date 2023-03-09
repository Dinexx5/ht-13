import { Body, Controller, Delete, Get, Param, Put, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CommentsQueryRepository } from '../repos/comments.query-repo';
import { CommentViewModel, CreateCommentModel, LikeInputModel } from '../domain/comments.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentsService } from '../application/comments.service';
import { AuthService } from '../auth/auth-service';

@Controller('comments')
export class CommentsController {
  constructor(
    protected authService: AuthService,
    protected commentsQueryRepository: CommentsQueryRepository,
    protected commentsService: CommentsService,
  ) {}

  @Get(':id')
  async getComment(@Request() req, @Param('id') id: string, @Res() res: Response) {
    const isToken = { token: null };
    if (!req.headers.authorization) isToken.token = null;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const result = await this.authService.getTokenInfo(token);
      isToken.token = result.userId;
    }
    const comment: CommentViewModel | null = await this.commentsQueryRepository.findCommentById(
      id,
      isToken.token,
    );
    if (!comment) return res.sendStatus(404);
    return res.send(comment);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateComment(
    @Request() req,
    @Param('id') commentId: string,
    @Body() inputModel: CreateCommentModel,
    @Res() res: Response,
  ) {
    const receivedStatus = await this.commentsService.updateCommentById(
      commentId,
      inputModel,
      req.user,
    );
    return res.sendStatus(+receivedStatus);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(@Request() req, @Param('id') commentId: string, @Res() res: Response) {
    const receivedStatus = await this.commentsService.deleteCommentById(commentId, req.user);
    return res.sendStatus(+receivedStatus);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/:id/like-status')
  async likeComment(
    @Request() req,
    @Param('id') commentId: string,
    @Body() inputModel: LikeInputModel,
    @Res() res: Response,
  ) {
    console.log(req.user);
    const isLiked: boolean = await this.commentsService.likeComment(
      commentId,
      inputModel.likeStatus,
      req.user,
    );
    if (!isLiked) return res.sendStatus(404);
    return res.sendStatus(204);
  }
}
