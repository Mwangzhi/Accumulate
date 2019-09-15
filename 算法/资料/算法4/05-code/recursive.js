const Stack = require('./stack')

const {assert} = require('chai')
/**
 * 使用堆栈替代递归
 */

// 数组的展平(递归版)
function flattern(arr) {
  return [].concat(
    ...arr.map( x => Array.isArray(x) ? flattern(x) : x)
  )
}

// 使用Stack
function flattern_by_stack(arr) {
  const s = new Stack()
  // 
  arr.reverse().forEach(x => s.push(x))
  // 存储结果
  const r = []
  while(s.length) {
    const x = s.pop()
    if ( Array.isArray(x) ){
      x.reverse().forEach(y => s.push(y))
    }
    else {
      r.push(x)
    }
  }
  return r
}

assert.deepEqual(flattern( [1,2,[3,[4,[5]]]]), [1,2,3,4,5])
assert.deepEqual(flattern_by_stack( [1,2,[3,[4,[5]]]]), [1,2,3,4,5])

