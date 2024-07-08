import { CustomerEntity } from '@customer-domain/entities/customer.entity';

export interface GetCustomerByIdQueryRepositoryPort {
  execute(id: string): Promise<CustomerEntity>;
}
