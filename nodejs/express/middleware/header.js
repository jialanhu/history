module.exports = async function (req, res, next) {
    req.headerInput = req.headers || {};
    //todo 校验header内容
    next();
};