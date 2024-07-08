import { Module } from '@nestjs/common';

import { RunSeedModule } from './run-seed.module';

@Module({
  imports: [RunSeedModule],
})
export class SeedModule {}
