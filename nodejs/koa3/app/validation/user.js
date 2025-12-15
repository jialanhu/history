import Joi from "joi";

export default {
  create: Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(8).max(50).required(),
    nickname: Joi.string().min(3).max(50).required(),
  }),

  update: Joi.object({
    id: Joi.number().integer().required(),
    nickname: Joi.string().min(3).max(50).optional(),
    password: Joi.string().min(8).max(50).optional(),
  }),

  delete: Joi.object({
    id: Joi.number().integer().required(),
  }),

  get: Joi.object({
    id: Joi.number().integer().required(),
  }),

  list: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().min(1).max(100).default(10),
  }),
}
