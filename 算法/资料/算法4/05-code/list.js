/**
 * 链表节点
 */
class ListNode{
  constructor(key){
    // 指向前一个节点
    this.prev = null

    // 指向下一个节点
    this.next = null 

    // 数据(或者用于查找的键)
    this.key = key

  }
}

/**
 * 链表（双向）
 * double-link
 */
class List {

  constructor(){
    this.head = null
  }

  static createNode(key){
    return new ListNode(key)
  }

  /**
   * 将一个节点插入在头指针后面
   * @param {ListNode} node 
   */
  insert(node){
    // node.prev = null
    node.next = this.head
    if(this.head)
      this.head.prev = node
    this.head = node
  }

  search(key){
    let node = this.head
    while(node !== null && node.key !== key){
      node = node.next
    }
    return node
  }

  delete(node){
    const {prev, next} = node

    // 建议：在不同的JS引擎内存回收机制不同
    // delete node.prev
    // delete node.next
    
    if(node === this.head){
      this.head = next
    }

    if(prev)
      prev.next = next
    if(next)
      next.prev = prev
  }


}

List.ListNode = ListNode
module.exports = List