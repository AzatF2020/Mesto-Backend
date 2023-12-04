import { celebrate, Joi, Segments } from "celebrate";

export const validatePatchUser = celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  },
});

export const validatePatchUserAvatar = celebrate({
  [Segments.BODY]: {
    avatar: Joi.string().required().uri(),
  },
});
