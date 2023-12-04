import { Request } from "express"
import { JwtPayload } from "jsonwebtoken";
import { IUserSchema } from "./models/user/user.interface";

export interface IOwner extends JwtPayload {
  _id: string;
}
export interface IRequestWithAuth extends Request {
  user?: IOwner;
}

export interface IError extends Error {
  message: string;
  code?: number;
}