import {
  Controller,
  Get,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';

import { GET_CUSTOMER_BY_ID_USE_CASE } from '@customer-domain/constants/injections.constant';
import { GetCustomerByIdQueryUseCasePort } from '@customer-domain/ports/queries-use-cases.ports';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('customer')
@UseInterceptors(CacheInterceptor)
export class GetCustomerByIdController {
  constructor(
    @Inject(GET_CUSTOMER_BY_ID_USE_CASE)
    private readonly useCase: GetCustomerByIdQueryUseCasePort,
  ) {}
  @Get(':id')
  async getCustomerById(@Param('id') id: string) {
    const data = await this.useCase.execute(id);
    return {
      code: 200,
      message: 'Customer found',
      data,
    };
  }
}
