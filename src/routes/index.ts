import Router from 'express';
import { router as cardsRoute } from './cards/cards';
import { router as usersRoute } from './users/users';
import { router as notFoundRoute } from './notFound/notFound';

const router = Router();

router.use('/users', usersRoute);
router.use('/cards', cardsRoute);
router.use('*', notFoundRoute);

export default router;
