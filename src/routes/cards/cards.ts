import Router from 'express';
import CardsController from '../../controllers/cardsController';
import { validateCreateCard, validateParamsCardID } from "../../utils/validator";

const router = Router();

router.get('/', CardsController.getCards);
router.post('/', validateCreateCard, CardsController.createCard);
router.delete('/:cardId', validateParamsCardID, CardsController.deleteCard);

router.put('/:cardId/likes', validateParamsCardID, CardsController.setLike);
router.delete('/:cardId/likes', validateParamsCardID, CardsController.removeLike);

export { router };
