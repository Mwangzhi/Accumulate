/* 
整体思路类似 笔算两个数字，列出竖式
1、将两个大数字分别逆序，然后放入两个数组中
2、数组从左到右取出数字做加法后放入结果数组，满十进一
3、将结果数组再次逆序
*/
function bigNumSum(A, B) {
    let maxLength = A.length > B.length ? A.length : B.length
    let result = Array(maxLength + 1).fill(0)
    A = [...A].reverse()
    B = [...B].reverse()
    for (let i = 0; i < result.length; i++) {
        let t = result[i]
        t += Number(A[i]) || 0
        t += Number(B[i]) || 0
        if (t >= 10) {
            t = t - 10
            result[i + 1] = 1
        }
        result[i] = t
    }
    !result[result.length - 1] && (result.length -= 1)
    result.reverse()
    return result.join('')
}
console.log(bigNumSum('426709752318', '95481253129'))

