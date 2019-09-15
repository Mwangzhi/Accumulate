class BinaryTreeNode{
  constructor(key, value){
    // 指向父节点
    this.p = null

    // 节点的高度
    this.level = 0

    // 左
    this.left = null

    // 又
    this.right = null

    // 键值
    this.key = key

    // 卫星数据
    this.value = null
  }

  toString () {
    let s = ''
    for(let i = 0; i < this.level; i++) {
      s += '  '
    }
    return s + this.key + '\n'
    // if (!node) { return }
    // yield* this.__transverse(node.left)
    // yield node 
    // yield* this.__transverse(node.right)
  }
}

module.exports = BinaryTreeNode