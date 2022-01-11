module.exports = async function (req, res, next) {
    // 超时请求,直接返回
    if (res.timeout) return;
    res.type('application/json; charset=utf-8')
        .status(res.httpStatus || 404)
        .send(JSON.stringify(res.body));
};