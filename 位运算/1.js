



//位运算加法
function bitAdd(m, n) {
    while (m) {
        [m, n] = [(m & n) << 1, m ^ n];
    }
    return n;
}
console.log(bitAdd(22, 43))