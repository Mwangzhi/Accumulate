/**
 * 堆栈
 */
class Stack{
 
  constructor(max = 1000){
    // 空间
    this.data = new Array(max)

    // 栈顶（栈指针）
    this.top = -1
    this.max = max
  }

  push(x){
    if(this.top === this.max - 1){
      throw 'overflow'
    }
    this.top ++
    this.data[this.top] = x
  }

  pop(){
    if(this.top === -1){throw 'underflow'}
    const x = this.data[this.top]
    this.top --
    return x
  }

  get length(){
    return this.top + 1
  }
}


module.exports = Stack