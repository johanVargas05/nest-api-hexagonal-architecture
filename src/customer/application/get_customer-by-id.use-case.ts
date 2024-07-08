import { Inject } from '@nestjs/common';

import { GET_CUSTOMER_BY_ID_SERVICE } from '@customer-domain/constants/injections.constant';
import { CustomerEntity } from '@customer-domain/entities/customer.entity';
import { GetCustomerByIdQueryServicePort } from '@customer-domain/ports/queries-services.ports';
import { GetCustomerByIdQueryUseCasePort } from '@customer-domain/ports/queries-use-cases.ports';

export class GetCustomerByIdUseCase implements GetCustomerByIdQueryUseCasePort {
  constructor(
    @Inject(GET_CUSTOMER_BY_ID_SERVICE)
    private readonly getCustomerByIdService: GetCustomerByIdQueryServicePort,
  ) {}

  async execute(id: string): Promise<CustomerEntity> {
    return await this.getCustomerByIdService.execute(id);
  }
}
