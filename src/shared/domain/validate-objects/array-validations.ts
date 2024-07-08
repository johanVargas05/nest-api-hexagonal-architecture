import { HttpException, HttpStatus } from '@nestjs/common';

import { validateNotNull } from './generals-validations.util';
import { ValidObject } from '@shared/domain/ports/validate-objects.interface';

export class ArrayValidateObject<T> {
  private _data: T[];
  private _struct: ValidObject<T>;
  private _input: string;
  private _isRequired: boolean = true;

  private constructor(struct: ValidObject<T>, input: string) {
    this._struct = struct;
    this._input = input;
  }

  /**
   * Creates a new instance of ArrayValidateObject.
   *
   * @param {ValidObject[]} struct - The array struct to validate.
   * @param {string} input - The input being validated.
   */
  static init<T>(struct: ValidObject<T>, input: string) {
    return new ArrayValidateObject(struct, input);
  }

  public isOptional(): ArrayValidateObject<T> {
    this._isRequired = false;
    return this;
  }

  public validate(data: T[]): void {
    if (this._isRequired) {
      validateNotNull(data, this._input);
    }

    if (!this._isRequired && (data?.length === 0 || !data)) {
      this._data = data;
      return;
    }

    arrayValidate(data, this._input);

    this._data = data.filter((item, idx) => {
      try {
        this._struct.validate(item);
        return this._struct.value;
      } catch (error) {
        throw new HttpException(
          {
            code: 400,
            message: `${error.message}, Invalid value in index ${idx}`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }

  get value(): T[] {
    return this._data;
  }
}

function arrayValidate(value: any, input: string): void {
  if (!Array.isArray(value)) {
    throw new HttpException(
      {
        code: 400,
        message: `Invalid ${input} not is an array`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
