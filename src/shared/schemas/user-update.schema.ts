import Joi from 'joi';

export const userUpdateSchema = Joi.object({
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\+?3?8?(0\d{9})$/),
    name: Joi.string(),
    city: Joi.string(),
}).required();
