import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
import serverCodes from "./serverCodes";
import { JWT_TOKEN_EXPIRED } from './constants';
import { IUserSchema } from '../models/user/user.interface';
import 'dotenv/config';

const { SECRET_KEY } = process.env;

export function generateAccessToken(_id: ObjectId) {
  const payload = {
    _id,
  };

  return jwt.sign(payload, SECRET_KEY!, { expiresIn: `${JWT_TOKEN_EXPIRED}h` });
}

export function sendToken(res: Response, user: IUserSchema, message: string = 'success') {
  const token = generateAccessToken(user?._id);

  const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * JWT_TOKEN_EXPIRED,
    httpOnly: true,
  };

  return res
    .status(serverCodes.Ok)
    .cookie('jwt_token', token, cookieOptions)
    .json({ message });
}
