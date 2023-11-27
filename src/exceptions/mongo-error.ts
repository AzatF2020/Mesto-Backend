import ApiError from './api-error';

type TMongoError = {[keyof: string]: (message: string) => ApiError}

export const MongoError: TMongoError = {
  CastError: (message: string) => ApiError.BadRequest(message),
  ValidationError: (message: string) => ApiError.BadRequest(message),
  DocumentNotFoundError: () => ApiError.NotFound('not found'),
};
