var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Card from '../models/card/card';
import User from '../models/user/user';
import ApiError from '../exceptions/api-error';
class CardsController {
    static getCards(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cards = yield Card.find().populate(['owner']);
                return res.status(200).json({ cards });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static createCard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, link } = req.body;
                const { _id } = req.user;
                if (!name || !link) {
                    throw ApiError.BadRequest('fill in all fields');
                }
                const card = yield Card.create({
                    name,
                    link,
                    owner: _id,
                });
                return res.status(200).json({ card });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static deleteCard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cardId } = req.params;
                const { _id } = req.user;
                const findCard = yield Card.findById(cardId);
                if (!findCard) {
                    throw ApiError.NotFound('card not found');
                }
                const ownerId = findCard === null || findCard === void 0 ? void 0 : findCard.owner.toString();
                if (ownerId !== _id) {
                    throw ApiError.Forbidden();
                }
                const removedCard = yield (findCard === null || findCard === void 0 ? void 0 : findCard.deleteOne());
                return res.status(200).json({
                    removedCard,
                    message: 'card was removed',
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static setLike(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cardId } = req.params;
                const { _id } = req.user;
                const candidate = yield User.findById(_id);
                const findCard = yield Card.findById(cardId);
                if (!candidate) {
                    throw ApiError.NotFound('user not exists');
                }
                if (!findCard) {
                    throw ApiError.NotFound('card not found');
                }
                const likedCard = yield Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true });
                return res.status(200).json(likedCard);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static removeLike(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cardId } = req.params;
                const { _id } = req.user;
                const candidate = yield User.findById(_id);
                const findCard = yield Card.findById(cardId);
                if (!candidate) {
                    throw ApiError.NotFound('user not exists');
                }
                if (!findCard) {
                    throw ApiError.NotFound('card not found');
                }
                const likedCard = yield Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true });
                return res.status(200).json(likedCard);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
export default CardsController;
