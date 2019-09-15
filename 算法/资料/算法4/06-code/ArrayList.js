/**
 * 用数组存储链表，同时保持数组和链表两者的特性
 * (内存的分配)
 */
class ArrayList{



  constructor(max = 1000){
    this.data = new Array(max * 3)

    // 头指针
    this.head = null 

    // 初始化free链表
    this.free = 0

    for(let i = 0; i < max - 1; i++){
      this.data[i * 3] = (i + 1) * 3 
    }

    // free链表最后一个节点的next指向null
    this.data[ ( max - 1 ) * 3] = null
  }



  malloc() {
    if(this.free === null) {
      throw 'out of memory'
    }
    const x = this.free

    // 相当于free链表的第一个被删除了，用来存储x
    this.free = this.data[ this.free ]
    return x
  }

  mfree(addr){
    this.data[addr] = this.free
    this.free = addr
  }

  search(key){
    return this.transverse().find(k => k === key)
  }
  
  *transverse() {

    let p = this.head
    
    while(p !== null) {
      yield this.data[p + 1]
      p = this.data[p + 0]
    }
  }


  insert(key){
    const addr = this.malloc()
    this.data[addr] = this.head // node.next = head
    this.data[addr + 2] = null // node.prev = null
    this.data[addr + 1] = key

    // 如果头节点存在
    if(this.head !== null) {
      this.data[ this.head + 2] = addr
    }

    this.head = addr
  }

  delete(addr) {

    /* 维护链表关系 */
    const next = this.data[addr]
    const prev = this.data[addr + 2]

    if(prev !== null) {
      this.data[prev + 0] = next
    }
 
    if(next !== null) {
      this.data[next + 2] = prev
    }

    /* 回收内存 */
    this.mfree(addr)
  }

}


module.exports = ArrayList