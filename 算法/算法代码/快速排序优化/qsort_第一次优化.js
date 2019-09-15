
function swap(A, i, j) {
    [A[i], A[j]] = [A[j], A[i]]
}

function partition(A, lo, hi) {
    const pivot = A[hi - 1];
    let i = lo, j = hi - 1;
    //小于中心的范围：[lo,i)
    //未确认范围为：[i,j)
    //大于中心点范围为：[j,hi-1)
    while (i !== j) {
        if (A[i] <= pivot) {
            i++
        } else {
            swap(A, i, --j)
        }
    }
    swap(A, j, hi - 1)
    return j
}

//利用尾递归优化快速排序
function qsort(A, lo = 0, hi = A.length) {
    while (lo < hi) {
        const p = partition(A, lo, hi)
        qsort(A, lo, p)
        lo = p + 1
    }
}

const A = [1, 4, 2, 6, 3, 8, 5, 7, 9, 12]
qsort(A)
console.log(A)

