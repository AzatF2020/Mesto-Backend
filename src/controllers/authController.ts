import type { Response, Request, NextFunction } from 'express';
import isCorrectPassword from '../utils/comparePassword';
import User from '../models/user/user';
import ApiError from '../exceptions/api-error';
import { sendToken } from '../utils/token';
import ServerCodes from "../utils/serverCodes";

class AuthController {
  static async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name, about, email, password, avatar,
      } = req.body;

      const candidate = await User.create({
        name,
        about,
        email,
        password,
        avatar,
      });

      return res.status(ServerCodes.Ok).json(candidate);
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const candidate = await User
        .findOne({ email })
        .select('+password')
        .orFail();

      const candidatePassword = candidate?.password;
      const matchPassword = await isCorrectPassword(password, candidatePassword);

      if (!matchPassword) {
        throw ApiError.UnauthorizedError('email or password incorrect');
      }

      return sendToken(res, candidate, 'you are successfully authorized');
    } catch (err) {
      next(err);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { jwt_token: token } = req.cookies;

      if (!token) {
        throw ApiError.UnauthorizedError();
      }

      return res
        .status(ServerCodes.Ok)
        .cookie('jwt_token', '')
        .json({ message: 'exit successful' });
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
