import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import { RequestMethod } from '@nestjs/common';

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
