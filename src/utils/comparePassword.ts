// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcrypt";

export function isCorrectPassword(password: string, userDBPassword: string): Promise<boolean> {
  return bcrypt.compare(password, userDBPassword)
}
