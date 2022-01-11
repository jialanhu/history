/**
 * errorName: {code, message, status}
 * 错误名: {错误码, 错误信息, http状态码}
 */
const defines = {

    'common.all': { code: 1000, message: '%s', status: 500 },
    'request.paramError': { code: 1001, message: '参数错误 %s', status: 200 },
    'request.timeout': { code: 1002, message: '请求超时', status: 408 },

    'access.tokenDifference': { code: 9901, message: 'token 不一致', status: 401 },
    'access.tokenNotExist': { code: 9902, message: 'token 不存在', status: 401 },
    'access.timeDifference': { code: 9903, message: '请求发起时间超过服务器限制', status: 401 },
    'access.signError': { code: 9904, message: '签名错误', status: 403 },
    'access.requestRepetition': { code: 9905, message: '重复请求', status: 403 },
    'access.signCollision': { code: 9906, message: '签名冲突', status: 500 },

    'user.notExist': { code: 10001, message: '用户不存在', status: 200 },
    'user.accountOrPasswordError': { code: 10002, message: '账号或密码错误', status: 200 },
    'user.passwordError': { code: 10003, message: '密码错误', status: 200 },
};
module.exports = function (errorName, params = []) {
    if (defines[errorName]) {
        let result = {
            code: defines[errorName].code,
            message: defines[errorName].message,
            status: defines[errorName].status
        };

        params.forEach(element => {
            result.message = (result.message).replace('%s', element);
        });

        return result;
    }

    return {
        code: 1000,
        message: '服务器内部错误',
        status: 500
    };
};