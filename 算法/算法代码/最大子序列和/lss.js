function lss(A) {
    if (A.length === 0) return 0
    let maxSum = A[0];
    let dpCurrent = A[0];
    for (let i = 1; i < A.length; i++) {
        dpCurrent = Math.max(A[i], A[i] + dpCurrent);
        maxSum = Math.max(maxSum, dpCurrent);
    }
    return maxSum;
}
const A = [1, 2, -4, 2, 2, -1]
lss(A) // 4

const B = [1, -1]
lss(B) // 1

const C = [-2, -3, 4, -1, 3, -1, -2, 5, -1]
lss(C) // 8

lss([]) // 0

lss([-1, -2, -3]) // 0