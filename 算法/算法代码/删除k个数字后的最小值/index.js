/* 
思路：原整数的所有数字从左到右进行比较，
如果发现某一位的数字大于它右边的数字，
那么在删除该数字后，必然会使得该数位的值降低，
因为右边比它小的数字代替了它的位置
*/
/**
 * 
 * @param {原整数,string} num 
 * @param {删除数量,number} k 
 */
function removeKDigits(num, k) {
    //新整数的最终长度=原整数长度-k
    let newLength = num.length - k
    let stack = []
    let top = 0
    let offset = 0
    for (let i = 0; i < num.length; i++) {
        let t = +num[i]
        if (i === 0) {
            stack[top++] = t
            continue
        }
        while (top > 0 && stack[top - 1] > t && k > 0) {
            top -= 1
            k -= 1
        }
        stack[top++] = t
    }
    while (offset < newLength && stack[offset] === 0) {
        offset++
    }
    return offset === newLength ? '0' : (stack.slice(offset, newLength).join(''))
}
//1 2 0 9 3 6
console.log(removeKDigits('541270936', 3))
console.log(removeKDigits('30200', 1))
console.log(removeKDigits('10', 2))
console.log(removeKDigits('541270936', 3))