import { Controller, Get, Inject } from '@nestjs/common';

import { RUN_SEED_USE_CASE } from '@seed-domain/constants/injections.constant';
import { RunSeedUseCasePort } from '@seed-domain/ports/mutations-use-cases.port';

@Controller()
export class RunSeedController {
  constructor(@Inject(RUN_SEED_USE_CASE) private useCase: RunSeedUseCasePort) {}
  @Get('seed')
  async runSeed() {
    await this.useCase.execute();
    return {
      code: 200,
      message: 'Seed executed',
    };
  }
}
