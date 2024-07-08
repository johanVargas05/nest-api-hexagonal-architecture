import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ValidatorEnv } from './config/validator-env';
import { HealthModule } from './health/infrastructure/primary/modules/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: ValidatorEnv,
    }),
    HealthModule,
  ],
})
export class AppModule {}
