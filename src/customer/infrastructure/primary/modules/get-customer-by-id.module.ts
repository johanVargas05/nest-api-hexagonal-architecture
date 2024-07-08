import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CustomerModel,
  CustomerSchema,
} from '@customer-infrastructure/secondary/repositories/mongoose/models/customer.model';
import { GetCustomerByIdController } from '@customer-infrastructure/primary/controllers/get-customer-by-id.controller';
import { GetCustomerByIdMongoRepository } from '@customer-infrastructure/secondary/repositories/mongoose/get-customer-by-id/get-customer-by-id.repository';
import { GetCustomerByIdUseCase } from '@customer-application/get_customer-by-id.use-case';
import {
  GET_CUSTOMER_BY_ID_REPOSITORY,
  GET_CUSTOMER_BY_ID_SERVICE,
  GET_CUSTOMER_BY_ID_USE_CASE,
} from '@customer-domain/constants/injections.constant';
import { GetCustomerByIdService } from '@customer-domain/services/get-customer-by-id.service';
import { RedisOptions } from '@config/config-cache';

@Module({
  imports: [
    CacheModule.registerAsync(RedisOptions),
    MongooseModule.forFeature([
      { name: CustomerModel.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [GetCustomerByIdController],
  providers: [
    /* Infrastructure */
    {
      provide: GET_CUSTOMER_BY_ID_REPOSITORY,
      useClass: GetCustomerByIdMongoRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    /* Application */
    {
      provide: GET_CUSTOMER_BY_ID_USE_CASE,
      useClass: GetCustomerByIdUseCase,
    },
    /* Domain */
    {
      provide: GET_CUSTOMER_BY_ID_SERVICE,
      useClass: GetCustomerByIdService,
    },
  ],
})
export class GetCustomerByIdModule {}
