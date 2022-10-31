import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { AppConfigService } from './app.types';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = app.get<AppConfigService>(ConfigService);

  await app.register(import('./auth/auth.plugin'));
  await app
    .useGlobalPipes(new ValidationPipe())
    .listen(
      config.get('PORT', { infer: true }),
      config.get('HOST', { infer: true }),
    );
}

bootstrap();
