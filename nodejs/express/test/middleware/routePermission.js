const chai = require('chai');

const authController = require('./../../app/controller/auth.js');
const username = 'test';
const password = 'password';
const routePermission = require('./../../middleware/routePermission.js');
const dateUtils = require('./../../util/dateUtils.js');
const utils = require('./../../util/utils.js');
const jwt = require('./../../library/jwt.js');
const keyDefines = require('./../../library/keyDefines.js');


describe("routePermission", () => {
    const should = chai.should(); // Using Should style
    let authorization, uid, uuid;
    before((done) => {
        const req = {input: {username, password}};
        const res = {};
        authController.login(req, res).then(() => {
            authorization = res.body.data.token;
            const payload = jwt.verifyToken(authorization);
            uid = payload.uid;
            console.log(uuid);
            uuid = payload.uuid;
            done();
        });
    });

    // 绕过没有登录状态的接口
    it('url indexOf auth', (done) => {
        const req = {url: '/auth'};
        const res = {};
        routePermission(req, res, (err) => {
            if (err) throw err;
        }).then(() => {
            done();
        }).catch(err => {
            done(err);
        });

    });

    // 供后面使用
    const signTimestamp = dateUtils.getNowUnix();

    it('normal', (done) => {
        const timestamp = signTimestamp;
        const input = {id: uid};
        const req = {
            url: '/test',
            headers: {
                timestamp, authorization,
                sign: utils.getSign({uid, timestamp, ...input}, uuid)
            },
            input,
        };
        const res = {};
        routePermission(req, res, err => {
            if (err) throw err;
        }).then(() => {
            (req.cacheUserInfo).should.be.a('object');
            done();
        }).catch(err => {
            done(err);
        });
    });

    // 请求时间校验
    it('requestTimestampValidator', (done) => {
        const timestamp = dateUtils.getNowUnix() + keyDefines.REQUEST_TIME_DIFFER + 1;
        const req = {
            url: '/test',
            headers: {timestamp},
        };
        const res = {};
        routePermission(req, res, err => {
            if (err) throw err;
        }).then(() => {
            done(new Error('requestTimestampValidatorException'));
        }).catch(err => {
            done();
        });
    });

    // jwt校验
    it('jwtValidator', (done) => {
        const timestamp = dateUtils.getNowUnix();
        const req = {
            url: '/test',
            headers: {timestamp, authorization: authorization + 'err'},
        };
        const res = {};
        routePermission(req, res, err => {
            if (err) throw err;
        }).then(() => {
            done(new Error('jwtValidatorException'));
        }).catch(err => {
            done();
        });
    });

    // 校验参数签名
    it('signValidator', (done) => {
        const timestamp = signTimestamp;
        const input = {id: uid};
        const req = {
            url: '/test',
            headers: {
                timestamp, authorization,
                sign: utils.getSign({uid, timestamp, ...input}, uuid)
            },
            input,
        };
        const res = {};
        routePermission(req, res, err => {
            if (err) throw err;
        }).then(() => {
            done(new Error('signValidatorException'));
        }).catch(err => {
            done();
        });
    });
});