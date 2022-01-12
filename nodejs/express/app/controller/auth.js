const authValidation = require('./../validation/auth.js');
const validator = require('../../util/requestValidator.js');
const authService = require('./../service/auth.js');
const response = require('./../../util/response.js');

module.exports = {
    /**
     * @api {post} /api/example/auth/v1/login  登录
     * @apiName authLogin
     * @apiGroup auth
     * @apiDescription 登录
     * @apiVersion 1.0.0
     *
     * @apiParam {String} username   账号
     * @apiParam {String} password  密码
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
     *      "data": {
     *          "id": 1,
     *          "username": "123",
     *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInV1aWQiOiI1NGZhNGEzMC1lZWU2LTExZWItOTJmZi0xMTc3Mzc4ZTBiZTIiLCJpYXQiOjE2MjczOTU4NjAsImV4cCI6MTYyNzQwMzA2MH0.qe7Ux7pu5J5WPovjak4xutErN2tWFYCCszeT5ksGAOE",
     *          "expires_in": 7200  单位秒
     *      },
     *      "msg": "请求成功"
     *  }
     *  @apiErrorExample {json} Error-Response:
     * {"err":10002,"data":{},"msg":"账号或密码错误"}
     */
    login: async function(req, res) {
        const input = await validator.validate(
            req.input,
            authValidation.login.schema,
            validator.options
        );
        const result = await authService.login(input);
        response.map(res, result);
    },
};