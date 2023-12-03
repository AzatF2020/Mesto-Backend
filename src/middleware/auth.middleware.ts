import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import ApiError from "../exceptions/api-error";
import "dotenv/config"

const { SECRET_KEY } = process.env

export default function isCandidateAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.jwt_token
    if (!token) {
      throw ApiError.UnauthorizedError()
    }

    const decodedToken = jwt.verify(token, SECRET_KEY!);
    req.user = decodedToken
    next()
  } catch (err) {
    next(ApiError.UnauthorizedError())
  }
}
