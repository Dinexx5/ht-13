import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { IsLoginExists } from '../shared/decorators/isLoginExists.decorator';
import { IsEmailExists } from '../shared/decorators/isEmailExists.decorator';
import { IsEmailConfirmed } from '../shared/decorators/emailResendinfDecorator';
import { IsConfirmationCodeValid } from '../shared/decorators/isCodeCorrect.decorator';
import { Transform } from 'class-transformer';
import { IsRecoveryCodeValid } from '../shared/decorators/recoveryCode.decorator';

export class CreateUserModel {
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  @Matches(/^[a-zA-Z0-9_-]*$/)
  @IsLoginExists()
  login: string;
  @IsNotEmpty()
  @IsEmail()
  @IsEmailExists()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}

export class ResendEmailModel {
  @IsEmail()
  // @IsEmailConfirmed()
  email: string;
}

export class PasswordRecoveryModel {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ConfirmEmailModel {
  @IsNotEmpty()
  @IsString()
  @IsConfirmationCodeValid()
  code: string;
}

export class NewPasswordModel {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @Transform(({ value }) => value?.trim?.())
  newPassword: string;
  @IsString()
  @IsNotEmpty()
  @IsRecoveryCodeValid()
  recoveryCode: string;
}

export class authModel {
  @IsString()
  @IsNotEmpty()
  loginOrEmail: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
