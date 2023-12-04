import type { NextFunction, Request, Response } from 'express';
import User from '../models/user/user';
import { IRequestWithAuth } from "../types";

class UserController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const candidate = await User.findById(id).orFail();

      return res.status(200).json(candidate);
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req: IRequestWithAuth, res: Response, next: NextFunction) {
    try {
      const { _id } = req.user!;
      const { name, about } = req.body;

      const updateCandidateProfile = await User.findByIdAndUpdate(_id, {
        name,
        about,
      }, { new: true, runValidators: true }).orFail();

      return res.status(200).json(updateCandidateProfile);
    } catch (err) {
      next(err);
    }
  }

  static async updateAvatarProfile(req: IRequestWithAuth, res: Response, next: NextFunction) {
    try {
      const { _id } = req.user!;
      const { avatar } = req.body;

      const updateCandidateProfile = await User.findByIdAndUpdate(_id, {
        avatar,
      }, { new: true, runValidators: true }).orFail();
      return res.status(200).json(updateCandidateProfile);
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
