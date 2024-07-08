import { CustomerEntity } from 'src/customer/domain/entities/customer.entity';

export interface LoadDataSeedRepositoryPort {
  execute(): Promise<CustomerEntity[]>;
}

export interface SeedRunCheckRepositoryPort {
  execute(): Promise<boolean>;
}
