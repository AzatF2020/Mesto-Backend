import serverCodes from '../utils/serverCodes';

export default function MongoError(status: string) {
  switch (status) {
    case 'CastError':
      return serverCodes.BadRequest;
    case 'ValidationError':
      return serverCodes.BadRequest;
    case 'DocumentNotFoundError':
      return serverCodes.NotFound;
    case 'MongoServerError':
      return serverCodes.Forbidden;
    default:
      return serverCodes.ServerError;
  }
}
