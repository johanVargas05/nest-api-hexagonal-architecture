import { env } from 'process';

import { NestFactory } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1', {
    exclude: [
      { path: 'health', method: RequestMethod.GET },
      { path: 'seed', method: RequestMethod.GET },
    ],
  });
  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'OPTIONS'],
    preflightContinue: false,
    allowedHeaders: ['Content-Type'],
  });
  await app.listen(env.PORT);
}
bootstrap();
