import { CustomerEntity } from '@customer-domain/entities/customer.entity';

export interface LoadDataSeedRepositoryPort {
  execute(): Promise<CustomerEntity[]>;
}

export interface SeedRunCheckRepositoryPort {
  execute(): Promise<boolean>;
}
