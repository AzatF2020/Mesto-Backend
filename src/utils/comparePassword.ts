import bcrypt from 'bcrypt';

export default function isCorrectPassword(password: string, userDBPassword: string): Promise<boolean> {
  return bcrypt.compare(password, userDBPassword);
}
