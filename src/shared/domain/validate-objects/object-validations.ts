import { HttpException, HttpStatus } from '@nestjs/common';

import { validateNotNull } from './generals-validations.util';
import { ValidObject } from '@shared/domain/ports/validate-objects.interface';

interface struct {
  [key: string]: ValidObject<any>;
}

export class ObjectValidate<T> implements ValidObject<T> {
  private _value: { [key: string]: any } = {};
  private _input: string;
  private _isRequired: boolean = true;
  private _validators: struct;
  private _strictKeys: boolean = false;

  private constructor(struct: struct, input: string = 'object') {
    this._input = input;
    this._validators = struct;
  }

  static init<T>(struct: struct, input: string = 'object'): ObjectValidate<T> {
    return new ObjectValidate<T>(struct, input);
  }

  public isOptional(): ObjectValidate<T> {
    this._isRequired = false;
    return this;
  }

  public strictKeys(): ObjectValidate<T> {
    this._strictKeys = true;
    return this;
  }

  public validate(data: { [key: string]: any }): ObjectValidate<T> {
    if (!this._isRequired && !data) return;

    validateNotNull(data, this._input);

    if (this._strictKeys) {
      for (const key in data) {
        if (!this._validators.hasOwnProperty(key)) {
          throw new HttpException(
            {
              code: 400,
              message: `Invalidate property ${key} in ${this._input} object`,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }

    for (const key in this._validators) {
      if (data.hasOwnProperty(key)) {
        this._validators[key].validate(data[key]);
        this._value[key] = this._validators[key].value;
      }
    }

    return this;
  }

  public get value(): T {
    return this._value as T;
  }
}
