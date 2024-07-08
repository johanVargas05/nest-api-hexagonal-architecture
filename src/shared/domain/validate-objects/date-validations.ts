import { HttpException, HttpStatus } from '@nestjs/common';

import { validateNotNull } from './generals-validations.util';
import { ValidObject } from '@shared/domain/ports/validate-objects.interface';

export class DateValidateObject implements ValidObject<Date> {
  private _value: Date;
  private _input: string;
  private _isRequired: boolean = true;

  private constructor(input: string) {
    this._input = input;
  }

  static init(input: string): DateValidateObject {
    return new DateValidateObject(input);
  }

  validate(value: Date): void {
    this._value = value;

    if (this._isRequired) {
      validateNotNull(this._value, this._input);
    }

    if (!this._isRequired && !value) return;

    dateValidate(this._value, this._input);
  }

  public isOptional(): DateValidateObject {
    this._isRequired = false;
    return this;
  }

  get value(): Date {
    return this._value;
  }
}

function dateValidate(value: Date, input: string): void {
  if (!(value instanceof Date)) {
    throw new HttpException(
      {
        code: 400,
        message: `Invalid ${input} is not a date`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
