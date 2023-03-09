import { Controller, Delete, Get, Param, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth-service';
import { DevicesService } from '../application/devices.service';

@Controller('/security/devices')
export class DevicesController {
  constructor(protected authService: AuthService, protected devicesService: DevicesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getActiveSessions(@Request() req, @Res() res: Response) {
    const foundDevices = await this.devicesService.findActiveDevices(req.user);
    return res.send(foundDevices);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  async deleteAllSessions(@Request() req, @Res() res: Response) {
    const refreshToken = req.cookies.refreshToken;
    await this.authService.deleteAllSessionsWithoutActive(refreshToken, req.user);
    return res.sendStatus(204);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSession(@Request() req, @Param('id') deviceId: string, @Res() res: Response) {
    const status = await this.devicesService.deleteSessionById(req.user, deviceId);
    return res.sendStatus(+status);
  }
}
