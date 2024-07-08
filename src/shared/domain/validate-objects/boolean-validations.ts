import { HttpException, HttpStatus } from '@nestjs/common';

import { validateNotNull } from './generals-validations.util';
import { ValidObject } from '@shared/domain/ports/validate-objects.interface';

export class BooleanValidateObject implements ValidObject<boolean> {
  private _value: boolean;
  private _input: string;
  private _isRequired: boolean = true;

  private constructor(input: string) {
    this._input = input;
  }

  /**
   * Creates a new instance of BooleanValidateObject.
   *
   * @param {string} input - The input being validated.
   */
  static init(input: string): BooleanValidateObject {
    return new BooleanValidateObject(input);
  }

  public isOptional(): BooleanValidateObject {
    this._isRequired = false;
    return this;
  }

  public validate(value: boolean): void {
    this._value = value;

    if (this._isRequired) {
      validateNotNull(this._value, this._input);
    }

    if (!this._isRequired && !value) return;

    booleanValidate(this._value, this._input);
  }

  get value(): boolean {
    return this._value;
  }
}

function booleanValidate(value: boolean, input: string): void {
  if (typeof value !== 'boolean') {
    throw new HttpException(
      {
        code: 400,
        message: `Invalid ${input} is not a boolean`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
