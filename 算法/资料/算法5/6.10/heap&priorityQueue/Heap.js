/**
 * 最大堆（一种二叉树）
 */

function left(i) {return i * 2 + 1}
function right(i) {return i * 2 + 2}
function parent(i) {return Math.floor( (i - 1) / 2)}
function swap(arr, i, j) {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

class Heap{

  constructor(arr){
    this.data = [...arr]
    this.size = this.data.length
  }

  /**
   * 重构堆
   * [1,2,3,4,5]
   *    1
   *  2   3
   * 4 5
   */
  rebuildHeap() {
    const L = Math.floor(this.size / 2)
    for(let i = L - 1; i >= 0; i--) {
      this.maxHeapify(i)
    }
  }

  isHeap() {
    const L = Math.floor(this.size / 2)
    for(let i = 0; i < L; i++) {
      const l = this.data[ left(i) ] || Number.MIN_SAFE_INTEGER
      const r = this.data[ right(i) ] || Number.MIN_SAFE_INTEGER 
      const max = Math.max(this.data[i], l, r)
      if(max !== this.data[i]) {
        return false
      }
    }
    return true
    
  }

  sort(){
    for(let i = this.size - 1; i > 0; i--) {
      swap(this.data, 0, this.size - 1)
      this.size -- 
      this.maxHeapify(0) 
    }

  }


  /**
   * 假设堆其他地方都满足性质
   * 唯独根节点，重构堆性质
   */
  maxHeapify(i){
    let max = i

    if(i >= this.size) {
      return
    }

    /* 求左右节点中较大的序号 */
    const l = left(i)
    const r = right(i)

    // console.log('size', this.size)
    if(l < this.size && this.data[l] > this.data[max]) {
      max = l
    }

    if(r < this.size && this.data[r] > this.data[max]){
      max = r 
    }
    // 如果当前节点最大，已经是最大堆
    if(max === i) {return}

    swap(this.data, i, max)

    // 递归向下继续执行
    this.maxHeapify(max)

  }

  increaseKey(i, key) {
    if(key < this.data[i]) {
      throw 'new key is smaller than current key'
    }
    this.data[i] = key

    while(i > 0 && this.data[ parent(i) ] < this.data[i]) {
      swap(this.data, i, parent(i))
      i = parent(i)
    }
  }

  /**
   * 取出最大值
   */
  extractMax() {

    if(this.size === 0) {
      throw 'underflow'
    }
    const r = this.data[0]
    swap(this.data, 0, this.size - 1)
    this.size --
    this.maxHeapify(0)
    return r
  }


  /**
   * 向堆中添加元素 
   * @param {*} key 
   */
  add(key) {
    this.data[this.size++] = Number.MIN_SAFE_INTEGER 
    this.increaseKey(this.size - 1, key)
  }
}

module.exports = Heap