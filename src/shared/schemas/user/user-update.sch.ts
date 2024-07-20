import Joi from 'joi';

export const userUpdateSch = Joi.object({
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\+?3?8?(0\d{9})$/),
    name: Joi.string(),
    city: Joi.string(),
}).required();
