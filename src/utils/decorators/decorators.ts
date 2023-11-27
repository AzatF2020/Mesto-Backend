import { NextFunction, Request, Response } from "express";
import User from "../../models/user/user";
import ApiError from "../../exceptions/api-error";

type TResult = {[keyof: string]: string}

export function UpdateProfile(
  target: any, propertyKey: any, descriptor: TypedPropertyDescriptor<any | Function>
) {
  let originalMethod = descriptor.value

  function changeUserProfile(result: TResult) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { _id, ...rest } = result;
        const { _id: userId } = result;

        const user = await User.findById(userId)

        if(!user) {
          throw ApiError.NotFound("not found")
        }

        const candidate = await User.findByIdAndUpdate(userId, {
          ...rest
        }, {new: true}).orFail()

        return res.status(200).json(candidate);
      } catch (err) {
        next(err)
      }
    }
  }

  // #Note: реализовал универсальный декоратор(один вместо двух), не могу точно ответить, насколько верно мое решение,
  // буду рад фидбеку!

  descriptor.value = async function(req: Request, res: Response, next: NextFunction) {
    try {
      let result = await originalMethod.apply(this, arguments)

      return changeUserProfile(result)(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}