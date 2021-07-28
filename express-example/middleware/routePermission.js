const redis = require('./../library/db.js').redis;
const keyDefines = require('./../library/keyDefines.js');
const ApiError = require('./../library/apiError.js');
const logger = require('./../util/logger.js');
const utils = require('./../util/utils.js');
const encrypt = require('./../library/encrypt.js');
const jwt = require('./../library/jwt.js');
const dateUtils = require('./../util/dateUtils.js');

// 校验中间件
module.exports = async function (req, res, next) {
    // 绕过没有登录态接口
    if (req.url.indexOf('auth') > -1) {
        return next();
    }
    try {
        // 请求时间校验
        requestTimestampValidator(req);

        // jwt验证
        const {uid, uuid} = jwtValidator(req);

        // 校验token
        req.cacheUserInfo = await tokenValidator(uid, uuid);

        // 校验参数签名,结合timestamp,可以防止重放攻击
        await signValidator(req, uid, uuid);
    } catch (e) {
        next(e);
    }
    next()
};

/**
 * 获得用户token信息
 */
async function getUserCache (id) {
    let userInfo = await redis.get(keyDefines.userLoginCacheRedisKey(id));
    if (userInfo) {
        userInfo = utils.safetyJsonParse(userInfo);
    }
    return userInfo;
}

/**
 * 请求时间校验
 */
function requestTimestampValidator (req) {
    // 这是毫秒时间戳
    const requestTimestamp = req.headers.timestamp;
    // 客户端时间可能与服务器时间有偏差,允许范围 30秒
    if (!requestTimestamp || ((keyDefines.REQUEST_TIME_DIFFER) < Math.abs(dateUtils.getNowUnix() - requestTimestamp))) {
        throw new ApiError('access.timeDifference');
    }
}

/**
 * jwt校验
 * @param req
 * @returns {{uid: Number, token: String}}
 */
function jwtValidator (req) {
    const authorization = req.headers.authorization;
    try {
        return jwt.verifyToken(authorization)
    } catch(err) {
        logger.getLogger('exception').error('basePermission用户JWT校验失败, authorization: %s', authorization);
        throw new ApiError('access.tokenDifference');
    }
}

/**
 * token校验
 * @param uid
 * @param uuid
 * @returns {Promise<void>}
 */
async function tokenValidator (uid, uuid) {
    const cacheUserInfo = await getUserCache(uid);
    if (!cacheUserInfo) {
        logger.getLogger('exception').error('Permission用户权限校验失败 cacheUserInfo不存在, uid:%s, uuid:%s', uid, uuid);
        throw new ApiError('access.tokenNotExist');
    }
    if (uuid !== cacheUserInfo.uuid) {
        logger.getLogger('exception').error('Permission用户权限校验失败 uuid不一致, uid:%s, uuid:%s, cacheUserInfo.uuid:%s',
            uid, uuid, cacheUserInfo.uuid);
        throw new ApiError('access.tokenDifference');
    }
    return cacheUserInfo;
}

/**
 * 签名校验
 */
async function signValidator (req, uid, uuid) {
    const clientSign = req.headers.sign;
    if (!clientSign) {
        throw new ApiError('access.signError');
    }
    const signObj = {uid, timestamp: req.headers.timestamp, ...req.input};
    const sign = getSign(signObj, uuid);
    if (clientSign !== sign) {
        throw new ApiError('access.signError');
    }
    const requestSignRedisKey = keyDefines.requestSignRedisKey(sign);
    const jsonSignObj = JSON.stringify(signObj);
    if (await redis.exists(requestSignRedisKey)) {
        const cacheSign = await redis.get(requestSignRedisKey);
        if (cacheSign !== jsonSignObj) {
            logger.getLogger('error').error('Permission签名冲突 cacheSign:%s, sign:%s', cacheSign, jsonSignObj);
            throw new ApiError('access.signCollision');
        }
        throw new ApiError('access.requestRepetition');
    }
    // 防止并发 过期时间与最大请求时间差一致
    let result = await redis.set(requestSignRedisKey, jsonSignObj, "NX", "EX", keyDefines.REQUEST_TIME_DIFFER);
    if (!result) {
        throw new ApiError('access.requestRepetition');
    }
}

/**
 * 获取参数签名
 * @returns {string}
 */
function getSign (obj, uuid) {
    const list = Object.keys(obj).sort();
    const strList = [];
    for (let i = 0; i < list.length; ++i) {
        // 参数的值为空不参与签名
        if (!obj[list[i]] && obj[list[i]] !== 0) {
            continue;
        }
        strList.push(`${list[i]}=${obj[list[i]]}`);
    }
    strList.push(`uuid=${uuid}`);
    return encrypt.hmacSha256(strList.join('&'), uuid).toUpperCase()
}