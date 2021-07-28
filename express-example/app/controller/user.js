const userValidation = require('./../validation/user.js');
const validator = require('../../util/requestValidator.js');
const userService = require('./../service/user.js');
const response = require('./../../util/response.js');

module.exports = {
    /**
     * @api {post} /api/example/user/v1/change_password  修改密码
     * @apiName changePassword
     * @apiGroup user
     * @apiDescription 修改密码
     * @apiVersion 1.0.0
     *
     * @apiParam {String} old_password  旧密码
     * @apiParam {String} new_password  新密码
     *
     * @apiExample Example usage:
     * {
     *     "old_password": "old_password",
     *     "new_password": "new_password"
     *  }
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *      "code": 0,
     *      "data": {},
     *      "msg": "请求成功"
     *  }
     *  @apiErrorExample {json} Error-Response:
     * {"err":10003,"data":{},"msg":"密码错误"}
     */
    changePassword: async function(req, res) {
        const input = await validator.validate(
            req.input,
            userValidation.changePassword.schema,
            validator.options
        );
        const result = await userService.changePassword({...input, ...req.cacheUserInfo});
        response.map(res, result);
    },
};