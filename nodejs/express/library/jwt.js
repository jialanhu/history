const jwt = require('jsonwebtoken');
const keyDefines = require('./keyDefines.js');

module.exports = {
    /**
     * 生成一个jwt格式的token
     * @param payload 放入token中的内容
     * @param [secret]
     * @returns {*}
     */
    genToken: function (payload, secret = keyDefines.JWT_SECRET) {
        return jwt.sign(payload, secret, {expiresIn: keyDefines.USER_TOKEN_TTL});
    },

    /**
     * 校验
     * @param token
     * @param [secret]
     * @returns {*}
     */
    verifyToken: function (token, secret = keyDefines.JWT_SECRET) {
        return jwt.verify(token, secret);
    }
};