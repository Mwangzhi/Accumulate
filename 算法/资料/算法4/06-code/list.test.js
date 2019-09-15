const List = require('./List')
const { assert } = require('chai')

describe('链表测试', () => {
  it('插入元素和遍历', () => {
    const list = new List()

    for(let i = 1; i <= 5; i++) {
      const node = List.createNode(i)
      list.insert(node)
    }

    const it = list.transverse()

    assert.deepEqual([5,4,3,2,1], [...it].map(node => node.key))
  })


  it('删除元素', () => {
    const list = new List()
    for(let i = 1; i <= 5; i++) {
      const node = List.createNode(i)
      list.insert(node)
    } 

    const node = list.search(3)
    list.remove(node)

    const it = list.transverse()
    assert.deepEqual([5,4,2,1], [...it].map(node => node.key))
  })

  it('搜索', () => {
    const list = new List()

    for(let i = 1; i <= 5; i++) {
      const node = List.createNode(i)
      list.insert(node)
    }

    const node = list.search(3)

    assert.equal(node.key, 3)
  })

})