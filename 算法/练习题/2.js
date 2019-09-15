

/* 
题目1:求交集
写一个函数，join，两个整数数组(其中元素不重复）， 求其交集
    join([1,2,3,5], [2,3,6,8]) // [2,3]
*/

/* 
题目2:计算路径数量
对于一个m*n的地图（二维数组）

const map = [
  [0, 0, 0, 0, 2],
  [0, 1, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0]
]

0代表可走区域
2代表出口（总是在右上角）
1代表不可走区域
规定只有上下左右四个方向可以走，且走过的路不能再走一次，写一个函数num_of_path(map, point)计算从地图上一个点到终点总共有多少种走法。

// 如果上来就在终点，那么走到终点有1种走法
num_of_path([[2]], [0,0]) // 1


// 其他情况正常计算
num_of_path([
  [0, 2],
  [0, 0]
], [0, 0]) // 2

// 如果卡在墙上，那就不能移动了
num_of_path([
  [1, 2],
  [0, 0]
], [0, 0]) // 0


 num_of_path([
  [0, 0, 0, 0, 2],
  [0, 1, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0]
], [2, 0]) // 69
*/
function num_of_path(map, point) {
    const N = map[0].length
    const M = map.length
    let c = 0
    function _num_of_path_inner(transverse, x) {
        transverse[x[0] * N + x[1]] = true
        if (map[x[0]][x[1]] === 1) { return }
        if (map[x[0]][x[1]] === 2) {
            c++
            return
        }
        if (x[0] > 0 && map[x[0] - 1][x[1]] !== 1 && !transverse[(x[0] - 1) * N + x[1]]) {
            _num_of_path_inner(transverse.slice(), [x[0] - 1, x[1]])
        }
        if (x[0] < M - 1 && map[x[0] + 1][x[1]] !== 1 && !transverse[(x[0] + 1) * N + x[1]]) {
            _num_of_path_inner(transverse.slice(), [x[0] + 1, x[1]])
        }
        if (x[1] > 0 && map[x[0]][x[1] - 1] !== 1 && !transverse[x[0] * N + x[1] - 1]) {
            _num_of_path_inner(transverse.slice(), [x[0], x[1] - 1])
        }

        if (x[1] < N - 1 && map[x[0]][x[1] + 1] !== 1 && !transverse[x[0] * N + x[1] + 1]) {
            _num_of_path_inner(transverse.slice(), [x[0], x[1] + 1])
        }
    }
    _num_of_path_inner([], point)
    return c
}
const map = [
    [0, 0, 0, 0, 2],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
]

console.log(num_of_path(map, [0, 4]))



/* 
题目3:解析数组
写一个函数parse将字符串解析为数组。
不可以使用原生方法直接处理，比如JSON.parse等。
示例
parse(`(1,2,3)`) // [1,2,3]
parse(`(1,'2a',3)`) // [1,'2a',3]
parse(`(1, (3, 4) ,5)`) // [1,[3,4],5]
parse(`(1, (3,5), 0)`) // [1,[3,5],0]
parse(`(()())`) // [[],[]]
parse(`123`) // null
parse(`(1,2`) // null
parse(`()()`) // null

// 字符串只支持单引号
parse(`("123")`) // null
parse(`('"123"')`) // ['"123"']

// 不需要考虑转义符号等情况
parse(`('1\''`) // null

// 不需要考虑null的情况
parse(`(null)`) // null
*/
function parse(str) {
    let k = 0
    function _parse_array_inner() {
        if (!str || str[k++] !== '(') {
            return null
        }
        let r = []
        let last = ''
        let has_token = false
        let state = 0
        function mk_token() {
            k++
            if (state > 2 || state === 1) {
                throw new Error('unexpected token', last)
            }
            if (last.length === 0) {
                return null
            }
            let v = null
            if (state === 0) {
                v = Number(last)
                if (isNaN(v)) {
                    throw new Error('unexpected token', last)
                }

            } else {
                v = last
            }
            has_token = true
            last = ''
            state = 0
            return v
        }
        while (k !== str.length + 1) {
            const c = str[k]
            switch (c) {
                case '(': {
                    const result = _parse_array_inner()
                    if (result === null) { return null }
                    r.push(result)
                    break
                }
                case ')': {
                    const token = mk_token()
                    if (token !== null) {
                        r.push(token)
                    }
                    return r
                }
                case '':
                    if (state === 1 && last) {
                        return null
                    }
                    k++
                    break
                case ',': {
                    const token = mk_token()
                    if (token !== null) {
                        r.push(token)
                    }
                    break
                }
                case '\'':
                    state++
                    k++
                    break
                default:
                    k++
                    last += c
            }
        }
        return null
    }
    try {
        const result = _parse_array_inner()
        if (k !== str.length) {
            return null
        }
        return result
    } catch (e) {
        return null
    }
}

// console.log(parse(`((),())`))

