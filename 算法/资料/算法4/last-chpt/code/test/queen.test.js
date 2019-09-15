const {assert} = require('chai')

const search = require('./queen')


function print(queens){

  for(let i = 0; i < queens.length; i++){

    let str = ''
    for (let j = 0; j < queens.length; j++) {
      if(queens.indexOf(i * queens.length + j) !== -1) {
        str += 'x '
      }else {
        str += 'o '
      }
    }

    console.log(str)
  }

}
describe('测试N皇后问题', () => {
  it('4皇后问题', () => {

    const solutions = search(4)
    // console.log(solutions)
    print(solutions[0])
  })
})