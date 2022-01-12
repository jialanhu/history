const moment = require('moment');
/**
 * 时间工具
 */
module.exports = {

	/**
	 * 获取现在的unix时间戳
	 * @returns {number}
	 */
	getNowUnix: function () {
		return moment().unix();
	},
};