const utils = require('./../../util/utils.js');
const ApiError = require('./../../library/apiError.js');
const encrypt = require("../../library/encrypt");
const userModel = require('./../model/user.js');

module.exports = {
    /**
     * 修改密码
     * @param id
     * @param old_password
     * @param new_password
     * @returns {Promise<{id: *, expires_in: *, username: *, token: *}>}
     */
    changePassword: async function({id, old_password, new_password}) {
        const userInfo = await this._getUserInfo(id);
        this._verifyPassword(userInfo, old_password);
        await this._setNewPassword(userInfo, new_password);
    },


    /**
     * 获取用户信息
     * @returns {Promise<*>}
     * @private
     * @param uid
     */
    _getUserInfo: async function(uid) {
        const userInfo = await userModel.findOne(
            ['id', 'password', 'secret'],
            {id: uid}
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
            throw new ApiError('user.passwordError');
        }
    },

    /**
     * 设置新的用户密码
     * @param userInfo
     * @param newPassword
     * @returns {Promise<void>}
     * @private
     */
    _setNewPassword: async function(userInfo, newPassword) {
        const secret = utils.genUUID();
        const currentPassword = encrypt.hmacSha256(newPassword, secret);
        await userModel.update({password:currentPassword, secret}, {id: userInfo.id});
    },
};