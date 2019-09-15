/* 
题目：给定一个正整数，实现一个方法来求出离该整数最近的大于自身的"换位数"
比如：输入12345 返回12354
     输入12354 返回12435
     输入12435 返回12453

思路：尽量保持高位不变，低位在最小范围内变换顺序
12354 -->因为54已经是最大组合，所以从3开始，将3与离3最近的数字，也就是
4交换，然后在将53按照从大到小排序，最终结果为12435
*/
function findTransferPoint(numbers) {
    for (let i = numbers.length - 1; i > 0; i--) {
        if (numbers[i] > numbers[i - 1]) {
            return i
        }
    }
    return 0
}
function exchangeHead(numbers, index) {
    let head = numbers[index - 1]
    for (let i = numbers.length - 1; i > 0; i--) {
        if (head < numbers[i]) {
            numbers[index - 1] = numbers[i]
            numbers[i] = head
            break
        }
    }
    return numbers
}
function reverse(num, index) {
    for (let i = index, j = num.length - 1; i < j; i++ , j--) {
        let tem = num[i]
        num[i] = num[j]
        num[j] = tem
    }
}
function findNearestNumber(A) {
    //拷贝入参
    let B = [...A]
    //从后向前查看逆序区域，找到逆序区域的前一位，也就是数字置换的边界
    let index = findTransferPoint(B)
    //如果数字置换边界是0，说明整个数组已经逆序，无法得到更大的相同数字组成的整数，返回null
    if (index === 0) return null
    //把逆序区域的前一位和逆序区域中刚刚大于它的数字交换位置
    exchangeHead(B, index)
    //把原来的逆序区域转为顺序
    reverse(B, index)
    return B
}

console.log(findNearestNumber([1, 2, 3, 4, 5]))//1 2 3 5 4
console.log(findNearestNumber([1, 2, 3, 5, 4]))//1 2 4 3 5
console.log(findNearestNumber([1, 2, 4, 3, 5]))//1 2 4 5 3
console.log(findNearestNumber([1, 2, 4, 5, 3]))//1 2 5 3 4