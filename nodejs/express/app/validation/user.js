const Joi = require('joi');

module.exports = {
    changePassword: {
        schema: Joi.object({
            old_password: Joi.string().required(),
            new_password: Joi.string().required(),
        })
    },
};