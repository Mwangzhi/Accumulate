
class Queue{
    constructor(max=1000){
        this.data=Array(max)
        this.p=0
        this.q=0
        this.size=0
        this.max=max
    }
    enqueue(item){
        if(this.size===this.max){
            throw 'Queue Overflow'
        }
        this.data[this.p++]=item
        this.size++
        if(this.p===this.max){
            this.p=0
        }
    }
    dequeue(){
        if(this.size===0){
            throw 'Queue Underflow'
        }
        const item=this.data[this.q++]
        this.size--
        if(this.q===this.max){
            this.q=0
        }
        return item
    }
}

//=======================================================ʹ��ջ��ʵ�ֶ���========================================
/* 
ʹ��������ģ��ջ������ʹ��push��pop������������shift��unshift����Ϊ�����������ĸ��Ӷ�ΪO(n)��
*/
class Queue {
    constructor() {
        this.s1 = [];
        this.s2 = [];
    }
    //���
    enqueue(item) {
        this.s1.push(item)
    }
    //����
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
