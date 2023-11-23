import {model, Schema} from "mongoose";
import {ICardSchema} from "./card.interface";

const cardSchema = new Schema<ICardSchema>({
  name: {
    type: "String",
    required: true,
    min: 2,
    max: 30,
  },
  link: {
    type: "String",
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [{
    type: Schema.ObjectId,
    ref: "user"
  }],
  createdAt: {
    type: "Date",
    default: Date.now()
  }
})

export default model("card", cardSchema)