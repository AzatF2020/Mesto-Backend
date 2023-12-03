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

  static UnauthorizedError(message: string = "user not authorized") {
    return new ApiError(message, serverCodes.UnAuth, this.errors);
  }

  static Forbidden(message: string = "permission denied", errors = []) {
    return new ApiError(message, serverCodes.Forbidden, errors);
  }

  static NotFound(message: string, errors = []) {
    return new ApiError(message, serverCodes.NotFound, errors);
  }
}
