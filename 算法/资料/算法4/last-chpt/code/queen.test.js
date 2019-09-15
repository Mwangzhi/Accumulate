const {assert} = require('./queen')
const search = require('./queen')

function print(N, solution) {

  for(let i = 0; i < N; i++) {
    let str = ''
    for(let j = 0; j < N; j++) {
      if(solution.indexOf(i * N + j) !== -1) {
        str += 'x '
      } else {
        str += 'o '
      }
    }
    console.log(str)
  }

}
describe('N皇后问题测试', () => {
  it('测试01', () => {
    const solutions = search(4)
    print(4, solutions[0])
    print(4, solutions[1])
  })
})