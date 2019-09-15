require('../../lib/itertools')
const ListNode = require('./ListNode')
const NIL = Number.MIN_SAFE_INTEGER
/**
 * 链表
 */
class List{

  /**
   * 一个创建链表节点的工厂方法
   * @param {string} key 
   */
  static createNode(key) {
    return new ListNode(key)
  }
  
  constructor(){
    this.head = null 
  }

  /**
   * 删除一个节点 
   * @param {ListNode} node 
   */
  remove(node) {
    if(node.prev) {
      node.prev.next = node.next
    } else {
      this.head = node.next
    }

    if(node.next) {
      node.next.prev = node.prev
    }

    delete node.prev
    delete node.next
  }

  /**
   * 在头部插入一个节点
   * @param {ListNode} node
   */
  insert(node) {
    node.next = this.head
    node.prev = null
    if(this.head) {
      this.head.prev = node
    }
    this.head = node
  }

  search(key){
    return this.transverse().find(node => node.key === key)
  }

  /**
   * 顺序遍历链表
   */
  *transverse() {
    let p = this.head
    while(p) {
      yield p 
      p = p.next
    }
  }

}


module.exports = List
