import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth-service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { Response } from 'express';
import { UsersRepository } from '../repos/users.repository';
import { UserDocument } from '../domain/users.schema';
import {
  ConfirmEmailModel,
  CreateUserModel,
  NewPasswordModel,
  PasswordRecoveryModel,
  ResendEmailModel,
} from '../models/userModels';
import { RateLimitGuard } from '../auth/guards/rate-limit.guard';
import { JwtRefreshAuthGuard } from '../auth/guards/jwt-refresh.guard';
import mongoose from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    protected usersRepository: UsersRepository,
  ) {}

  @UseGuards(LocalAuthGuard, RateLimitGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const ip = req.ip;
    const deviceName = req.headers['user-agent']!;
    const accessToken = await this.authService.createJwtAccessToken(req.user);
    const refreshToken = await this.authService.createJwtRefreshToken(req.user, deviceName, ip);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ accessToken: accessToken });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req, @Res() res: Response) {
    const userInstance: UserDocument = await this.usersRepository.findUserById(req.user);
    console.log(req.user);
    res.send({
      email: userInstance.accountData.email,
      login: userInstance.accountData.login,
      userId: userInstance._id.toString(),
    });
  }
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh-token')
  async getRefreshToken(@Request() req, @Res() res: Response) {
    const { deviceId, exp } = req.user;
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const newAccessToken = await this.authService.createJwtAccessToken(userId);
    const newRefreshToken = await this.authService.updateJwtRefreshToken(deviceId, exp, userId);
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ accessToken: newAccessToken });
  }
  @UseGuards(JwtRefreshAuthGuard)
  @Post('logout')
  async deleteCurrentSession(@Request() req, @Res() res: Response) {
    const refreshToken = req.cookies.refreshToken;
    await this.authService.deleteCurrentToken(refreshToken);
    await this.authService.deleteDeviceForLogout(refreshToken);
    return res.sendStatus(204);
  }

  @UseGuards(RateLimitGuard)
  @Post('registration')
  async registerUser(@Body() inputModel: CreateUserModel, @Res() res: Response) {
    // const createdAccount = await this.authService.createUser(inputModel);
    // if (!createdAccount) return res.send('can not send email. try later');
    return res.sendStatus(204);
  }

  @UseGuards(RateLimitGuard)
  @Post('registration-email-resending')
  async resendEmail(@Body() inputModel: ResendEmailModel, @Res() res: Response) {
    // const isEmailResent = await this.authService.resendEmail(inputModel.email);
    // if (!isEmailResent) return res.send('Can not send an email');
    return res.sendStatus(204);
  }

  @UseGuards(RateLimitGuard)
  @Post('registration-confirmation')
  async confirmEmail(@Body() inputModel: ConfirmEmailModel, @Res() res: Response) {
    const isConfirmed = await this.authService.confirmEmail(inputModel.code);
    if (!isConfirmed) return res.sendStatus(400);
    return res.sendStatus(204);
  }

  @UseGuards(RateLimitGuard)
  @Post('password-recovery')
  async recoverPassword(@Body() inputModel: PasswordRecoveryModel, @Res() res: Response) {
    const isEmailSent = await this.authService.sendEmailForPasswordRecovery(inputModel.email);
    if (!isEmailSent) return res.status(204).send('something went wrong');
    return res.sendStatus(204);
  }

  @UseGuards(RateLimitGuard)
  @Post('new-password')
  async newPassword(@Body() inputModel: NewPasswordModel, @Res() res: Response) {
    const isPasswordUpdated = await this.authService.updatePassword(inputModel);
    if (!isPasswordUpdated) return res.send('something went wrong');
    return res.sendStatus(204);
  }
}
