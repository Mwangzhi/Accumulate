

function tug(S) {
    const total = sum(S)

    let min = Infinity
    let list = null

    /* 递归枚举所有的情况 */
    function tug_util(S, decisions = []) {

        if (decisions.length === ~~(S.length / 2)) {
            const s = sum(decisions.map(i => S[i]))
            const t = Math.abs(total - 2 * s) // 两个子集和的差值（绝对值）
            if (min > t) {
                min = t
                list = [
                    decisions.map(i => S[i]),
                    [...Array(S.length)].map((_, i) => i).filter(i => decisions.indexOf(i) === -1).map(i => S[i])
                ]
            }
            return
        }

        const start = decisions.length > 0 ? decisions[decisions.length - 1] : -1
        for (let i = start + 1; i < S.length; i++) {
            tug_util(S, decisions.concat(i))
        }
    }
    tug_util(S)
    return list
}






























