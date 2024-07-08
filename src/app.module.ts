import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ValidatorEnv } from './config/validator-env';
import { HealthModule } from './health/infrastructure/primary/modules/health.module';
import { SeedModule } from './seed/infrastructure/primary/modules/seed.module';
import { CustomerModule } from './customer/infrastructure/primary/modules/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: ValidatorEnv,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('MONGO_DB_HOST')}:${configService.get('MONGO_DB_PORT')}/${configService.get('MONGO_DB_DATABASE')}`,
      }),
      inject: [ConfigService],
    }),
    CustomerModule,
    HealthModule,
    SeedModule,
  ],
})
export class AppModule {}
