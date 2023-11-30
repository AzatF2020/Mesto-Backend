import type { NextFunction, Request, Response } from 'express';
import User from '../models/user/user';
import ApiError from '../exceptions/api-error';

class UserController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, about, avatar } = req.body;

      const candidate = await User.create({
        name,
        about,
        avatar,
      });

      return res.json(candidate);
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const candidate = await User.findById(id);

      if (!candidate) {
        throw ApiError.NotFound('user not exists');
      }

      return res.status(200).json(candidate);
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.user;
      const { name, about } = req.body;

      const updateCandidateProfile = await User.findByIdAndUpdate(_id, {
        name,
        about,
      }, { new: true }).orFail();

      return res.status(200).json(updateCandidateProfile);
    } catch (err) {
      next(err);
    }
  }

  static async updateAvatarProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.user;
      const { avatar } = req.body;

      const updateCandidateProfile = await User.findByIdAndUpdate(_id, {
        avatar,
      }, { new: true }).orFail();
      return res.status(200).json(updateCandidateProfile);
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
