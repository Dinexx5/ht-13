import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersRepository } from './repos/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/users.schema';
import { UsersQueryRepository } from './repos/users.query-repo';
import { UsersController } from './controllers/users.controller';
import { IsLoginExistsDecorator } from './shared/decorators/isLoginExists.decorator';
import { IsEmailExistsDecorator } from './shared/decorators/isEmailExists.decorator';
import { IsConfirmationCodeCorrect } from './shared/decorators/isCodeCorrect.decorator';
import { EmailResendingDecorator } from './shared/decorators/emailResendinfDecorator';
import { IsRecoveryCodeCorrect } from './shared/decorators/recoveryCode.decorator';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    IsLoginExistsDecorator,
    IsEmailExistsDecorator,
    IsConfirmationCodeCorrect,
    EmailResendingDecorator,
    IsRecoveryCodeCorrect,
  ],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository, UsersQueryRepository],
})
export class UsersModule {}
