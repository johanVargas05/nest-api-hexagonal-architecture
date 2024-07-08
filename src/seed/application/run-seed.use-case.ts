import { Inject } from '@nestjs/common';
import {
  RUN_SEED_SERVICE,
  SEED_RUN_CHECK_SERVICE,
} from '../domain/constants/injections.constant';
import { RunSeedServicePort } from '../domain/ports/mutations-services.port';
import { RunSeedUseCasePort } from '../domain/ports/mutations-use-cases.port';
import { SeedRunCheckServicePort } from '../domain/ports/queries-services.port';

export class RunSeedUseCase implements RunSeedUseCasePort {
  constructor(
    @Inject(RUN_SEED_SERVICE)
    private readonly runSeedService: RunSeedServicePort,
    @Inject(SEED_RUN_CHECK_SERVICE)
    private readonly seedRunCheckService: SeedRunCheckServicePort,
  ) {}

  async execute(): Promise<void> {
    const isSeedRun = await this.seedRunCheckService.execute();
    if (!isSeedRun) return;

    await this.runSeedService.execute();
  }
}
