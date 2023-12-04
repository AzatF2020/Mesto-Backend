import { celebrate, Joi, Segments } from "celebrate";

export const validateParamsCardID = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

export const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().uri(),
  }),
});
