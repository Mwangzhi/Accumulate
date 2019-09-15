//===========================================第一次优化========================================================
/* 
本次优化主要是针对这种情况的数组：[9, 1, 2, 3, 4, 5, 6, 7, 8]
当数组比较较少次数后，数组已经是有序状态了，无需再继续比较，所以
每次j循环结束后都要查看isSorted变量。

*/
function swap(A, i, j) {
    const t = A[i]
    A[i] = A[j]
    A[j] = t
}
function bubble_sort(A) {
    for (let i = A.length - 1; i >= 1; i--) {
        let isSorted = true
        for (let j = 1; j <= i; j++) {
            if (A[j - 1] > A[j]) {
                swap(A, j - 1, j)
                isSorted = false
            }
        }
        if (isSorted) {
            break
        }
    }
}

let A = [9, 1, 2, 3, 4, 5, 6, 7, 8]
bubble_sort(A)
console.log(A)



//===========================================第二次优化========================================================
/* 
本次优化主要是针对这种数组的：[3, 2, 1, 4, 5, 6, 7]
有序数列的长度=i循环次数。
但是当数组后半部分是有序的并且是最大的情况下，
有序数列的长度 > i循环次数。
所以记录下每次j循环最后交换的位置
*/
function bubble_sort(A) {
    let lastExchangeIndex = 0
    let sortBorder = A.length - 1
    for (let i = A.length - 1; i >= 1; i--) {
        let isSorted = true
        // for (let j = 1; j <= i; j++) {
        for (let j = 1; j <= sortBorder; j++) {
            if (A[j - 1] > A[j]) {
                swap(A, j - 1, j)
                isSorted = false
                lastExchangeIndex = j
            }
        }
        sortBorder = lastExchangeIndex
        if (isSorted) {
            break
        }
    }
}
let A = [3, 2, 1, 4, 5, 6, 7]
bubble_sort(A)
console.log(A)
console.log(a)


//===========================================第三次优化---鸡尾酒排序========================================================
/* 
鸡尾酒排序本质依然是冒泡排序，区别是：鸡尾酒排序，在一个i循环中，先从左到右冒一个最大值，然后从右往左冒一个最小值
以下代码增加了isSorted、lastRightExchangeIndex、lastLeftExchangeIndex、rightSortBorder、leftSortBorder
是否是有序区标识及有序区边界
主要是针对这种类型数组：[2,3,4,5,6,7,1]
数组前半部分已经是有序，只有最后一个是无序的。
*/

function swap(A, i, j) {
    const t = A[i]
    A[i] = A[j]
    A[j] = t
}
function bubble_sort(A) {
    let lastRightExchangeIndex = 0
    let lastLeftExchangeIndex = 0
    let rightSortBorder = A.length
    let leftSortBorder = 0
    for (let i = A.length - 1; i >= 1; i--) {
        let isSorted = true
        for (let j = leftSortBorder + 1; j < rightSortBorder; j++) {
            if (A[j - 1] > A[j]) {
                swap(A, j - 1, j)
                isSorted = false
                lastRightExchangeIndex = j
            }
        }
        rightSortBorder = lastRightExchangeIndex
        if (isSorted) { break }
        isSorted = true

        for (let j = rightSortBorder; j > leftSortBorder; j--) {
            if (A[j - 1] > A[j]) {
                swap(A, j - 1, j)
                isSorted = false
                lastLeftExchangeIndex = j
            }
        }
        leftSortBorder = lastLeftExchangeIndex
        if (isSorted) { break }
    }
}
let A = [2, 3, 4, 5, 6, 7, 1, 0]
bubble_sort(A)
console.log(A)