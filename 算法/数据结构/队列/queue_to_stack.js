// 用两个队列模拟一个栈
// q1 : 用于入栈
// q2 : 用于出栈
class Stack {
    constructor(max) {
        this.q1 = new Queue(max);
        this.q2 = new Queue(max);
    }
    push(x) {
        this.q1.enqueue(x);
    }
    pop() {
        if (this.q1.length > 0) { this.q1.dequeue(); }
        while (this.q2.length) {
            this.q1.enqueue(this.q2.dequeue())
        }
        return this.q1.dequeue();
    }
}