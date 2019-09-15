
// 最好情况下时间复杂度为O(n),最坏情况下为O(n²)
function insertion_sort(A) {
    for (let i = 1; i < A.length; i++) {
        let p = i - 1
        const x = A[p + 1]
        while (p >= 0 && A[p] > x) {
            A[p + 1] = A[p]
            p--
        }
        A[p + 1] = x
    }
}

let A = [7, 6, 5, 4, 56, 89, 324]
insertion_sort(A)
console.log(A)