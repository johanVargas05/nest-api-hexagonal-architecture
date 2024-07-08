import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<CustomerModel>;

@Schema({
  collection: 'clients',
  versionKey: false,
})
export class CustomerModel {
  @Prop()
  address: string;

  @Prop()
  blocked: boolean;

  @Prop()
  cellPhone: string;

  @Prop()
  channel: string;

  @Prop()
  clientId: string;

  @Prop()
  country: string;

  @Prop({ type: Object })
  customerGroup: {
    group: string;
    group1: string;
    group2: string;
    group3: string;
    group4: string;
    group5: string;
  };

  @Prop()
  customerSchema: number;

  @Prop()
  distrChan: number;

  @Prop()
  division: number;

  @Prop()
  fiscalCode: number;

  @Prop()
  alternateFiscalCode: number;

  @Prop()
  frequency: boolean;

  @Prop()
  frequencyDays: string;

  @Prop()
  idPortfolio: string;

  @Prop()
  immediateDelivery: boolean;

  @Prop()
  industryCode: string;

  @Prop()
  alternateIndustryCode: string;

  @Prop()
  isEnrollment: boolean;

  @Prop()
  name: string;

  @Prop()
  alternateName: string;

  @Prop()
  office: string;

  @Prop()
  paymentCondition: string;

  @Prop({ type: [{ type: Object }] })
  paymentMethods: {
    clientId: string;
    typeCredit: string;
    creditLimit: number;
    creditUsed: number;
    amountAvailable: number;
  }[];

  @Prop()
  priceGroup: number;

  @Prop()
  priceList: number;

  @Prop()
  routeId: number;

  @Prop()
  salesOrg: string;

  @Prop()
  supplyCenter: string;

  @Prop({ type: Date })
  updateDate: Date;

  @Prop()
  vendorGroup: string;
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerModel);
