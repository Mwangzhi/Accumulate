const array2d = require('./array2d')

const REPLACE = 0
const DELETE = 1
const INSERT = 2
const UNCHANGED = 3

function pad(str, n) {
  str = str + ''
  for(let i = str.length; i < n; i++) {
    str = str + ' '
  }
  return str
}

/**
 * 基于动态规划的EditDistance算法，用于比较数组，然后获得最优的更新序列
 */
class EditDistance{

  constructor(s, t, compareFunction = (a,b) => a === b) {

    this.s = s
    this.t = t
    this.compareFunction = compareFunction

  }

  print() {
    const d = this.d
    const s = this.s
    const t = this.t
    const m = d.length
    const n = Math.max(...d.map(x => x.length))

    console.log([' ', ' ', ...t].map(c => pad(c, 3)).join(' '))
    for(let i = 0; i < m; i++) {
      let line = ''
      line += pad(i === 0 ? ' ' : s[i - 1], 3) + ' '
      for(let j = 0; j < n; j++) {
        line += pad( d[i][j].v, 3) + ' '
      }
      console.log(line)
    }
  }

  /**
   * 生成编辑序列
   */
  edit_seq() {

    let path = []
    let p = [this.s.length, this.t.length]
    while(p) {
      const t = this.d[p[0]][p[1]]
      const next = p

      if(t && p[0] !== 0) {

        let operation = null

        if(t.op === REPLACE) {
          operation = {
            type : REPLACE,
            at : p[0] - 1,
            from : this.s[p[0] - 1],
            to : this.t[p[1] - 1],
          }
        }
        else if (t.op === INSERT) { // insert
          operation = {
            type : INSERT,
            at : p[0],
            item : this.t[p[1] - 1]
          }
        }
        else if(t.op === DELETE){ // delete
          operation = {
            type : DELETE,
            at : p[0] - 1,
            item : this.s[p[0] - 1]
          }
        }
        else {
          operation = {
            type : UNCHANGED,
            at : p[0] - 1,
            from : this.s[p[0] - 1],
            to : this.t[p[1] - 1],
          }
        }
        operation && path.push(operation)

      }
      p = t.p
    }
    return path.reverse()
  }

  /**
   * Find edit distance of s & t, with a compare function
   * s & t must be array like
   */
  find() {
    const s = this.s
    const t = this.t
    const compareFunction = this.compareFunction

    const m = s.length
    const n = t.length

    // d[i,j] will hold the Levenshtein distance between
    // (0,...i) & (0, ... j)
    const d = array2d(m + 1, n + 1, () => {
      return {}
    })

    // Initialize first col. and first row
    for (let i = 0; i <= m; i++) {
      d[i][0].v = i
    }
    for (let j = 0; j <= n; j++) {
      d[0][j].v = j
    }

    for (let j = 1; j <= n; j++) {
      for (let i = 1; i <= m; i++) {
        if (compareFunction( s[i - 1] , t[j - 1]) ) {
          d[i][j].v = d[i - 1][j - 1].v
          d[i][j].p = [i - 1, j - 1]
        }
        else {

          const p = [ [i-1, j-1], [i-1, j], [i, j-1]]

          d[i][j].v = Number.MAX_SAFE_INTEGER
          for(let k = 0; k < p.length; k++) {
            const x = p[k]
            if( d[i][j].v > d[x[0]][x[1]].v) {
              d[i][j].v = d[x[0]][x[1]].v
              d[i][j].p = x

              d[i][j].op = k
              // d[i][j].op = 'ins'....
            }
          }
          // Math.min(1,2,3) + 1
          d[i][j].v ++
        }
      }
    }

    this.d = d
    return d
  }

}

module.exports = EditDistance