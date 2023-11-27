import { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import ApiError from '../exceptions/api-error';
import { MongoError } from '../exceptions/mongo-error';

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof mongoose.Error) {
    const error = MongoError[err?.name](err?.message);
    return res.status(error?.status).json({ message: error?.message });
  }

  if (err instanceof ApiError) {
    return res.status(err?.status).json({ message: err?.message,
      errors: err?.errors! });
  }
  next();
}
