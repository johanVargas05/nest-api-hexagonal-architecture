import { readFileSync } from 'fs';
import { join } from 'path';

import { HttpException } from '@nestjs/common';

import { CustomerEntity } from 'src/customer/domain/entities/customer.entity';
import { LoadDataSeedRepositoryPort } from 'src/seed/domain/ports/queries-repositories.port';

export class LoadDataSeedFileRepository implements LoadDataSeedRepositoryPort {
  constructor() {}

  async execute(): Promise<CustomerEntity[]> {
    try {
      const pathFile = join(
        __dirname,
        '../../../../../../data/data_client.json',
      );
      const contentFile = readFileSync(pathFile, 'utf-8');
      const dataFile = JSON.parse(contentFile);
      const entities: CustomerEntity[] = [];

      for (const data of dataFile) {
        const entity = CustomerEntity.init({
          address: data.address,
          alternate_fiscalCode: +data.fiscalCode2,
          alternate_industryCode: data.industryCode1,
          alternate_name: data.name2,
          blocked: data.blocked == 'SI' ? true : false,
          cellPhone: data.cellPhone,
          channel: data.channel,
          country: data.country,
          customerGroup: data.customerGroup,
          customerSchema: data.customerSchema,
          distrChan: +data.distrChan,
          division: +data.division,
          fiscalCode: +data.fiscalCode1,
          frequency: data.frequency,
          frequencyDays: data.frequencyDays,
          id: data.clientId,
          idPortfolio: data.idPortfolio,
          immediateDelivery: data.immediateDelivery,
          industryCode: data.industryCode,
          isEnrollment: data.isEnrollment,
          name: data.name,
          office: data.office,
          paymentCondition: data.paymentCondition,
          paymentMethods: data.paymentMethods,
          priceGroup: +data.priceGroup,
          priceList: +data.priceList,
          routeId: +data.routeId,
          salesOrg: data.salesOrg,
          supplyCenter: data.supplyCenter,
          updateDate: data.updateDate['$date'],
          vendorGroup: data.vendorGroup,
        });
        entities.push(entity);
      }
      return entities;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          code: 500,
          message: 'Internal server error',
          error: error.message,
        },
        500,
      );
    }
  }
}
