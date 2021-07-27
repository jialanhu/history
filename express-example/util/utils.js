const logger = require('./../util/logger.js');
const UUID = require('uuid');

module.exports = {
    genUUID: function () {
        let uuid = null;
        try {
            uuid = UUID.v1();
        } catch (error) {
            uuid = UUID.v4();
        }
        return uuid;
    },

    /**
     * 安全的json解析
     */
    safetyJsonParse: function(text) {
        let returnData;
        try {
            returnData = JSON.parse(text);
        }
        catch (error) {
            logger.getLogger('error').error('safetyJsonParse解析错误 text:', text, 'error.stack', error.stack);
        }
        return returnData;
    },

	/**
	 * @param ms 毫秒
	 * @returns {Promise<unknown>}
	 */
	sleep: async function(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	},

	/**
	 * 随机数生成 min <= n <= max
	 * @param min 最小值
	 * @param max 最大值
	 */
	randomNumber: function (min, max) {
		if (min > max){
			throw new Error("最小值不可大于最大值");
		}
		min = parseInt(min);
		max = parseInt(max);
		return Math.floor(Math.random() * (max - min + 1) + min);
	},


    /**
     * @param router express.Router
     * @param routes
     * @param {Object} ext 扩展字段 eg: {prefix: 同个路由的通用前缀}
     */
    routerHelper: function(router, routes, ext = {}) {
        routes.forEach(route => {
            const url = (ext.prefix || '') + route.url;
            router[route.method](url, async (req, res, next) => {
                try {
                    await route.callback(req, res);
                    next()
                } catch (error) {
                    next(error)
                }
            })
        });
        return router;
    },
};