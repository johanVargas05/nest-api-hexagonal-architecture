import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { RunSeedRepositoryPort } from '../ports/mutations-repositories.port';
import { RunSeedServicePort } from '../ports/mutations-services.port';
import { LoadDataSeedRepositoryPort } from '../ports/queries-repositories.port';
import {
  LOAD_DATA_SEED_REPOSITORY,
  RUN_SEED_REPOSITORY,
} from '../constants/injections.constant';

export class RunSeedService implements RunSeedServicePort {
  constructor(
    @Inject(RUN_SEED_REPOSITORY)
    private readonly runSeedRepository: RunSeedRepositoryPort,
    @Inject(LOAD_DATA_SEED_REPOSITORY)
    private readonly loadSeedRepository: LoadDataSeedRepositoryPort,
  ) {}

  async execute(): Promise<void> {
    const seedData = await this.loadSeedRepository.execute();

    if (seedData.length === 0) {
      throw new HttpException(
        {
          code: 404,
          message: 'No data found to seed',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.runSeedRepository.execute(seedData);
  }
}
