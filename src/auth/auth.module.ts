import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users.module';
import { jwtConstants } from './constants';
import { AuthService } from './auth-service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from '../domain/token.schema';
import { TokenRepository } from '../repos/token.repository';
import { Device, DeviceSchema } from '../domain/devices.schema';
import { DevicesService } from '../application/devices.service';
import { DevicesRepository } from '../repos/devices.repository';
import { EmailAdapter } from '../adapters/email.adapter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    TokenRepository,
    DevicesService,
    DevicesRepository,
    EmailAdapter,
  ],
  exports: [AuthService, TokenRepository, DevicesService, DevicesRepository, EmailAdapter],
})
export class AuthModule {}
