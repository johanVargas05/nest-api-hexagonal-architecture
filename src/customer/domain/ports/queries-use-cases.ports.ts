import { CustomerEntity } from '@customer-domain/entities/customer.entity';

export interface GetCustomerByIdQueryUseCasePort {
  execute(id: string): Promise<CustomerEntity>;
}
