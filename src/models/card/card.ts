import { model, Schema } from "mongoose";
import { ICardSchema } from "./card.interface";
import { urlRegex } from "../../utils/constants";

const cardSchema = new Schema<ICardSchema>({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
    validate: {
      validator: ({ length }: {length: number}) => length >= 2 && length <= 30,
      message: "the length of the card should be between 2 and 30 characters",
    },
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link: string) => urlRegex.test(link),
      message: "incorrect reference link",
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [{
    type: Schema.ObjectId,
    ref: "user",
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default model<ICardSchema>("card", cardSchema)
