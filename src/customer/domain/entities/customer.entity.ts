import {
  ArrayValidateObject,
  BooleanValidateObject,
  NumberValidateObject,
  StringValidateObject,
} from 'src/shared/domain/validate-objects';
import { ObjectValidate } from 'src/shared/domain/validate-objects/object-validations';

export interface CustomerProps {
  id: string;
  name: string;
  address: string;
  blocked: boolean;
  cellPhone: string;
  channel: string;
  country: string;
  customerGroup: {
    group: string;
    group1: string;
    group2: string;
    group3: string;
    group4: string;
    group5: string;
  };
  customerSchema: number;
  distrChan: number;
  division: number;
  fiscalCode: number;
  alternate_fiscalCode: number;
  frequency: boolean;
  frequencyDays: string;
  idPortfolio: string;
  immediateDelivery: boolean;
  industryCode: string;
  alternate_industryCode: string;
  isEnrollment: boolean;
  alternate_name: string;
  office: string;
  paymentCondition: string;
  paymentMethods: {
    clientId: string;
    typeCredit: string;
    creditLimit: number;
    creditUsed: number;
    amountAvailable: number;
  }[];
  priceGroup: number;
  priceList: number;
  routeId: number;
  salesOrg: string;
  supplyCenter: string;
  updateDate: string;
  vendorGroup: string;
}

export class CustomerEntity {
  private readonly _id = StringValidateObject.init('Customer id').isUuid();
  private readonly _name = StringValidateObject.init('Customer name')
    .minLength(3)
    .maxLength(50)
    .transformToTitleCase();
  private readonly _address = StringValidateObject.init('Address')
    .minLength(10)
    .maxLength(100);
  private readonly _blocked = BooleanValidateObject.init('Blocked');
  private readonly _cellPhone = StringValidateObject.init('Cell Phone')
    .minLength(13)
    .maxLength(13);
  private readonly _channel = StringValidateObject.init('Channel')
    .minLength(3)
    .maxLength(20)
    .transformToLowerCase();
  private readonly _country = StringValidateObject.init('Country')
    .minLength(2)
    .maxLength(3);
  private readonly _customerGroup = ObjectValidate.init<{
    group: string;
    group1: string;
    group2: string;
    group3: string;
    group4: string;
    group5: string;
  }>(
    {
      group: StringValidateObject.init('Customer Group')
        .minLength(1)
        .maxLength(5),
      group1: StringValidateObject.init('Customer Group1')
        .minLength(1)
        .maxLength(5),
      group2: StringValidateObject.init('Customer Group2')
        .minLength(1)
        .maxLength(5),
      group3: StringValidateObject.init('Customer Group3')
        .minLength(1)
        .maxLength(5),
      group4: StringValidateObject.init('Customer Group4')
        .minLength(1)
        .maxLength(5),
      group5: StringValidateObject.init('Customer Group5')
        .minLength(1)
        .maxLength(5),
    },
    'Customer Group',
  );
  private readonly _customerSchema = NumberValidateObject.init(
    'Customer Schema',
  )
    .isPositive()
    .isNotZero()
    .minLength(1)
    .maxLength(5);
  private readonly _distrChan = NumberValidateObject.init(
    'Distribution Channel',
  )
    .minLength(1)
    .maxLength(5);
  private readonly _division = NumberValidateObject.init('Division')
    .minLength(1)
    .maxLength(5);
  private readonly _fiscalCode = NumberValidateObject.init('Fiscal Code')
    .minLength(9)
    .maxLength(9);
  private readonly _alternate_fiscalCode = NumberValidateObject.init(
    'Alternate fiscal Code',
  )
    .minLength(10)
    .maxLength(10);
  private readonly _frequency = BooleanValidateObject.init('Frequency');
  private readonly _frequencyDays = StringValidateObject.init('Frequency Days')
    .minLength(2)
    .maxLength(5);
  private readonly _idPortfolio = StringValidateObject.init('ID Portfolio')
    .minLength(2)
    .maxLength(5);
  private readonly _immediateDelivery =
    BooleanValidateObject.init('Immediate Delivery');
  private readonly _industryCode = StringValidateObject.init('Industry Code')
    .minLength(5)
    .maxLength(50);
  private readonly _alternate_industryCode = StringValidateObject.init(
    'Alternate industry Code',
  )
    .minLength(5)
    .maxLength(50);
  private readonly _isEnrollment = BooleanValidateObject.init('Is Enrollment');
  private readonly _alternate_name = StringValidateObject.init('Alternate Name')
    .minLength(3)
    .maxLength(50)
    .transformToTitleCase();
  private readonly _office = StringValidateObject.init('Office')
    .minLength(4)
    .maxLength(10);
  private readonly _paymentCondition = StringValidateObject.init(
    'Payment Condition',
  )
    .minLength(4)
    .maxLength(10);
  private readonly _paymentMethods = ArrayValidateObject.init<{
    clientId: string;
    typeCredit: string;
    creditLimit: number;
    creditUsed: number;
    amountAvailable: number;
  }>(
    ObjectValidate.init(
      {
        clientId: StringValidateObject.init('Client ID').isUuid(),
        typeCredit: StringValidateObject.init('Type Credit')
          .minLength(3)
          .maxLength(5),
        creditLimit: NumberValidateObject.init('Credit Limit')
          .isPositive()
          .isNotZero(),
        creditUsed: NumberValidateObject.init('Credit Used').isPositive(),
        amountAvailable: NumberValidateObject.init('Amount Available')
          .isPositive()
          .isNotZero(),
      },
      'Payment method',
    ),
    'Payment Methods',
  );
  private readonly _priceGroup = NumberValidateObject.init('Price Group')
    .minLength(1)
    .maxLength(5);
  private readonly _priceList = NumberValidateObject.init('Price List')
    .minLength(1)
    .maxLength(5);
  private readonly _routeId = NumberValidateObject.init('Route ID')
    .minLength(6)
    .maxLength(6);
  private readonly _salesOrg = StringValidateObject.init('Sales Organization')
    .minLength(4)
    .maxLength(10);
  private readonly _supplyCenter = StringValidateObject.init('Supply Center')
    .minLength(4)
    .maxLength(50);
  private readonly _updateDate =
    StringValidateObject.init('Update Date').isDate();
  private readonly _vendorGroup = StringValidateObject.init('Vendor Group')
    .minLength(3)
    .maxLength(10);

