import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessJwtStrategy } from './strategies/access.jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users.module';
import { AuthService } from './auth-service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from '../domain/token.schema';
import { TokenRepository } from '../repos/token.repository';
import { Device, DeviceSchema } from '../domain/devices.schema';
import { DevicesService } from '../application/devices.service';
import { DevicesRepository } from '../repos/devices.repository';
import { EmailAdapter } from '../adapters/email.adapter';
import { RefreshJwtStrategy } from './strategies/refresh.jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    UsersModule,
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AccessJwtStrategy,
    RefreshJwtStrategy,
    TokenRepository,
    DevicesService,
    DevicesRepository,
    EmailAdapter,
  ],
  exports: [AuthService, TokenRepository, DevicesService, DevicesRepository, EmailAdapter],
})
export class AuthModule {}
