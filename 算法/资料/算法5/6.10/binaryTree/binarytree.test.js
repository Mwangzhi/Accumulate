const {assert} = require('chai')
const BinaryTree = require('./BinaryTree')


describe('测试二叉树', () => {

  it('insert', () => {

    const tree = new BinaryTree()

    tree.insert(2)
    tree.insert(3)
    tree.insert(10)
    tree.insert(1)

    const it = tree.transverse()
    assert.deepEqual([...it].map(x => x.key), [1,2,3,10])

  })

  it('transplant', () => {
    const tree = new BinaryTree()
    tree.insert(7)
    tree.insert(2)
    tree.insert(10)
    
    const node = BinaryTree.createNode(8)
    tree.transplant(tree.root.right, node)
    assert.equal(tree.root.right.key, 8)
    assert.equal(node.p.key, 7)
  })

  it('transplant-null-test', () => {
    const tree = new BinaryTree()
    tree.insert(7)
    tree.insert(2)
    tree.insert(10)
    
    const node = BinaryTree.createNode(8)
    tree.transplant(tree.root.right, null)
    assert.equal(tree.root.right, null)
  })

  it('寻找节点', () => {
    const tree = new BinaryTree()
    tree.insert(7)
    tree.insert(3)
    tree.insert(10)
    tree.insert(9)
    tree.insert(12)
    tree.insert(14)
    tree.insert(13)
    tree.insert(15)

    const node = tree.findNode(12)
    assert.equal(node.key, 12)

  })

  it('delete-只有一个节点', () => {
    const tree = new BinaryTree()
    tree.insert(7)
    tree.delete(tree.root)

    assert.equal(tree.root, null)

  })

  it('delete-左边无节点', () => {
    const tree = new BinaryTree()
    tree.insert(7)
    tree.insert(10)
    tree.delete(tree.root)
    assert.equal(tree.root.key, 10) 
  })

  it('delete-右边无节点', () => {
    const tree = new BinaryTree()
    tree.insert(7)
    tree.insert(3)
    tree.delete(tree.root)
    assert.equal(tree.root.key, 3)
  })

  it('delete-右节点是后继节点', () => {
    const tree = new BinaryTree()
    tree.insert(7)
    tree.insert(3)
    tree.insert(10)
    tree.insert(9)
    tree.insert(12)
    tree.insert(14)
    tree.insert(13)
    tree.insert(15)

    const nodeToDelete = tree.findNode(10)
    const p = nodeToDelete.p
    tree.delete(nodeToDelete)
    assert.equal(p.key, 7)
    assert.equal(p.right.key , 12)
    assert.equal(p.right.left.key, 9)
    assert.equal(p.right.right.key, 14)
  })

  it('delete-右节点不是后继节点', () => {
    const tree = new BinaryTree()
    tree.insert(7)
    tree.insert(3)
    tree.insert(10)
    tree.insert(9)
    tree.insert(30)
    tree.insert(35)
    tree.insert(15)
    tree.insert(18)
    tree.insert(16)
    tree.insert(17)

    const nodeToDelete = tree.findNode(10)
    const p = nodeToDelete.p
    tree.delete(nodeToDelete)

    assert.equal(p.key, 7)
    assert.equal(p.right.key, 15)
    assert.equal(p.right.left.key, 9)
    assert.equal(p.right.right.key, 30) 
    assert.equal(p.right.right.left.key, 18)
  })
})

   




  
