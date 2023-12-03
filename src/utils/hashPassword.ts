import bcrypt from "bcrypt"
import { IUserSchema } from "../models/user/user.interface";

export async function hashPassword(this: IUserSchema, next: () => void) {
  const user = this

  if (!user.isModified("password")) {
    next()
  }
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user?.password, salt)

    return next()
  } catch (err) {
    return next()
  }
}
