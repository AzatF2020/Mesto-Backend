import { Schema } from "mongoose";

export interface ICardSchema {
  readonly name: string;
  readonly link: string;
  readonly owner: typeof Schema.Types.ObjectId;
  readonly likes: typeof Schema.Types.ObjectId[];
  readonly createdAt: Date
}