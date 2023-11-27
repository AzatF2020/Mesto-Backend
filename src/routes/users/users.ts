import Router from 'express';
import UserController from '../../controllers/userController';
import {
  validateCreateUser,
  validateParamsID,
  validatePatchUser,
  validatePatchUserAvatar
} from "../../utils/validator/validator";

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', validateParamsID(), UserController.getUserById);
router.post('/', validateCreateUser(), UserController.registration);

router.patch('/me', validatePatchUser(), UserController.updateProfile);
router.patch('/me/avatar', validatePatchUserAvatar(), UserController.updateAvatarProfile);

export { router };
