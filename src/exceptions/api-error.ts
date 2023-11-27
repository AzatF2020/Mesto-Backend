import { ErrorCodes } from '../utils/errorCodes';

export default class ApiError extends Error {
  readonly status;

  readonly message;

  readonly errors;

  private static readonly errors: string[] | undefined;

  constructor(message: string, status: number, errors: string[] = []) {
    super();
    this.message = message!;
    this.status = status!;
    this.errors = errors!;
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(message, ErrorCodes.BadRequest, errors);
  }

  static UnauthorizedError() {
    return new ApiError('user not authorized', ErrorCodes.UnAuth, this.errors);
  }

  static Forbidden(errors = []) {
    return new ApiError('permission denied', ErrorCodes.Forbidden, this.errors);
  }

  static NotFound(message: string, errors = []) {
    return new ApiError(message, ErrorCodes.NotFound, errors);
  }
}
