import { HttpException, HttpStatus } from '@nestjs/common';

import { ValidObject } from '../ports/validate-objects.interface';

import {
  validateMaxLength,
  validateMinLength,
  validateNotNull,
} from './generals-validations.util';

export class StringValidateObject implements ValidObject<string> {
  private _enumToValidate: any;

  private _value: string = '';
  private _input: string;
  private _minLength: number = 3;
  private _maxLength: number;
  private _isRequired: boolean = true;
  private _isEmail: boolean = false;
  private _isUuid: boolean = false;
  private _isDate: boolean = false;
  private _transform:
    | 'toLowerCase'
    | 'toUpperCase'
    | 'toTitleCase'
    | 'toSnakeCase';

  private constructor(input: string) {
    this._input = input;
  }

  /**
   * Creates a new instance of StringValidateObject.
   *
   * @param {string} input - The input being validated.
   */
  static init(input: string): StringValidateObject {
    return new StringValidateObject(input);
  }

  public isEmail(): StringValidateObject {
    this._isEmail = true;
    return this;
  }

  public isOptional(): StringValidateObject {
    this._isRequired = false;
    return this;
  }

  public isDate(): StringValidateObject {
    this._isDate = true;
    return this;
  }

  public inEnum(enumValidate: any): StringValidateObject {
    this._enumToValidate = enumValidate;
    return this;
  }

  public isUuid(): StringValidateObject {
    this._isUuid = true;
    return this;
  }

  public minLength(minLength: number): StringValidateObject {
    this._minLength = minLength;
    return this;
  }

  public maxLength(maxLength: number): StringValidateObject {
    this._maxLength = maxLength;
    return this;
  }

  public transformToLowerCase(): StringValidateObject {
    this._transform = 'toLowerCase';
    return this;
  }

  public transformToTitleCase(): StringValidateObject {
    this._transform = 'toTitleCase';
    return this;
  }

  public transformToSnakeCase(): StringValidateObject {
    this._transform = 'toSnakeCase';
    return this;
  }
  public transformToUpperCase(): StringValidateObject {
    this._transform = 'toUpperCase';
    return this;
  }

  public validate(value: string): StringValidateObject {
    this._value = clearString(value);

    if (this._isRequired) {
      validateNotNull(value, this._input);
    }

    if (!this._isRequired && !value) return this;

    stringValidate(this._value, this._input);

    if (this.minLength !== undefined) {
      validateMinLength(this._value, this._input, this._minLength);
    }

    if (this.maxLength !== undefined) {
      validateMaxLength(this._value, this._input, this._maxLength);
    }

    if (this._isEmail) {
      this._value = emailValidate(this._value);
    }

    if (this._isUuid) {
      uuidValidate(this._value, this._input);
    }

    if (this._enumToValidate) {
      validateEnum(this._value, this._input, this._enumToValidate);
    }

    if (this._isDate) {
      this._value = new Date(this._value).toISOString();
      if (this._value === 'Invalid Date') {
        throw new HttpException(
          {
            code: 400,
            message: `${this._input} has an invalid date`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return this;
  }

  get value(): string {
    return transformValue(this._transform, this._value);
  }
}

function transformValue(transform: string, value: string): string {
  if (!value) {
    return '';
  }

  switch (transform) {
    case 'toLowerCase':
      value = value.toLowerCase();
      break;
    case 'toTitleCase':
      value = value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      break;
    case 'toSnakeCase':
      value = value.toLocaleLowerCase().replace(' ', '_');
      break;
    case 'toUpperCase':
      value = value.toUpperCase();
      break;
    default:
      return value;
  }

  return value;
}

function clearString(value: string): string {
  value = value?.trim();
  value = value?.replace(/\s+/g, ' ');
  value = value?.replace(/'/g, "''");
  value = value?.replace(/[\x00-\x1F\x7F-\x9F]/g, '');

  return value;
}

function emailValidate(value: string): string {
  const email = clearString(value).toLocaleLowerCase();
  const emailRegex = new RegExp(
    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  );

  if (!emailRegex.test(email)) {
    throw new HttpException(
      {
        code: 400,
        message: 'Invalid email',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  return email;
}

function stringValidate(value: string, input: string): string {
  if (typeof value !== 'string') {
    throw new HttpException(
      {
        code: 400,
        message: `${input} has an invalid string`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  const text = clearString(value);

  return text;
}

function uuidValidate(value: string, input: string): void {
  const uuidRegex = new RegExp(
    '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$|^[A-Za-z0-9]{28,30}$',
  );

  if (!uuidRegex.test(value)) {
    throw new HttpException(
      {
        code: 400,
        message: `${input} receive ${value}, is an invalid UUID`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

function validateEnum(
  value: string,
  input: string,
  enumToValidate: { [key: string]: string },
): void {
  if (!Object.values(enumToValidate).includes(value)) {
    throw new HttpException(
      {
        code: 400,
        message: `${value} from ${input} is not a valid value`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
