import { Controller, Delete, Get, Param, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../auth/auth-service';
import { DevicesService } from '../application/devices.service';
import mongoose from 'mongoose';
import { JwtRefreshAuthGuard } from '../auth/guards/jwt-refresh.guard';
import { DevicesRepository } from '../repos/devices.repository';

@Controller('/security/devices')
export class DevicesController {
  constructor(
    protected authService: AuthService,
    protected devicesService: DevicesService,
    protected devicesRepository: DevicesRepository,
  ) {}

  @UseGuards(JwtRefreshAuthGuard)
  @Get('')
  async getActiveSessions(@Request() req, @Res() res: Response) {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const foundDevices = await this.devicesService.findActiveDevices(userId);
    return res.send(foundDevices);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Delete('')
  async deleteAllSessions(@Request() req, @Res() res: Response) {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    await this.devicesRepository.deleteAllSessionsWithoutActive(req.user.deviceId, userId);
    return res.sendStatus(204);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Delete(':id')
  async deleteSession(@Request() req, @Param('id') deviceId: string, @Res() res: Response) {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const status = await this.devicesService.deleteSessionById(userId, deviceId);
    return res.sendStatus(+status);
  }
}
