const KoaRouter = require('koa-router');
const userController = require('./../controller/user.js');

module.exports = function () {
    const router = new KoaRouter();

    router.post('/v1/users', userController.add);
    router.put('/v1/users/:id', userController.edit);
    router.get('/v1/users/:id', userController.findOne);
    router.del('/v1/users/:id', userController.del);

    router.use('/api/example', router.routes());

    return router;
};