import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import type { AppConfigService } from 'src/app.types';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (config: AppConfigService) => ({
        secret: config.get('AUTH_SECRET', { infer: true }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
