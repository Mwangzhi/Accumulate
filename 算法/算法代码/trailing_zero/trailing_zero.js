/* 
计算一个数字的阶乘的尾部有多少个零
https://brilliant.org/wiki/trailing-number-of-zeros/#theory-of-trailing-zeros

*/
function trailingZeroes(n) {
    let count = 0, x = 5
    while (x <= n) {
        count += Math.floor(n / x)
        x *= 5
    }
    return count
}