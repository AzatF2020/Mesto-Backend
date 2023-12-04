import Router from 'express';
import UserController from '../../controllers/userController';
import { validateParamsID, validatePatchUser, validatePatchUserAvatar } from "../../utils/validator";

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', validateParamsID, UserController.getUserInfo);

router.patch('/me', validatePatchUser, UserController.updateProfile);
router.patch('/me/avatar', validatePatchUserAvatar, UserController.updateAvatarProfile);

export { router };
