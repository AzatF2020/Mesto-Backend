import { celebrate, Joi, Segments } from "celebrate";

export const validateAuth = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
