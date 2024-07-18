import joi from 'joi';

export const userIdSchema = {
    id: joi.string().uuid().required(),
};
