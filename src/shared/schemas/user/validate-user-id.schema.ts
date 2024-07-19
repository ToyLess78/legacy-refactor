import joi from 'joi';

export const validateUserIdSchema = {
    id: joi.string().uuid().required(),
};
