import { Body, Controller, Delete, Get, Param, Put, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CommentsQueryRepository } from '../repos/comments.query-repo';
import { commentViewModel, createCommentModel } from '../domain/comments.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentsService } from '../application/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(
    protected commentsQueryRepository: CommentsQueryRepository,
    protected commentsService: CommentsService,
  ) {}

  @Get(':id')
  async getComment(@Param('id') id: string, @Res() res: Response) {
    const comment: commentViewModel | null = await this.commentsQueryRepository.findCommentById(id);
    if (!comment) return res.sendStatus(404);
    return res.send(comment);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateComment(
    @Request() req,
    @Param('id') commentId: string,
    @Body() inputModel: createCommentModel,
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
}
