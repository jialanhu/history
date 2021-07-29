const crypto = require('crypto');

module.exports = {
    /**
     * md5 加密
     * @returns {String}
     */
    md5: function(variable){
        return crypto.createHash('md5').update(variable).digest('hex');
    },

    /**
     * HMAC-SHA256签名
     * @param variable
     * @param secret
     * @returns {string}
     */
    hmacSha256: function (variable, secret) {
        return crypto.createHmac('sha256', secret).update(variable).digest('hex');
    },
    /**
     * HMAC-SHA512签名
     * @param variable
     * @param secret
     * @returns {string}
     */
     hmacSha512: function (variable, secret) {
        return crypto.createHmac('sha512', secret).update(variable).digest('hex');
    },
};