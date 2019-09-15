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
function bucket_sort(A, k, S) {
    const buckets = Array.from({ length: k }, () => [])
    for (let i = 0; i < A.length; i++) {
        const index = ~~(A[i] / S)
        buckets[index].push(A[i])
    }
    for (let i = 0; i < buckets.length; i++) {
        insertion_sort(buckets[i])
    }
    return [].concat(...buckets)
}
console.log(bucket_sort([5, 4, 3, 2, 1], 10, 10))
