import joi from 'joi';

export const eventsUpdateSch = joi.object({
    score: joi.string().required(),
}).required();