  private constructor(props: CustomerProps) {
    this._id.validate(props.id);
    this._name.validate(props.name);
    this._address.validate(props.address);
    this._blocked.validate(props.blocked);
    this._cellPhone.validate(props.cellPhone);
    this._channel.validate(props.channel);
    this._country.validate(props.country);
    this._customerGroup.validate(props.customerGroup);
    this._customerSchema.validate(props.customerSchema);
    this._distrChan.validate(props.distrChan);
    this._division.validate(props.division);
    this._fiscalCode.validate(props.fiscalCode);
    this._alternate_fiscalCode.validate(props.alternate_fiscalCode);
    this._frequency.validate(props.frequency);
    this._frequencyDays.validate(props.frequencyDays);
    this._idPortfolio.validate(props.idPortfolio);
    this._immediateDelivery.validate(props.immediateDelivery);
    this._industryCode.validate(props.industryCode);
    this._alternate_industryCode.validate(props.alternate_industryCode);
    this._isEnrollment.validate(props.isEnrollment);
    this._alternate_name.validate(props.alternate_name);
    this._office.validate(props.office);
    this._paymentCondition.validate(props.paymentCondition);
    console.log(
      '🚀 ~ CustomerEntity ~ constructor ~ props.paymentMethods:',
      props.paymentMethods,
    );
    this._paymentMethods.validate(props.paymentMethods);
    this._priceGroup.validate(props.priceGroup);
    this._priceList.validate(props.priceList);
    this._routeId.validate(props.routeId);
    this._salesOrg.validate(props.salesOrg);
    this._supplyCenter.validate(props.supplyCenter);
    this._updateDate.validate(props.updateDate);
    this._vendorGroup.validate(props.vendorGroup);
  }

