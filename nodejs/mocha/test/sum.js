const assert = require('assert');
const sum = require('../src/sum.js');
describe('加法', () => {
    it('正常两数相加', () => {
        assert.equal(sum(1, 2), 3);
        assert.equal(sum(1, -1), 0);
        assert.equal(sum(-2, 3), 1);
    });
    it('有非数字参数', () => {
        assert.equal(sum(true, 2), NaN);
        assert.equal(sum(false, 2), NaN);
        assert.equal(sum('str', 2), NaN);
        assert.equal(sum({}, 2), NaN);
        assert.equal(sum(Symbol('123'), 2), NaN);
        assert.equal(sum(null, 2), NaN);
        assert.equal(sum(undefined, 2), NaN);
    });
    it('安全大小处理', () => {
        assert.equal(sum(Number.MAX_SAFE_INTEGER, 1), NaN);
        assert.equal(sum(9007199254740990, 1), Number.MAX_SAFE_INTEGER);
        assert.equal(sum(Number.MIN_SAFE_INTEGER, -1), NaN);
        assert.equal(sum(-9007199254740990, -1), Number.MIN_SAFE_INTEGER);
    });
    it('结果只保留两位小数,并采取四舍五入', () => {
        assert.equal(sum(0.1, 0.2), 0.3);
        assert.equal(sum(0.002, 0.002), 0);
        assert.equal(sum(0.002, 0.003), 0.01);
    })
});