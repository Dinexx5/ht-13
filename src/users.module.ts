import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersRepository } from './repos/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/users.schema';
import { UsersQueryRepository } from './repos/users.query-repo';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, UsersRepository, UsersQueryRepository],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository, UsersQueryRepository],
})
export class UsersModule {}
