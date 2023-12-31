import fs = require('fs');
import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError as NestValidationError } from '@nestjs/common';

import { Payload, defaultPayload } from '@base/api/api.schema';

export const SUCCESS = '000000';
export const UNKNOWN = '999999';
export const SYSTEM_ERROR = '990001';

export const VALIDATION = '010009';

export const NOT_FOUND = '020008';
export const DUPLICATE = '020010';
export const PROTECTED = '020012';
export const QUERY_DB_ERROR = '020013';

export const STATUS_CODE_MAP: Record<string, any> = {
  [HttpStatus.NOT_FOUND]: NOT_FOUND,
};

const ALL_MESSAGES: Record<string, string> = {
  [SUCCESS]: 'Success',
  [UNKNOWN]: 'Unknown error',
  [SYSTEM_ERROR]: 'Uh oh! Something went wrong. Please report to develop team.',
  [NOT_FOUND]: 'The requested information could not be found.',
  [VALIDATION]: 'Invalid input data.',
  [DUPLICATE]: 'Duplicate information.',
};
export const SUCCESS_MESSAGE = ALL_MESSAGES[SUCCESS];
const ALL_ERROR_CODE = Object.keys(ALL_MESSAGES);

const getMessageFromCode = (
  errorCode: string,
  defaultMessage: string,
): string => {
  let message = ALL_MESSAGES[errorCode] || '';
  if (!message) {
    const errorCodeWoutPrefix = ALL_ERROR_CODE.filter((item) =>
      errorCode.endsWith(item),
    );
    message = errorCodeWoutPrefix[0]
      ? ALL_MESSAGES[errorCodeWoutPrefix[0]]
      : message;
  }
  message = message || defaultMessage;
  if (!message)
    fs.writeFile(
      'error-codes-missing-message.log',
      errorCode + '\n',
      { flag: 'a' },
      () => {},
    );
  return message;
};

export abstract class BaseException<TData> extends HttpException {
  protected constructor(
    partial: Payload<TData>,
    statusCode: number,
    defaultMessage = '',
  ) {
    const payload = {
      ...defaultPayload,
      ...partial,
    };
    payload.success = payload.errorCode === SUCCESS && payload.message === '';
    payload.message =
      payload.message || getMessageFromCode(payload.errorCode, defaultMessage);
    super(payload, statusCode);
  }
}

export class BusinessException<TData> extends BaseException<TData> {
  constructor(
    payload: Payload<TData>,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(payload, statusCode);
  }
}

export class BadRequest<TData> extends BaseException<TData> {
  constructor(payload: Payload<TData>) {
    super(payload, HttpStatus.BAD_REQUEST);
  }
}

export class BadException<TData> extends BaseException<TData> {
  constructor(payload: Payload<TData>) {
    super(payload, HttpStatus.ACCEPTED);
  }
}

export class Unauthorized<TData> extends BaseException<TData> {
  constructor(payload: Payload<TData>) {
    super(payload, HttpStatus.UNAUTHORIZED);
  }
}

export class Forbidden<TData> extends BaseException<TData> {
  constructor(payload: Payload<TData>) {
    super(payload, HttpStatus.FORBIDDEN);
  }
}

export class NotFound<TData> extends BaseException<TData> {
  constructor(payload: Payload<TData>) {
    super(payload, HttpStatus.NOT_FOUND, ALL_MESSAGES[NOT_FOUND]);
  }
}

export class MethodNotAllowed<TData> extends BaseException<TData> {
  constructor(payload: Payload<TData>) {
    super(payload, HttpStatus.METHOD_NOT_ALLOWED);
  }
}

export class UnsupportedMediaType<TData> extends BaseException<TData> {
  constructor(payload: Payload<TData>) {
    super(
      payload,
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      'Unsupported format file',
    );
  }
}

function reduceConstraintMsgs(
  validationErrors: NestValidationError[],
): string[] {
  return validationErrors.reduce((acc, cur) => {
    acc = acc.concat(Object.values(cur?.constraints || {}));

    if (cur?.children) acc = acc.concat(reduceConstraintMsgs(cur?.children));

    return acc;
  }, []);
}

const regex = /^[A-Z_]*[0-9]*$/;
export class ValidationError extends BadRequest<any[]> {
  constructor(validationErrors: NestValidationError[]) {
    let errorCode = VALIDATION;
    const constraintMsgs = reduceConstraintMsgs(validationErrors);
    const errorCodes = constraintMsgs
      .filter((message) => regex.test(message))
      .sort();

    if (errorCodes.length) errorCode = errorCodes[0];

    const payload: Payload<any[]> = {
      errorCode,
      message: ALL_MESSAGES[VALIDATION],
      data: validationErrors.reduce((acc, cur) => {
        if (acc.length === 0) {
          const item = { target: cur.target };
          delete cur.target;
          item['error'] = [cur];
          acc.push(item);
          return acc;
        }
        delete cur.target;
        acc[0]['error'].push(cur);
        return acc;
      }, []),
    };
    super(payload);
  }
}

export class QueryDbError extends BadRequest<any> {
  constructor(payload: Payload<any>) {
    super(payload);
  }
}
