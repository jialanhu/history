const DECIMAL_DIGITS = 2;

module.exports = function (num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') return NaN;
    const result = num1 + num2;
    if (Number.MAX_SAFE_INTEGER < result || result < Number.MIN_SAFE_INTEGER) return NaN;
    if (!Number.isInteger(result)) return Number(result.toFixed(DECIMAL_DIGITS));
    return result;
}