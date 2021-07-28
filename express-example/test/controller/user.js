const chai = require('chai');

const userController = require('./../../app/controller/user.js');
const username = 'test';
const password = 'password';
const password2 = 'password2';

describe("user", () => {
    const should = chai.should(); // Using Should style
    describe('changePassword', () => {
        it('normal', (done) => {
            const req = {
                input: {old_password: password, new_password: password2},
                cacheUserInfo: {id: 1},
            };
            const res = {};
            userController.changePassword(req, res).then(() => {
                should.equal(res.httpStatus, 200);  //http状态正常
                should.equal(res.body.code, 0);     //业务状态正常
                done();
            });
        });

        it('error old_password', (done) => {
            const req = {
                input: {old_password: password, new_password: password2},
                cacheUserInfo: {id: 1},
            };
            const res = {};
            userController.changePassword(req, res).then(() => {
                done(new Error('verifyPasswordException'))
            }).catch(() => {
                done();
            });
        });

        it('reset', (done) => {
            const req = {
                input: {old_password: password2, new_password: password},
                cacheUserInfo: {id: 1},
            };
            const res = {};
            userController.changePassword(req, res).then(() => {
                should.equal(res.httpStatus, 200);  //http状态正常
                should.equal(res.body.code, 0);     //业务状态正常
                done();
            });
        });
    });
});