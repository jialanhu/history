const sum = require('../src/sum.js');
describe('加法', () => {
    test('正常两数相加', () => {
        expect(sum(1, 2)).toBe(3);
        expect(sum(1, -1)).toBe(0);
        expect(sum(-2, 3)).toBe(1);

    });
    test('有非数字参数', () => {
        expect(sum(true, 2)).toBe(NaN);
        expect(sum(false, 2)).toBe(NaN);
        expect(sum('str', 2)).toBe(NaN);
        expect(sum({}, 2)).toBe(NaN);
        expect(sum(Symbol('123'))).toBe(NaN);
        expect(sum(null, 2)).toBe(NaN);
        expect(sum(undefined, 2)).toBe(NaN);
    });
    test('安全大小处理', () => {
        expect(sum(Number.MAX_SAFE_INTEGER, 1)).toBe(NaN);
        expect(sum(9007199254740990, 1)).toBe(Number.MAX_SAFE_INTEGER);
        expect(sum(Number.MIN_SAFE_INTEGER, -1)).toBe(NaN);
        expect(sum(-9007199254740990, -1)).toBe(Number.MIN_SAFE_INTEGER);
    });
    test('结果只保留两位小数,并采取四舍五入', () => {
        expect(sum(0.1, 0.2)).toBe(0.3);
        expect(sum(0.002, 0.002)).toBe(0);
        expect(sum(0.002, 0.003)).toBe(0.01);
    })
})