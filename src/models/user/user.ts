import { Schema, model } from "mongoose";
import { IUserSchema } from "./user.interface";
import validator from "validator"
import { urlRegex } from "../../utils/constants";
// eslint-disable-next-line import/named
import { hashPassword } from "../../utils/hashPassword";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUserSchema>({
  name: {
    type: "String",
    min: 2,
    max: 30,
    default: "«Жак-Ив Кусто»",
  },
  about: {
    type: "String",
    min: 2,
    max: 300,
    default: "«Исследователь»",
  },
  email: {
    type: "String",
    required: true,
    unique: true,
    validate: [validator.isEmail, "invalid e-mail address"],
  },
  password: {
    type: "String",
    required: true,
    minlength: 8,
    select: false,
  },
  avatar: {
    type: "String",
    validate: [validator.isURL, urlRegex],
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
})

userSchema.pre('save', hashPassword);

export default model("user", userSchema);
