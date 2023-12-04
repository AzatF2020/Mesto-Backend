import { celebrate, Joi, Segments } from "celebrate";

export const validateParamsID = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().length(24).hex().required(),
  },
});
