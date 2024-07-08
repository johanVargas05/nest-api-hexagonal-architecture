import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CustomerEntity } from 'src/customer/domain/entities/customer.entity';
import { CustomerModel } from 'src/customer/infrastructure/secondary/repositories/mongoose/models/customer.model';
import { RunSeedRepositoryPort } from 'src/seed/domain/ports/mutations-repositories.port';

export class RunSeedMongoRepository implements RunSeedRepositoryPort {
  constructor(
    @InjectModel(CustomerModel.name)
    private customerModel: Model<CustomerModel>,
  ) {}
  async execute(customers: CustomerEntity[]): Promise<void> {
    try {
      const customersToInsert: CustomerModel[] = customers.map(customer => {
        return {
          address: customer.address,
          blocked: customer.blocked,
          cellPhone: customer.cellPhone,
          channel: customer.channel,
          clientId: customer.id,
          country: customer.country,
          customerGroup: customer.customerGroup,
          customerSchema: customer.customerSchema,
          distrChan: customer.distrChan,
          division: customer.division,
          fiscalCode: customer.fiscalCode,
          alternateFiscalCode: customer.alternateFiscalCode,
          frequency: customer.frequency,
          frequencyDays: customer.frequencyDays,
          alternateIndustryCode: customer.alternateIndustryCode,
          alternateName: customer.alternateName,
          idPortfolio: customer.idPortfolio,
          immediateDelivery: customer.immediateDelivery,
          industryCode: customer.industryCode,
          isEnrollment: customer.isEnrollment,
          name: customer.name,
          office: customer.office,
          paymentCondition: customer.paymentCondition,
          paymentMethods: customer.paymentMethods,
          priceGroup: customer.priceGroup,
          priceList: customer.priceList,
          routeId: customer.routeId,
          salesOrg: customer.salesOrg,
          supplyCenter: customer.supplyCenter,
          updateDate: customer.updateDate,
          vendorGroup: customer.vendorGroup,
        };
      });
      await this.customerModel.insertMany(customersToInsert);
    } catch (error) {
      new HttpException(
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
