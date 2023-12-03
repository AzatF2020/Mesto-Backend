import { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import ApiError from '../exceptions/api-error';
import { MongoError } from '../exceptions/mongo-error';

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  if (err?.code === 11000) {
    return res.status(409).json({ message: "user already exists" })
  }

  if (err instanceof mongoose.Error) {
    const status = MongoError(err.name);
    return res.status(status).json({ message: err.message });
  }

  if (err instanceof ApiError) {
    return res.status(err?.status).json({ message: err?.message,
      errors: err?.errors! });
  }

  res.status(500);
  next();
}
