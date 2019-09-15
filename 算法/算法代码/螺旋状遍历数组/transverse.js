// 遍历3*3
traverse([1, 2, 3, 4, 5, 6, 7, 8, 9], 3) // [1,2,3,6,9,8,7,4,5])

// 遍历4*4
console.log(traverse([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 4))
// [1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10]

function xy(i, N) {
    return [Math.floor(i / N), i % N] //计算坐标
}
function d(x, y, N) {
    return Math.min(x, y, N - x - 1, N - y - 1) //计算第一个维度，点到边的距离
}
function k(x, y, N) {
    return x <= y ? x + y : 4 * N - (x + y)//计算第二个维度，当几个点都处在第一个维度时的排序规则
}

function traverse(A, N) {
    return A.map((x, i) => [x, ...xy(i, N)])
        .sort(([v1, x1, y1], [v2, x2, y2]) => {
            const d1 = d(x1, y1, N)
            const d2 = d(x2, y2, N)
            const k1 = k(x1, y1, N)
            const k2 = k(x2, y2, N)

            return d1 - d2 || k1 - k2
        })
        .map(t => t[0])
}


function next(t, p, N) {
    return [x => x % N === N - 1 ? -1 : x + 1, x => x + N, x => x % N === 0 ? -1 : x - 1, x => x - N][t % 4](p)
}

function traverse(A, N) {
    const B = Array(N * N).fill(false)
    let i = 0, // 已遍历的个数
        p = 0, // 遍历的节点序号
        t = 0, // 方向
        r = [] // 结果
    while (i < A.length) {
        r[i++] = A[p]
        B[p] = true
        let np = next(t, p, N)
        if (B[np] === undefined || B[np] === true) {
            np = next(++t, p, N)
        }
        p = np
    }
    return r
}