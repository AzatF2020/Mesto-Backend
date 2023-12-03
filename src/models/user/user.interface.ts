import { ObjectId } from "mongoose";

export interface IUserSchema {
  _id: ObjectId;
  readonly name: string;
  readonly about: string;
  email: string;
  password: string;
  readonly avatar: string;

  isModified(password: string): Boolean;
}
