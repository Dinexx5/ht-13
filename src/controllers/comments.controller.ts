import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommentsQueryRepository } from '../repos/comments.query-repo';
import { commentViewModel } from '../domain/comments.schema';

@Controller('comments')
export class CommentsController {
  constructor(protected commentsQueryRepository: CommentsQueryRepository) {}

  @Get(':id')
  async getComment(@Param('id') id: string, @Res() res: Response) {
    const comment: commentViewModel | null =
      await this.commentsQueryRepository.findCommentById(id);
    if (!comment) {
      return res.sendStatus(404);
    }
    return res.send(comment);
  }
}
