

//判断棋盘上两个皇后是否相互攻击
function compatible(p, q, n) {
    const [x1, y1] = [~~(p / n), p % n]
    const [x2, y2] = [~~(q / n), q % n]
    return x1 !== x2 && y1 !== y2 &&
        Math.abs(x1 - x2) !== Math.abs(y1 - y2)
}
//判断一组决策是否是最终答案
// function is_goal(n, decisions) {
//     for (let i = 0; i < n; i++) {
//         for (let j = i + 1; j < n; j++) {
//             if (i === j) { continue }
//             if (!compatible(decisions[i], decisions[j], n)) {
//                 return false
//             }
//         }
//     }
//     return true
// }
function queen(n, decisions = []) {
    if (decisions.length === n) {
        // return is_goal(n, decisions) ? [decisions] : []
        // decisions.sort((a, b) => a - b)
        // const hash = decisions.join('-')
        // if (hset[hash]) { return [] }
        // hset[hash] = 1
        // return is_goal(n, decisions) ? [decisions] : []
        return [decisions]
    }
    let r = []
    const start = decisions[decisions.length - 1] || -1
    for (let i = start + 1; i < n * n; i++) {
        if (decisions.indexOf(i) === -1) {
            if (decisions.every(j => compatible(j, i, n))) {
                r = r.concat(queen(n, decisions.concat(i)))
            }
        }
    }
    return r
}
console.log(queen(4))