module.exports = async function (ctx, next) {
    ctx.headerInput = ctx.req.headers || {};
    await next();
};