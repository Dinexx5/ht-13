import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth-service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { Response } from 'express';
import { UsersRepository } from '../repos/users.repository';
import {
  confirmEmailModel,
  createUserModel,
  newPasswordModel,
  passwordRecoveryModel,
  resendEmailModel,
  UserDocument,
} from '../domain/users.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    protected usersRepository: UsersRepository,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const ip = req.ip;
    const deviceName = req.headers['user-agent']!;
    const accessToken = await this.authService.createJwtAccessToken(req.user);
    const refreshToken = await this.authService.createJwtRefreshToken(req.user, deviceName, ip);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
    });
    res.json({ accessToken: accessToken });
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

  @UseGuards(JwtAuthGuard)
  @Post('refresh-token')
  async getRefreshToken(@Request() req, @Res() res: Response) {
    const newAccessToken = await this.authService.createJwtAccessToken(req.user);
    const refreshToken = req.cookies.refreshToken;
    const newRefreshToken = await this.authService.updateJwtRefreshToken(refreshToken);
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false,
    });
    res.json({ accessToken: newAccessToken });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async deleteSession(@Request() req, @Res() res: Response) {
    const refreshToken = req.cookies.refreshToken;
    await this.authService.deleteSession(refreshToken);
    await this.authService.deleteDevice(refreshToken);
    return res.sendStatus(204);
  }

  @Post('registration')
  async registerUser(@Body() inputModel: createUserModel, @Res() res: Response) {
    const createdAccount = await this.authService.createUser(inputModel);
    if (!createdAccount) return res.send('can not send email. try later');
    return res.sendStatus(204);
  }

  @Post('registration-email-resending')
  async resendEmail(@Body() inputModel: resendEmailModel, @Res() res: Response) {
    const isEmailResent = await this.authService.resendEmail(inputModel.email);
    if (!isEmailResent) return res.send('can not send email. try later');
    return res.sendStatus(204);
  }

  @Post('registration-confirmation')
  async confirmEmail(@Body() inputModel: confirmEmailModel, @Res() res: Response) {
    const isConfirmed = await this.authService.confirmEmail(inputModel.code);
    if (!isConfirmed) return res.sendStatus(400);
    return res.sendStatus(204);
  }

  @Post('password-recovery')
  async recoverPassword(@Body() inputModel: passwordRecoveryModel, @Res() res: Response) {
    const isEmailSent = await this.authService.sendEmailForPasswordRecovery(inputModel.email);
    if (!isEmailSent) return res.status(204).send('something went wrong');
    return res.sendStatus(204);
  }

  @Post('new-password')
  async newPassword(@Body() inputModel: newPasswordModel, @Res() res: Response) {
    const isPasswordUpdated = await this.authService.updatePassword(inputModel);
    if (!isPasswordUpdated) return res.send('something went wrong');
    return res.sendStatus(204);
  }
}
