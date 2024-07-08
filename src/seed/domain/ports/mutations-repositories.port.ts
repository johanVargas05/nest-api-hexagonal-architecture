import { CustomerEntity } from '@customer-domain/entities/customer.entity';

export interface RunSeedRepositoryPort {
  execute(customers: CustomerEntity[]): Promise<void>;
}
