import { Schema, model } from "mongoose";
import { IUserSchema } from "./user.interface";
import { urlRegex } from "../../utils/constants";

const userSchema = new Schema<IUserSchema>({
  name: {
    type: "String",
    required: true,
    min: 2,
    max: 30,
  },
  about: {
    type: "String",
    required: true,
    min: 2,
    max: 300,
  },
  avatar: {
    type: "String",
    required: true,
    validate: {
      validator: (link: string) => urlRegex.test(link),
      message: "incorrect reference link"
    }
  }
})

export default model("user", userSchema)