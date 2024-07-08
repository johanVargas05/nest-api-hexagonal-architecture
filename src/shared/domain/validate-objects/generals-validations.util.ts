import { HttpException, HttpStatus } from '@nestjs/common';

export function validateMaxLength(
  value: number | string | any[],
  input: string,
  maxLength: number,
): void {
  if (typeof value === 'number') value = value.toString();

  if (value.length > maxLength) {
    throw new HttpException(
      {
        code: 400,
        message: `${input} should not have more than ${maxLength} characters`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export function validateMinLength(
  value: number | string | any[],
  input: string,
  minLength: number,
): void {
  if (typeof value === 'number') value = value.toString();

  if (value.length < minLength) {
    throw new HttpException(
      {
        code: 400,
        message: `${input} must have at least ${minLength} characters`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export function validateNotNull(value: any, input: string): void {
  if (typeof value === 'boolean') return;

  if (typeof value === 'number' && value == 0) return;

  if (!value) {
    throw new HttpException(
      {
        code: 400,
        message: `${input} is required`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  if (value?.length === 0) {
    throw new HttpException(
      {
        code: 400,
        message: `Invalid ${input} is empty`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
