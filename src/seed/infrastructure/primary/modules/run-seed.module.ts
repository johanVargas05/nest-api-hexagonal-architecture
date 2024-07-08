import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RUN_SEED_REPOSITORY,
  LOAD_DATA_SEED_REPOSITORY,
  SEED_RUN_CHECK_REPOSITORY,
  RUN_SEED_USE_CASE,
  RUN_SEED_SERVICE,
  SEED_RUN_CHECK_SERVICE,
} from '@seed-domain/constants/injections.constant';
import { RunSeedMongoRepository } from '@seed-infrastructure/secondary/repositories/mongoose/run-seed/run-seed.repository';
import { RunSeedController } from '@seed-infrastructure/primary/controllers/run-seed.controller';
import { SeedRunCheckMongoRepository } from '@seed-infrastructure/secondary/repositories/mongoose/seed-check/seed-check.repository';
import { LoadDataSeedFileRepository } from '@seed-infrastructure/secondary/repositories/files/load-data/load-data.repository';
import { RunSeedUseCase } from 'src/seed/application/run-seed.use-case';
import { RunSeedService } from '@seed-domain/services/run-seed.service';
import { SeedCheckService } from '@seed-domain/services/seed-check.service';
import {
  CustomerModel,
  CustomerSchema,
} from '@customer-infrastructure/secondary/repositories/mongoose/models/customer.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerModel.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [RunSeedController],
  providers: [
    /* Infrastructure */
    {
      provide: RUN_SEED_REPOSITORY,
      useClass: RunSeedMongoRepository,
    },
    {
      provide: RUN_SEED_REPOSITORY,
      useClass: RunSeedMongoRepository,
    },
    {
      provide: SEED_RUN_CHECK_REPOSITORY,
      useClass: SeedRunCheckMongoRepository,
    },
    {
      provide: LOAD_DATA_SEED_REPOSITORY,
      useClass: LoadDataSeedFileRepository,
    },

    /* Application */
    {
      provide: RUN_SEED_USE_CASE,
      useClass: RunSeedUseCase,
    },
    /* Domain */
    {
      provide: RUN_SEED_SERVICE,
      useClass: RunSeedService,
    },
    {
      provide: SEED_RUN_CHECK_SERVICE,
      useClass: SeedCheckService,
    },
  ],
})
export class RunSeedModule {}
