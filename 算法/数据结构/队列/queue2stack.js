function Stack() {
    this.queue = [];
    this.help = []
}
Stack.prototype.push = function (val) {
    this.queue.push(val);
}
Stack.prototype._swap = function () {
    let tmp = this.help;
    this.help = this.queue;
    this.queue = tmp;
}
Stack.prototype.pop = function () {
    if (this.queue.length <= 0) {
        throw new Error('The stack is empty.')
    }
    while (this.queue.length > 1) {
        this.help.push(this.queue.shift());

    }
    let res = this.queue.shift();
    this._swap();
    return res;
}
let s = new Stack();
s.push(1)
s.push(2)
s.push(3)
console.log(s.pop());//3
s.push(4);
console.log(s.pop());//4