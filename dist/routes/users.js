import Router from 'express';
import UserController from '../controllers/userController';
const router = Router();
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.registration);
router.patch('/me', UserController.updateProfile);
router.patch('/me/avatar', UserController.updateAvatarProfile);
export { router };
