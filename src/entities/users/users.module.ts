import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UsersQueryRepository } from './users.query-repo';
import { UsersController } from './users.controller';
import { IsLoginExistsDecorator } from '../../shared/decorators/validation/login-exists.decorator';
import { IsEmailExistsDecorator } from '../../shared/decorators/validation/email-exists.decorator';
import { IsConfirmationCodeCorrect } from '../../shared/decorators/validation/confirm-email.decorator';
import { EmailResendingDecorator } from '../../shared/decorators/validation/email-resending.decorator';
import { IsRecoveryCodeCorrect } from '../../shared/decorators/validation/password-recovery.decorator';

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