  static init(props: CustomerProps): CustomerEntity {
    return new CustomerEntity(props);
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      blocked: this.blocked,
      cellPhone: this.cellPhone,
      channel: this.channel,
      country: this.country,
      customerGroup: this.customerGroup,
      customerSchema: this.customerSchema,
      distrChan: this.distrChan,
      division: this.division,
      fiscalCode: this.fiscalCode,
      alternate_fiscalCode: this.alternateFiscalCode,
      frequency: this.frequency,
      frequencyDays: this.frequencyDays,
      idPortfolio: this.idPortfolio,
      immediateDelivery: this.immediateDelivery,
      industryCode: this.industryCode,
      alternate_industryCode: this.alternateIndustryCode,
      isEnrollment: this.isEnrollment,
      alternate_name: this.alternateName,
      office: this.office,
      paymentCondition: this.paymentCondition,
      paymentMethods: this.paymentMethods,
      priceGroup: this.priceGroup,
      priceList: this.priceList,
      routeId: this.routeId,
      salesOrg: this.salesOrg,
      supplyCenter: this.supplyCenter,
      updateDate: this.updateDate,
      vendorGroup: this.vendorGroup,
    };
  }

  get id(): string {
    return this._id.value;
  }

  get name(): string {
    return this._name.value;
  }

  get address(): string {
    return this._address.value;
  }

  get blocked(): boolean {
    return this._blocked.value;
  }

  get cellPhone(): string {
    return this._cellPhone.value;
  }

  get channel(): string {
    return this._channel.value;
  }

  get country(): string {
    return this._country.value;
  }

  get customerGroup(): {
    group: string;
    group1: string;
    group2: string;
    group3: string;
    group4: string;
    group5: string;
  } {
    return this._customerGroup.value;
  }

  get customerSchema(): number {
    return this._customerSchema.value;
  }

  get distrChan(): number {
    return this._distrChan.value;
  }

  get division(): number {
    return this._division.value;
  }

  get fiscalCode(): number {
    return this._fiscalCode.value;
  }

  get alternateFiscalCode(): number {
    return this._alternate_fiscalCode.value;
  }

  get frequency(): boolean {
    return this._frequency.value;
  }

  get frequencyDays(): string {
    return this._frequencyDays.value;
  }

  get idPortfolio(): string {
    return this._idPortfolio.value;
  }

  get immediateDelivery(): boolean {
    return this._immediateDelivery.value;
  }

  get industryCode(): string {
    return this._industryCode.value;
  }

  get alternateIndustryCode(): string {
    return this._alternate_industryCode.value;
  }

  get isEnrollment(): boolean {
    return this._isEnrollment.value;
  }

  get alternateName(): string {
    return this._alternate_name.value;
  }

  get office(): string {
    return this._office.value;
  }

  get paymentCondition(): string {
    return this._paymentCondition.value;
  }

  get paymentMethods(): {
    clientId: string;
    typeCredit: string;
    creditLimit: number;
    creditUsed: number;
    amountAvailable: number;
  }[] {
    return this._paymentMethods.value;
  }

  get priceGroup(): number {
    return this._priceGroup.value;
  }

  get priceList(): number {
    return this._priceList.value;
  }

  get routeId(): number {
    return this._routeId.value;
  }

  get salesOrg(): string {
    return this._salesOrg.value;
  }

  get supplyCenter(): string {
    return this._supplyCenter.value;
  }

  get updateDate(): Date {
    return new Date(this._updateDate.value);
  }

  get vendorGroup(): string {
    return this._vendorGroup.value;
  }
}
