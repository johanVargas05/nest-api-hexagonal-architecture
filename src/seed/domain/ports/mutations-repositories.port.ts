import { CustomerEntity } from 'src/customer/domain/entities/customer.entity';

export interface RunSeedRepositoryPort {
  execute(customers: CustomerEntity[]): Promise<void>;
}
