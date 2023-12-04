import type { NextFunction, Request, Response } from 'express';
import Card from '../models/card/card';
import ApiError from '../exceptions/api-error';
import { serverCodes } from '../utils/serverCodes';
import { IRequestWithAuth } from "../types";

class CardsController {
  static async getCards(req: Request, res: Response, next: NextFunction) {
    try {
      const cards = await Card.find().populate(['owner']);
      return res.status(serverCodes.Ok).json({ cards });
    } catch (err) {
      next(err);
    }
  }

  static async createCard(req: IRequestWithAuth, res: Response, next: NextFunction) {
    try {
      const { name, link } = req.body;
      const { _id } = req.user!;

      const card = await Card.create({
        name,
        link,
        owner: _id,
      });

      return res.status(serverCodes.Ok).json({ card });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCard(req: IRequestWithAuth, res: Response, next: NextFunction) {
    try {
      const { cardId } = req.params;
      const { _id } = req.user!;

      const findCard = await Card.findById(cardId).orFail();
      const ownerId = findCard?.owner.toString();

      if (ownerId !== _id) {
        throw ApiError.Forbidden();
      }

      const removedCard = await findCard!?.deleteOne();

      return res.status(serverCodes.Ok).json({
        removedCard,
        message: 'card was removed',
      });
    } catch (err) {
      next(err);
    }
  }

  static async setLike(req: IRequestWithAuth, res: Response, next: NextFunction) {
    try {
      const { cardId } = req.params;
      const { _id } = req.user!;

      const likedCard = await Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: _id } },
        { new: true },
      ).orFail();

      return res.status(serverCodes.Ok).json(likedCard);
    } catch (err) {
      next(err);
    }
  }

  static async removeLike(req: IRequestWithAuth, res: Response, next: NextFunction) {
    try {
      const { cardId } = req.params;
      const { _id } = req.user!;

      const likedCard = await Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: _id } },
        { new: true },
      ).orFail();

      return res.status(serverCodes.Ok).json(likedCard);
    } catch (err) {
      next(err);
    }
  }
}

export default CardsController;
