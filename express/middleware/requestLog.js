const logger = require('./../util/logger.js');

module.exports = async function (req, res, next) {
    let beginTime = req.requestTime;
    let input = req.input;
    let endTime = Date.now();
    let ip = req.headers['x-forwarded-for'] || req.ip;

    let fields = {
        status: res.httpStatus || 404,
        method: req.method,
        headers: req.headerInput,
        url: req.url,
        client_ip: ip,
        cost: endTime - beginTime,
        input: input
    };
    
    if (req.cacheSystemUserInfo && req.cacheSystemUserInfo.uid) {
        fields.user_id = req.cacheSystemUserInfo.uid;
    }

    logger.getLogger('access').trace('requestSuccess', fields);
    next();
};