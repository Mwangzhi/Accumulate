/**
 * 计算最小编辑巨鹿
 */
const array2d = require('./array2d')

class EditDistance{

  /**
   * 计算s->t的编辑距离，根据一个比较函数
   * @param {*} s
   * @param {*} t
   */
  find(s, t, compareFunction = (a, b) => a === b) {
    const m = s.length
    const n = t.length

    // d[i,j] 是递归子问题的最优解
    const d = array2d(m + 1, n + 1, () => {
      return {}
    })

    /* 以下是「填表法」 */
    for (let i = 0; i <= m; i++) {
      d[i][0].v = i
    }
    for (let j = 0; j <= n; j++) {
      d[0][j].v = j
    }

    for (let j = 1; j <= n; j++) {
      for (let i = 1; i <= m; i++) {
        if (s[i - 1] === t[j - 1]) {
          d[i][j].v = d[i - 1][j - 1].v
          d[i][j].p = [i - 1, j]
        }
        else {

          const p = [ [i-1, j], [i, j-1], [i-1, j-1] ]

          d[i][j].v = Number.MAX_SAFE_INTEGER
          for(let i = 0; i < p; i++) {
            const x = p[i]
            if( d[i][j].v > d[x[0]][x[1]].v) {
              d[i][j].v = d[x[0]][x[1]]
              d[i][j].p = x
            }
          }
          d[i][j] ++
        }
      }
    }

    return d
  }

}


module.exports = EditDistance