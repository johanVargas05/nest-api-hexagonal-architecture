import { Module } from '@nestjs/common';

import { GetCustomerByIdModule } from './get-customer-by-id.module';

@Module({
  imports: [GetCustomerByIdModule],
})
export class CustomerModule {}
