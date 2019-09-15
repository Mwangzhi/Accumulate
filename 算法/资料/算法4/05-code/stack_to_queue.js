const Stack = require('./stack')

// 用两个栈模拟一个队列
// stack1 : 用于入队
// stack2 : 用于出队
class Queue{

  constructor(max){
    this.s1 = new Stack(max)
    this.s2 = new Stack(max)
  }

  enqueue(x){
    this.s1.push(x)
  }

  dequeue(){
    
    if(this.s2.length > 0){return this.s2.pop()}
    while(this.s1.length) {
      this.s2.push(this.s1.pop())
    }

    return this.s2.pop()

  }
}

module.exports = Queue

