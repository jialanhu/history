const Joi = require('joi');

module.exports = {
    login: {
        schema: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        })
    },
};