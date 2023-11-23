import Router from 'express';
import CardsController from '../controllers/cardsController';
const router = Router();
router.get('/', CardsController.getCards);
router.post('/', CardsController.createCard);
router.delete('/:cardId', CardsController.deleteCard);
router.put('/:cardId/likes', CardsController.setLike);
router.delete('/:cardId/likes', CardsController.removeLike);
export { router };
