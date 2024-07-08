import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CustomerEntity } from '@customer-domain/entities/customer.entity';
import { GetCustomerByIdQueryRepositoryPort } from '@customer-domain/ports/queries-repositories.ports';
import { CustomerModel } from '@customer-infrastructure/secondary/repositories/mongoose/models/customer.model';
import { HttpException } from '@nestjs/common';

export class GetCustomerByIdMongoRepository
  implements GetCustomerByIdQueryRepositoryPort
{
  constructor(
    @InjectModel(CustomerModel.name)
    private readonly customerModel: Model<CustomerModel>,
  ) {}
  async execute(id: string): Promise<CustomerEntity> {
    const dataCUstomer = await this.customerModel.findOne({ clientId: id });
    if (!dataCUstomer) {
      throw new HttpException(
        {
          code: 404,
          message: 'Customer not found',
        },
        404,
      );
    }

    return CustomerEntity.init({
      address: dataCUstomer.address,
      blocked: dataCUstomer.blocked,
      cellPhone: dataCUstomer.cellPhone,
      channel: dataCUstomer.channel,
      id: dataCUstomer.clientId,
      country: dataCUstomer.country,
      customerGroup: dataCUstomer.customerGroup,
      customerSchema: dataCUstomer.customerSchema,
      distrChan: dataCUstomer.distrChan,
      division: dataCUstomer.division,
      fiscalCode: dataCUstomer.fiscalCode,
      alternateFiscalCode: dataCUstomer.alternateFiscalCode,
      frequency: dataCUstomer.frequency,
      frequencyDays: dataCUstomer.frequencyDays,
      alternateIndustryCode: dataCUstomer.alternateIndustryCode,
      alternateName: dataCUstomer.alternateName,
      idPortfolio: dataCUstomer.idPortfolio,
      immediateDelivery: dataCUstomer.immediateDelivery,
      industryCode: dataCUstomer.industryCode,
      isEnrollment: dataCUstomer.isEnrollment,
      name: dataCUstomer.name,
      office: dataCUstomer.office,
      paymentCondition: dataCUstomer.paymentCondition,
      paymentMethods: dataCUstomer.paymentMethods,
      priceGroup: dataCUstomer.priceGroup,
      priceList: dataCUstomer.priceList,
      routeId: dataCUstomer.routeId,
      salesOrg: dataCUstomer.salesOrg,
      supplyCenter: dataCUstomer.supplyCenter,
      updateDate: dataCUstomer.updateDate.toISOString(),
      vendorGroup: dataCUstomer.vendorGroup,
    });
  }
}
