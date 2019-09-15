/**
 * 测试编辑距离算法
 */

const EditDistance = require('./edit_distance')
const {assert} = require('chai')

describe('测试编辑举例算法', () => {
  it('基础测试', () => {

    const ed = new EditDistance('abc', 'acb')
    const d =ed.find()
    assert.equal(d[3][3].v, 2)
  })

  it('路径测试', () => {
    const ed = new EditDistance('abc', 'acb')
    const d =ed.find()
    const seq = ed.edit_seq()

    assert.equal(seq[0].type, 0)
    assert.equal(seq[1].type, 0)
  })
})