import { serverCodes } from '../utils/serverCodes';

export default class ApiError extends Error {
  readonly status;
  readonly errors;

  private static readonly errors: string[] | undefined;
  private static message: string;

  constructor(message: string, status: number, errors: string[] = []) {
    super(message);
    this.status = status!;
    this.errors = errors!;
  }

  static BadRequest(errors = []) {
    return new ApiError(this.message, serverCodes.BadRequest, errors);
  }

  static UnauthorizedError() {
    return new ApiError("user not authorized", serverCodes.UnAuth, this.errors);
  }

  static Forbidden(errors = []) {
    return new ApiError("permission denied", serverCodes.Forbidden, errors);
  }

  static NotFound(message: string, errors = []) {
    return new ApiError(message, serverCodes.NotFound, errors);
  }
}
