
//9.14 移动汉诺塔步骤
function moveTower(disks, k, n, frome, to, use) {
  if (n === 1) {
    console.log(`${disks[k]}${frome}-->${to}`)
  }
  moveTower(disks, k + 1, n - 1, frome, use, to)
  console.log(`${disks[k]}${frome}-->${to}`)
  moveTower(disks, k + 1, n - 1, use, to, from)
}
function solve_hanoi_tower(disks, from, to, use) {
  moveTower(disks, 0, disks.length, frome, to, use)
}
//9.15 全排列函数
function permutation1(str, select = []) {
  if (select.length === str.length) {
    return select.map(i => str[i]).join('')
  }
  let r = []
  for (let i = 0; i < str.length; i++) {
    if (select.indexOf(i) === -1) {
      r = r.concat(permutation1(str, select.concat(i)))
    }
  }
  return r
}
function permutation2(str, select = [], left = [...str]) {
  if (left.length === 0) {
    return select.join('')
  }
  return [].concat(...left.map((c, i) => permutation2(
    str,
    select.concat(c),
    left.slice(0, i).concat(left.slice(i + 1))
  )))
}
//9.16分析上面两个全排列函数，时间复杂度
//9.17 求和为0的子集
function sum_of_zero_r(S) {
  function _sum_of_zero_r(S, decisions = []) {
    if (S.length === decisions.length) {
      const sum = decisions.reduce((a, b, i) => (b ? S[i] : 0) + a)
      return sum === 0 ? 1 : 0
    }
    let s = 0;
    s += _sum_of_zero_r(S, decisions.concat(true))
    s += _sum_of_zero_r(S, decisions.concat(false))
    return s
  }
  return _sum_of_zero_r(S, []) - 1
}
//9.18 反转链表
function reverse(node) {
  if (node.next) {
    reverse(node.next)
    node.next.next = node
    node.next = null
  }
}
//9.19 字符串s是否由字符串p1、p2组成
function is_combination(s, p1, p2) {
  return !s ? !(p1 || p2) :
    s[0] == p1[0] && is_combination(s.slice(1), p1.slice(1), p2) ||
    s[0] == p2[0] && is_combination(s.slice(1), p1, p2.slice(1))
}
//9.20   集合S  和为N
function sum_subset(S, N, path = []) {
  const head = S.slice(0, S.length - 1)
  const tail = S[S.length - 1]
  if (N === 0) {
    return [path]
  }
  if (head.length === 0) {
    return []
  }
  let r = []
  r = r.concat(sum_subset(head, N, path))
  r = r.concat(sum_subset(head, N - tail, path.concat(tail)))
  return r
}
//9.21 克隆函数
function clone(obj) {
  if (obj == null || typeof obj !== 'object') return obj

  let newObj = null

  // 时间对象有特殊性
  if (obj.constructor === Date) {
    newObj = new obj.constructor(obj)
  } else {
    // 兼容Moments等库
    if (obj.clone) { return obj.clone() }
    newObj = new obj.constructor()
  }

  for (let key in Object.getOwnPropertyDescriptors(obj)) {
    newObj[key] = clone(obj[key])
  }
  return newObj
}
//9.22   使用canvas绘制递归树
//9.23 爬楼梯
function steps(n) {
  if (n === 0) return 1
  let sum = 0
  for (let i = 0; i < n; i++) {
    sum += steps(i)
  }
  return sum
}
function steps(n) {
  const s = [1, 1]
  for (let i = 2; i <= n; i++) {
    s[i] = s.reduce((a, b) => a + b)
  }
  return s.pop()
}
function steps(n) {
  return 1 << (n - 1)
}
//9.25 加和序列
function is_additive(s, p = []) {
  if (s.length === 0) {
    return p.length >= 3
  }

  // 递归体循环递归每种取字符的情况
  for (let i = 1; i <= s.length; i++) {
    const v = parseInt(s.slice(0, i))
    const tail = s.slice(i)
    if (
      p.length < 2 || (
        p.length >= 2 &&
        p[p.length - 1] + p[p.length - 2] === v
      )
    ) {
      if (is_additive(tail, decisions.concat(v))) {
        return true
      }
    }
  }
  return false
}
//9.26 老鼠走迷宫
/**
 * @param {*} maze //地图
 * @param {*} pos  //当前位置
 * @param {*} path //开始位置到当前位置走过的点
 * @param {*} transverse  //遍历过的节点
 */
function rat_in_maze(
  maze,
  pos = [0, 0],
  path = [[...pos]],
  transverse = []
) {
  const [x, y] = pos
  // 如果找到终点
  if (maze[x][y] === 2) {
    return path
  }
  // 记录走过当前位置
  transverse[x * maze.length + y] = 1
  // 找到可能的选择
  const choices = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]
    // 过滤掉墙和已经遍历的地方
    .filter(([x, y]) => {
      return x >= 0 && y >= 0 && x < maze.length &&
        y < maze[0].length
        && (maze[x][y] !== 1) &&
        !transverse[x * maze.length + y]
    })

  // 对每个选择，继续递归，寻找路径
  for (let [x, y] of choices) {
    const p = rat_in_maze(maze, [x, y], path.concat([[x, y]]), transverse)
    if (p) return p
  }

}

function print(maze, path) {
  maze.forEach((row, i) => {
    console.log(row.map((v, j) => {
      if (path.find(([x, y]) => (x === i && y === j))) {
        return 'x'
      }
      return v
    }).join(' ')
    )
  })
}

const maze = [
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 1],
  [1, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 1, 1],
  [2, 1, 0, 0, 0, 0]
]
print(maze, rat_in_maze(maze))
//9.27 将集合分成两部分，这两部分差值最小
const sum = (arr) => arr.reduce((a, b) => a + b, 0)

function tug(S) {
  const total = sum(S)

  let min = Infinity
  let list = null

  /* 递归枚举所有的情况 */
  function tug_util(S, decisions = []) {

    if (decisions.length === ~~(S.length / 2)) {//~~相当于Math.floor()
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
//9.28 计算两个数字的最大公约数。比如数字12和数字8的最大公约数是4。
function gcd(a, b) {
  if (a === b) return a
  if (a > b) return gcd(a - b, b)
  return gcd(a, b - a)
}


console.log(gcd(12, 8))











