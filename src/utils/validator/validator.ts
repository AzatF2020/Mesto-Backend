import { celebrate, Segments, Joi } from "celebrate";

export function validateCreateCard() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().required().uri()
    })
  })
}

export function validateParamsCardID() {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex()
    })
  })
}

export function validateCreateUser() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
      avatar: Joi.string().required().uri()
    })
  })
}

export function validateParamsID() {
  return celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().length(24).hex().required()
    }
  })
}

export function validatePatchUser() {
  return celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }
  })
}

export function validatePatchUserAvatar() {
  return celebrate({
    [Segments.BODY]: {
      avatar: Joi.string().required().uri()
    }
  })
}

