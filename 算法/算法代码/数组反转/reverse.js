function reverse(A) {
    for (let i = 0; i < (A.length / 2); i++) {
        const t = A[i]
        A[i] = A[A.length - i - 1]
        A[A.length - i - 1] = t
    }
}


function reverse(A) {
    return A.length ?
        reverse(A.slice(1)).concat(A[0]) : A
}

function reverse(A) {
    const [f, ...tail] = A
    return [...(tail.length ? reverse(tail) : []), f]
}

// 尾递归
function reverse(A, i = 0) {
    if (i < A.length / 2) {
        const t = A[i]
        A[i] = A[A.length - i - 1]
        A[A.length - i - 1] = t
        return reverse(A, i + 1)
    }
}