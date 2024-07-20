import joi from 'joi';

export const transactionCreateSch = joi.object({
    id: joi.string().uuid(),
    userId: joi.string().uuid().required(),
    cardNumber: joi.string().required(),
    amount: joi.number().min(0).required(),
}).required();