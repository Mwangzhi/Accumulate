



//位运算加法
function bitAdd(m, n) {
    while (m) {
        [m, n] = [(m & n) << 1, m ^ n];
    }
    return n;
}
var getSum = function (a, b) {
    while (b != 0) {
        let c = a & b;
        a = a ^ b;
        b = c << 1;
    }
    return a;
};
console.log(bitAdd(22, 43))