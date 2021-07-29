const userValidation = require('./../validation/user.js');
const validator = require('../../util/requestValidator.js');
const userService = require('./../service/user.js');
const response = require('./../../util/response.js');

module.exports = {
    /**
     * @api {post} /api/example/v1/users     新增用户
     * @apiName add
     * @apiGroup user
     * @apiDescription 新增用户
     * @apiVersion 1.0.0
     *
     * @apiParam {String} username
     * @apiParam {String} password
     *
     * @apiExample Example usage:
     * {
     *     "username": "username",
     *     "password": "password"
     *  }
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *      "code": 0,
     *      "data": {id: 1},
     *      "msg": "请求成功"
     *  }
     */
    add: async function(ctx, next) {
        const input = await validator.validate(
            ctx.input,
            userValidation.add.schema,
            validator.options
        );
        const result = await userService.add(input);
        response.map(ctx, {id: result[0]});
    },

    /**
     * @api {put} /api/example/v1/users/:id     编辑用户
     * @apiName edit
     * @apiGroup user
     * @apiDescription 编辑用户
     * @apiVersion 1.0.0
     *
     * @apiParam {String} password
     *
     * @apiExample Example usage:
     * {
     *     "password": "password"
     *  }
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *      "code": 0,
     *      "data": {},
     *      "msg": "请求成功"
     *  }
     */
    edit: async function(ctx, next) {
        const input = await validator.validate(
            {...ctx.input, ...ctx.params},
            userValidation.edit.schema,
            validator.options
        );
        const result = await userService.edit(input);
        response.map(ctx, result);
    },

    /**
     * @api {get} /api/example/v1/users/:id     获取用户
     * @apiName findOne
     * @apiGroup user
     * @apiDescription 获取用户
     * @apiVersion 1.0.0
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *      "code": 0,
     *      "data": {
     *          "username": "username"
     *      },
     *      "msg": "请求成功"
     *  }
     */
    findOne: async function(ctx, next) {
        const input = await validator.validate(
            ctx.params,
            userValidation.findOne.schema,
            validator.options
        );
        const result = await userService.findOne(input);
        response.map(ctx, result);
    },

    /**
     * @api {delete} /api/example/v1/users/:id     获取用户
     * @apiName delete
     * @apiGroup user
     * @apiDescription 获取用户
     * @apiVersion 1.0.0
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *      "code": 0,
     *      "data": {},
     *      "msg": "请求成功"
     *  }
     */
    del: async function(ctx, next) {
        const input = await validator.validate(
            ctx.params,
            userValidation.del.schema,
            validator.options
        );
        const result = await userService.del(input);
        response.map(ctx, result);
    },
};