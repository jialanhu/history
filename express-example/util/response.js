module.exports = {
    /**
     * 输出数据到客户端
     * @param res 上下文
     * @param data 数据内容
     * @param errCode 业务错误码
     * @param msg 提示信息
     * @param httpStatus http状态码
     */
    output: function(res, data, errCode = 0, msg = '请求成功', httpStatus = 200) {
        let json = {};
        json.code = errCode;
        json.data = data ? data : {};
        json.msg = msg;
        res.body = JSON.stringify(json);
        res.httpStatus = httpStatus;
    },

    /**
     * 输出数组
     */
    list: function(res, list = [], total = 0) {
        this.output(res, {list: list, total: total});
    },
    
    /**
     * 输出键值对
     */
    map: function(res, map = {}) {
        this.output(res, map);
    }
};