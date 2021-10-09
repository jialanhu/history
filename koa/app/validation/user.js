const Joi = require('joi');

module.exports = {
    add: {
        schema: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        })
    },

    edit: {
        schema: Joi.object({
            id: Joi.number().required(),
            password: Joi.string().required(),
        })
    },

    findOne: {
        schema: Joi.object({
            id: Joi.number().required(),
        })
    },

    del: {
        schema: Joi.object({
            id: Joi.number().required(),
        })
    },
};