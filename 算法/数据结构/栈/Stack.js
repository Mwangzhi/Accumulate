
class Stack {
    constructor(max = 1000) {
        this.max = max
        this.sp = -1
        this.data = Array(max)
        this.size = 0
    }
    push(item) {
        if (this.sp === this.max - 1) {
            throw 'Stack Overflow'
        }
        this.data[++this.sp] = item
        this.size++
    }

    pop() {
        if (this.sp === -1) {
            //throw 'Stack Underflow'
            return null
        }
        this.size--
        return this.data[this.sp--]
    }
}


//学习数据结构-栈，写一个函数`match(str)`，判断一个字符串中的小括号是否匹配。
function match(str) {
    const stack = new Stack()
    for (let c of str) {
        if (c === '(') {
            stack.push('(')
        } else {
            if (stack.pop() !== '(') {
                return false
            }
        }
    }
    return stack.size === 0
}

//=======================================================使用栈来实现队列========================================
/* 
使用数组来模拟栈，尽量使用push、pop方法。不适用shift、unshift，因为这两个方法的复杂度为O(n)。
*/
class Queue {
    constructor() {
        this.s1 = [];
        this.s2 = [];
    }
    //入队
    enqueue(item) {
        this.s1.push(item)
    }
    //出队
    dequeue() {
        if (this.s2.length > 0) {
            return this.s2.pop();
        } else {
            while (this.s1.length > 0) {
                this.s2.push(this.s1.pop());
            }
            return this.s2.pop();
        }
    }
}

let q = new Queue();
q.enqueue(1);
q.enqueue(2);
console.log(q.dequeue())
q.enqueue(3);
console.log(q.dequeue())
q.enqueue(4);
console.log(q.dequeue())
console.log(q.dequeue())