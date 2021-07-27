const redis = require('./../../library/db.js').redis;
const utils = require('./../../util/utils.js');
const ApiError = require('./../../library/apiError.js');
const encrypt = require("../../library/encrypt");
const jwt = require('./../../library/jwt.js');
const userModel = require('./../model/user.js');
const keyDefines = require('./../../library/keyDefines.js');


module.exports = {

    /**
     * 登录
     * @param username
     * @param password
     * @returns {Promise<{id: *, username: *, token: (*|Promise<*>)}>}
     */
    login: async function({username, password}) {
        const userInfo = await this._getUserInfo(username);
        this._verifyPassword(userInfo, password);
        const uuid = utils.genUUID();
        await this._cacheUserInfo({...userInfo, uuid});
        return {
            id: userInfo.id,
            username: userInfo.username,
            token: jwt.genToken({uid: userInfo.id, uuid}),
            expires_in: keyDefines.USER_TOKEN_TTL,
        }
    },


    /**
     * 获取用户信息
     * @param username
     * @returns {Promise<*>}
     * @private
     */
    _getUserInfo: async function(username) {
        const userInfo = await userModel.findOne(
            ['id', 'username', 'password', 'secret'],
            {username: username}
        );
        if (!userInfo) {
            throw new ApiError('user.notExist');
        }
        return userInfo;
    },

    /**
     * 验证用户密码
     * @param userInfo
     * @param password
     * @private
     */
    _verifyPassword: function(userInfo, password) {
        const currentPassword = encrypt.hmacSha256(password, userInfo.secret);
        if (currentPassword !== userInfo.password) {
            throw new ApiError('user.accountOrPasswordError');
        }
    },

    /**
     * 缓存用户登录信息
     * @param cacheUserInfo
     * @returns {Promise<void>}
     * @private
     */
    _cacheUserInfo: async function(cacheUserInfo) {
        const redisKey = keyDefines.userLoginCacheRedisKey(cacheUserInfo.id);
        await redis.setex(redisKey, keyDefines.USER_TOKEN_TTL, JSON.stringify(cacheUserInfo));
    }
};