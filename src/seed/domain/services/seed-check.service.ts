import { HttpException, HttpStatus, Inject } from '@nestjs/common';

import { SeedRunCheckServicePort } from '@seed-domain/ports/queries-services.port';
import { SeedRunCheckRepositoryPort } from '@seed-domain/ports/queries-repositories.port';
import { SEED_RUN_CHECK_REPOSITORY } from '@seed-domain/constants/injections.constant';

export class SeedCheckService implements SeedRunCheckServicePort {
  constructor(
    @Inject(SEED_RUN_CHECK_REPOSITORY)
    private readonly seedCheckRepository: SeedRunCheckRepositoryPort,
  ) {}

  async execute(): Promise<boolean> {
    const isSeeded = await this.seedCheckRepository.execute();

    if (!isSeeded) {
      throw new HttpException(
        {
          code: 400,
          message: 'Seed already executed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return isSeeded;
  }
}
