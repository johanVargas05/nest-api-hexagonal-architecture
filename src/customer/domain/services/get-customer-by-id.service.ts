import { Inject } from '@nestjs/common';

import { CustomerEntity } from '@customer-domain/entities/customer.entity';
import { GET_CUSTOMER_BY_ID_REPOSITORY } from '@customer-domain/constants/injections.constant';
import { GetCustomerByIdQueryServicePort } from '@customer-domain/ports/queries-services.ports';
import { GetCustomerByIdQueryRepositoryPort } from '@customer-domain/ports/queries-repositories.ports';
import { StringValidateObject } from '@shared/domain/validate-objects';

export class GetCustomerByIdService implements GetCustomerByIdQueryServicePort {
  constructor(
    @Inject(GET_CUSTOMER_BY_ID_REPOSITORY)
    private readonly getCustomerRepository: GetCustomerByIdQueryRepositoryPort,
  ) {}
  async execute(id: string): Promise<CustomerEntity> {
    const customerId = StringValidateObject.init('Customer id')
      .isUuid()
      .validate(id);

    return await this.getCustomerRepository.execute(customerId.value);
  }
}
