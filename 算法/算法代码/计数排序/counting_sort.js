function counting_sort(A) {
    const max = Math.max(...A)
    const B = Array(max + 1).fill(0)
    const C = Array(A.length)
    A.forEach((_, i) => B[A[i]]++)
    for (let i = 1; i < B.length; i++) {
        B[i] = B[i - 1] + B[i]
    }
    for (let i = 0; i < A.length; i++) {
        const p = B[A[i]] - 1
        B[A[i]]--
        C[p] = A[i]
    }
    return C
}
// let A = [5, 4, 3, 2, 1]
let A = [63, 53, 54, 83, 22, 881];
counting_sort(A)
console.log(A)