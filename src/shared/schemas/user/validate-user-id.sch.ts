import joi from 'joi';

export const validateUserIdSch = {
    id: joi.string().uuid().required(),
};
