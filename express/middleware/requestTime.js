const apiErrorDefines = require('./../library/apiErrorDefines.js');
const response = require('./../util/response.js');
const keyDefines = require('./../library/keyDefines.js');

module.exports = async function (req, res, next) {
    req.requestTime = Date.now();
    // 增加超时默认响应
    res.setTimeout(keyDefines.REQUEST_TIMEOUT_TIME, function () {
        // 保持一致的返回格式包装
        const errorInfo = apiErrorDefines('request.timeout');
        response.output(res, {}, errorInfo.code, errorInfo.message, errorInfo.status);
        // 设置此请求已经超时的标签
        res.timeout = true;
        return res.type('application/json; charset=utf-8')
            .status(res.httpStatus)
            .send(res.body);
    });
    next();
}; 