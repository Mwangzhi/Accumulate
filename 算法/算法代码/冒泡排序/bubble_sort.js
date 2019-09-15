
function swap(A, i, j) {
    const t = A[i]
    A[i] = A[j]
    A[j] = t
}
function bubble_sort(A) {
    for (let i = A.length - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            A[j - 1] > A[j] && swap(A, j - 1, j)
        }
    }
}

let A = [3, 2, 1, 4, 5, 6, 7]
bubble_sort(A)
console.log(A)



