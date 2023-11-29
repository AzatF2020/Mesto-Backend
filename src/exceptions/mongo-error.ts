import { serverCodes } from '../utils/serverCodes';

export function MongoError(status: string) {
  switch (status) {
    case 'CastError':
      return serverCodes.BadRequest;
    case 'ValidationError':
      return serverCodes.BadRequest;
    case 'DocumentNotFoundError':
      return serverCodes.NotFound;
    default:
      return serverCodes.ServerError;
  }
}