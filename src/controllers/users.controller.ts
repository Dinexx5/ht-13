import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';

import { paginatedViewModel } from '../models/pagination';
import { Response } from 'express';
import { createUserModel, userViewModel } from '../domain/users.schema';
import { UsersService } from '../application/users.service';
import { UsersQueryRepository } from '../repos/users.query-repo';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    protected usersService: UsersService,
    protected usersQueryRepository: UsersQueryRepository,
  ) {}
  @UseGuards(AuthGuard)
  @Get()
  async getUsers(@Query() paginationQuery) {
    const returnedUsers: paginatedViewModel<userViewModel[]> =
      await this.usersQueryRepository.getAllUsers(paginationQuery);
    return returnedUsers;
  }
  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() inputModel: createUserModel) {
    const createdInstance: userViewModel = await this.usersService.createUser(inputModel);
    return createdInstance;
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.usersService.deleteUserById(id);
    if (!isDeleted) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  }
}
