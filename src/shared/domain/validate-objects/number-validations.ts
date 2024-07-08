import { HttpException, HttpStatus } from '@nestjs/common';

import { ValidObject } from '../ports/validate-objects.interface';
import {
  validateMaxLength,
  validateMinLength,
  validateNotNull,
} from './generals-validations.util';

export class NumberValidateObject implements ValidObject<number> {
  private _value: number;
  private _input: string;
  private _minLength: number;
  private _maxLength: number;
  private _validateIsNotZero: boolean = false;
  private _isRequired: boolean = true;
  private _isPositive: boolean = false;
  private _isNegative: boolean = false;

  private constructor(input: string) {
    this._input = input;
  }

  /**
   * Creates a new instance of NumberValidateObject.
   *
   * @param {string} input - The input being validated.
   */
  static init(input: string): NumberValidateObject {
    return new NumberValidateObject(input);
  }

  public minLength(minLength: number): NumberValidateObject {
    this._minLength = minLength;
    return this;
  }

  public maxLength(maxLength: number): NumberValidateObject {
    this._maxLength = maxLength;
    return this;
  }

  public isOptional(): NumberValidateObject {
    this._isRequired = false;
    return this;
  }

  public isNegative(): NumberValidateObject {
    this._isNegative = true;
    return this;
  }

  public isPositive(): NumberValidateObject {
    this._isPositive = true;
    return this;
  }

  public isNotZero(): NumberValidateObject {
    this._validateIsNotZero = true;
    return this;
  }

  public validate(value: number): void {
    this._value = value;

    if (this._isRequired) {
      validateNotNull(this._value, this._input);
    }

    if (!this._isRequired && !value) return;

    numberValidate(this._value, this._input);

    if (this.minLength !== undefined) {
      validateMinLength(this._value, this._input, this._minLength);
    }

    if (this.maxLength !== undefined) {
      validateMaxLength(this._value, this._input, this._maxLength);
    }

    if (this._isNegative) {
      validateIsNegative(this._value, this._input);
    }

    if (this._isPositive) {
      validateIsPositive(this._value, this._input);
    }

    if (this._validateIsNotZero && this._value === 0) {
      throw new HttpException(
        {
          code: 400,
          message: `${this._input} could not be a 0`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  get value(): number {
    return this._value;
  }
}

function numberValidate(value: number, input: string): void {
  if (typeof value !== 'number') {
    throw new HttpException(
      {
        code: 400,
        message: `${input} is not a number`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

function validateIsNegative(value: number, input: string): void {
  if (value > 0) {
    throw new HttpException(
      {
        code: 400,
        message: `${input} with value ${value} is not a negative number`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

function validateIsPositive(value: number, input: string): void {
  if (value < 0) {
    throw new HttpException(
      {
        code: 400,
        message: `${input} with value ${value} is not a positive number`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
