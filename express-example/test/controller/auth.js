const chai = require('chai');

const authController = require('./../../app/controller/auth.js');
const username = 'test';
const password = 'password';

describe("auth", () => {
    const should = chai.should(); // Using Should style
    describe('login', () => {
        it('normal', (done) => {
            const req = {input: {username, password}};
            const res = {};
            authController.login(req, res).then(() => {
                should.equal(res.httpStatus, 200);  //http状态正常
                should.equal(res.body.code, 0);     //业务状态正常
                done();
            });
        });

        // 密码错误
        it('error password', (done) => {
            const req = {input: {username, password: "error password"}};
            const res = {};
            authController.login(req, res).then(() => {
                done(new Error('verifyPasswordException'))
            }).catch(() => {
                done();
            });
        });
    });
});