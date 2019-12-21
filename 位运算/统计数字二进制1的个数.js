
// 计算一个数组在二进制表示下有多少个1
function count(n) {
    let res = 0;
    while (n !== 0) {
        n &= n - 1;
        ++res;
    }
    return res;
}