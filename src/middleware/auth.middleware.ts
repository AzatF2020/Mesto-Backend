import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import ApiError from '../exceptions/api-error';
import { IOwner, IRequestWithAuth } from '../types';
import 'dotenv/config';

const { SECRET_KEY } = process.env;

export default function isCandidateAuthMiddleware(req: IRequestWithAuth, res: Response, next: NextFunction) {
  try {
    const { jwt_token: token } = req.cookies;
    if (!token) {
      throw ApiError.UnauthorizedError();
    }

    const decodedToken = jwt.verify(token, SECRET_KEY!);
    req.user = decodedToken as IOwner;
    next();
  } catch (err) {
    next(ApiError.UnauthorizedError());
  }
}
