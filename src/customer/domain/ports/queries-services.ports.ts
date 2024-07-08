import { CustomerEntity } from '@customer-domain/entities/customer.entity';

export interface GetCustomerByIdQueryServicePort {
  execute(id: string): Promise<CustomerEntity>;
}
