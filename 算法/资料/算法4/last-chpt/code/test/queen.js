function search(N){
  return __search(0, N, [])
}

function is_solution(queens, N) {
  const h = []
  const v = []
  const a1 = []
  const a2 = []
  for(let i = 0; i < queens.length; i++) {
    const num = queens[i]
    const x = num % N
    const y = Math.floor( num / N )
    const v1 = x + y
    const v2 = x - y + N
    h[x] = h[x] ? h[x] + 1 : 1
    v[y] = v[y] ? v[y] + 1 : 1
    a1[v1] = a1[v1] ? a1[v1] + 1 : 1
    a2[v2] = a2[v2] ? a2[v2] + 1 : 1
    if(h[x] > 1 || v[y] > 1 || a1[v1] > 1 || a2[v2] > 1) {return false}
  }
  return true
}


/**
 * __seach返回的是所有可能的解
 * [[]]
 */

function __search(start, N, queens){
  if(queens.length === N) {
    if(is_solution(queens, N)){
      return [queens]
    }else {
      return []
    }
  }

  let solutions = []
  for(let i = start; i < N*N ; i++) {
    const _q = [...queens, i]
    solutions = solutions.concat(__search(i + 1, N, _q))
  }
  return solutions
}

function * __search_iterator(start, N, queens) {
  if (queens.length === N) {
    if (is_solution(queens)) {
      yield queens
    }
    return
  }

  for(let i = start; i < N*N ; i++) {
    const _q = [...queens, i]
    yield * __search_iterator(i+1, N, _q)
  }
}

module.exports = search