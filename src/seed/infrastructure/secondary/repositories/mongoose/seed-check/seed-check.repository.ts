import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CustomerModel } from 'src/customer/infrastructure/secondary/repositories/mongoose/models/customer.model';
import { SeedRunCheckRepositoryPort } from 'src/seed/domain/ports/queries-repositories.port';

export class SeedRunCheckMongoRepository implements SeedRunCheckRepositoryPort {
  constructor(
    @InjectModel(CustomerModel.name)
    private seedCheckModel: Model<CustomerModel>,
  ) {}
  async execute(): Promise<boolean> {
    try {
      const seedCheck = await this.seedCheckModel.findOne();
      return seedCheck ? false : true;
    } catch (error) {
      new HttpException(
        {
          code: 500,
          message: 'Internal server error',
          error: error.message,
        },
        500,
      );
    }
  }
}
