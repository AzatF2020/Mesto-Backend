import validator from "validator";
import { Schema, model } from "mongoose";
import { IUserSchema } from "./user.interface";
import { urlRegex } from "../../utils/constants";
import hashPassword from "../../utils/hashPassword";

const userSchema = new Schema<IUserSchema>({
  name: {
    type: String,
    min: 2,
    max: 30,
    default: "«Жак-Ив Кусто»",
  },
  about: {
    type: String,
    min: 2,
    max: 300,
    default: "«Исследователь»",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "invalid e-mail address"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    type: String,
    validate: [validator.isURL, urlRegex],
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
});

userSchema.pre('save', hashPassword);

export default model<IUserSchema>("user", userSchema);
