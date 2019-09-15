function radix_sort(A) {
    const maxLength = Math.max(...A.map(word => word.length))

    // 27个桶
    // 第0个桶对应空字符串
    // 1-27对应 字母A-Z
    const buckets = Array.from({ length: 27 }, () => [])
    // 有效数位

    for (let i = maxLength - 1; i >= 0; i--) {
        // 将单词放入桶中
        A.forEach(word => {
            const index = word[i] ? word[i].toUpperCase().charCodeAt(0) - 65 : 0
            buckets[index].push(word)
        })
        console.log(buckets.map(x => [...x]))
        // 从桶中取出元素
        let j = 0
        buckets.forEach(bucket => {
            while (bucket.length > 0) {
                A[j++] = bucket.shift()
            }
        })
    }
    return A
}