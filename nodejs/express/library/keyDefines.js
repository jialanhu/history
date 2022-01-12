/**
 * 定义一些key或者常量
 * 例如:redis存储key, 不随部署环境变化的
 */

module.exports = {

    /**
     * JWT的密钥
     */
    JWT_SECRET: 'N4T4s3ZTXf51p0A1XN090T0d14dxIgAqRheZUV7l067cd0g7vOLa764AmHGUDnuj',

    /**
     * 用户token 缓存时间(秒)
     */
    USER_TOKEN_TTL: 60 * 60 * 2,

    /**
     * 最大的请求时间差(秒)
     */
    REQUEST_TIME_DIFFER: 30,

    /**
     * 增加请求超时响应(毫秒)
     */
    REQUEST_TIMEOUT_TIME: 5 * 60 * 1000,

    /**
     * 钉钉机器人发送重复消息的CD
     */
    DING_TALK_ROBOT_REPEATED_CD: 60,

    //===================上面为常量定义，下面为方法封装==================
    /**
     * 构造redis存储key
     * @description 构造 : 分隔的key
     * @params 字符串作为参数传入，多选参数
     * @returns {String} key
     */
    redisCacheKey: function (...params) {
        let result = '';
        params.forEach(element => {
            result = result + ((result.length > 0) ? ':' : '') + element;
        });
        return result;
    },

    /**
     * 用户登录缓存
     * @param id
     */
    userLoginCacheRedisKey: function (id) {
        return this.redisCacheKey('USER', 'LOGIN', id);
    },

    /**
     * 请求签名,用于防止重放
     * @param sign
     * @returns {String}
     */
    requestSignRedisKey: function (sign) {
        return this.redisCacheKey('REQUEST', 'SIGN', sign);
    },

    /**
     * 钉钉消息通知MD5(用于拦截重复发送)
     * @param md5
     * @returns {String}
     */
    dingTalkCustomRobotMessageMd5RedisKey: function (md5) {
        return this.redisCacheKey('DING_TALK', 'MESSAGE_MD5', md5);
    },
};