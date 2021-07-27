/**
 * errorName: {code, message, status}
 * 错误名: {错误码, 错误信息, http状态码}
 */
const defines = {

    'common.all': { code: 1000, message: '%s', status: 500 },
    'request.paramError': { code: 1001, message: '参数错误 %s', status: 200 },
    'request.timeout': { code: 1002, message: '请求超时', status: 408 },

    'user.notExist': { code: 10001, message: '用户不存在', status: 200 },
    'user.accountOrPasswordError': { code: 10002, message: '账号或密码错误', status: 200 },
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