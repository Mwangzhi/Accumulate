const BinaryTreeNode = require('./BinaryTreeNode')
class BinaryTree {
  constructor(){
    this.root = null
  }

  static createNode(key, value){
    return new BinaryTreeNode(key,value)
  }

  delete(node) {

    // 没有左节点
    if(!node.left) {
      this.transplant(node, node.right)
    }
    // 没有右节点
    else if(!node.right) {
      this.transplant(node, node.left)
    }
    else {
      const successor = this.findMinNode(node.right)
      
      // 后继节点是右节点
      if(successor === node.right) {
        this.transplant(node, successor)
        successor.left = node.left
        successor.left.p = successor 
      }
      else {
        this.transplant(successor, successor.right)
        successor.right = node.right
        node.right.p = successor
        this.transplant(node, successor)
        successor.left = node.left
        successor.left.p = successor 
      }
    }
  }

  /**
   * 寻找有最小key的子节点
   */
  findMinNode(node) {

    while(node) {
      if(!node.left) {
        return node
      }
      node = node.left
    }
  }

  /**
   * 将节点v移植到u，并维护v和u.p之间的关系 
   * @param {BinaryTreeNode} u 
   * @param {BinaryTreeNode} v 
   */
  transplant(u, v) {
    if(!u.p) {
      this.root = v
    }
    if(v) {
      v.p = u.p
    }

    if(u.p && u.p.left === u) {
      u.p.left = v
    }
    if(u.p && u.p.right === u) {
      u.p.right = v
    }
  }

  insert(key, value) {
    const node = new BinaryTreeNode(key, value)

    let p = this.root 

    // 尾指针
    let tail = this.root


    while(tail) {
      p = tail
      if(tail && key < tail.key) {
        tail = tail.left
      }
      else {
        tail = tail.right
      }
    }


    if(!p) {
      this.root = node
      return
    }

    // 插入 
    if (p.key < key) {
      p.right = node
    } else {
      p.left = node 
    }
    node.p = p
    node.level = (p.level + 1)
  }

  transverse(){
    return this.__transverse(this.root)
  }

  /**
   * 查找节点
   * @param {*} key 
   */
  findNode(key) {
    return this.__findNode(this.root, key)
  }

  __findNode(node, key) {
    if(!node) {return null}
    if(node.key === key) {
      return node
    }
    if(node.key > key) {
      return this.__findNode(node.left, key)
    }
    else {
      return this.__findNode(node.right, key)
    }

  }

  *__transverse (node) {
    if (!node) { return }
    yield* this.__transverse(node.left)
    yield node 
    yield* this.__transverse(node.right)
  }

  

  
}

module.exports = BinaryTree