const utils = require('./../../util/utils.js');
const ApiError = require('./../../library/apiError.js');
const encrypt = require("../../library/encrypt");
const userModel = require('./../model/user.js');

module.exports = {
    /**&
     * 新增
     * @param username
     * @param password
     * @returns {Promise<*>}
     */
    add: async function ({username, password}) {
        const secret = utils.genUUID();
        password = encrypt.hmacSha256(password, secret);
        return await userModel.insert({
            username,
            password,
            secret,
        });
    },

    /**
     * 编辑
     * @param id
     * @param password
     * @returns {Promise<void>}
     */
    edit: async function ({id, password}) {
        const secret = utils.genUUID();
        password = encrypt.hmacSha256(password, secret);
        await userModel.update({password, secret},{id});
    },

    /**
     * 查找
     * @param id
     * @returns {Promise<*>}
     */
    findOne: async function ({id}) {
        return await userModel.findOne(['id', 'username'], {id});
    },

    /**
     * 删除
     * @param id
     * @returns {Promise<void>}
     */
    del: async function ({id}) {
        await userModel.del({id});
    },
};