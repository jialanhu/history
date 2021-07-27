const logger = require('./../util/logger.js');
const response = require('./../util/response.js');
const DingTalkCustomRobot = require('./../library/dingTalkCustomRobot.js');

module.exports = async function (e, req, res, next) {
    let beginTime = req.requestTime;
    let status = e.status || 500;
    let msg = e.message || e;
    let input = req.input;

    let endTime = new Date().getTime();
    let ip = req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip;

    let fields = {
        status: status,
        method: req.method,
        headers: req.headerInput,
        url: req.url,
        client_ip: ip,
        cost: endTime - beginTime,
        input: input,
        msg: msg
    };

    if (req.cacheSystemUserInfo && req.cacheSystemUserInfo.uid) {
        fields.user_id = req.cacheSystemUserInfo.uid;
    }

    if (status === 500) {
        logger.getLogger('access').error('requestError', fields);
        switch (e.code) {
            case 'ECONNREFUSED':
                logger.getLogger('error').fatal('mysql连接失败', e.message, e.code);
                e.message = '数据库连接异常';
                break;
            case 'ER_DUP_ENTRY':
                logger.getLogger('error').error('mysql操作异常', e.message, e.code);
                e.message = '数据库操作违反唯一约束';
                break;
            case 'ETIMEDOUT':
                logger.getLogger('error').error('mysql操作异常', e.message, e.code);
                e.message = '数据库连接超时';
                break;
            default:
                logger.getLogger('error').error('error.stack', e.stack);
        }
        new DingTalkCustomRobot().setContent(e.stack).send();
    } else {
        logger.getLogger('access').warn('requestException', fields);
        logger.getLogger('exception').error('error.stack', e.stack);
    }
    // 超时请求,做完日志后返回
    if (res.timeout) return;
    // 格式化返回
    response.output(res,{}, e.code || 1, msg, status);
    res.type('application/json; charset=utf-8')
        .status(res.httpStatus)
        .send(res.body);
};