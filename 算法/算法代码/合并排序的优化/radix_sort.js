function radix_sort(A) {
    const max = Math.max(...A)
    const buckets = Array.from({ length: 10 }, () => [])
    let m = 1
    while (m < max) {
        A.forEach(number => {
            const digit = ~~((number % (m * 10) / m))
            buckets[digit].push(number)
        })
        let j = 0
        buckets.forEach(bucket => {
            while (bucket.length > 0) {
                A[j++] = bucket.shift()
            }
        })
        m *= 10
    }
}
let A=[5,4,3,2,1]
radix_sort(A)
console.log(A)