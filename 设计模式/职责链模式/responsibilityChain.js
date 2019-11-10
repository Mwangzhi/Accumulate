
/* 



职责链模式的定义是：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间
的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。
职责链模式的名字非常形象，一系列可能会处理请求的对象被连接成一条链，请求在这些对
象之间依次传递，直到遇到一个可以处理它的对象，我们把这些对象称为链中的节点

链中的各个节点可以灵活拆分和重组

场景：
1、axios中的请求、响应拦截器。
2、express、koa中的路由原理。
*/


function order500(orderType) {
    if (orderType == 1) {
        console.log('I handle this request' + orderType);
    } else {
        return 'next'
    }
}
function order200(orderType) {
    if (orderType == 2) {
        console.log('I handle this request' + orderType);
    } else {
        return 'next'
    }
}
function order100(orderType) {
    if (orderType == 3) {
        console.log('I handle this request' + orderType);
    } else {
        return 'next';
    }
}

function Chain(fn) {
    this.fn = fn;
    this.successor = null;
}
Chain.prototype.setNextSuccessor = function (successor) {
    return this.successor = successor;
}
Chain.prototype.passRequest = function () {
    let ret = this.fn.apply(this, arguments);
    if (ret === 'next') {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }
}

// 函数分别包装成职责链的节点
order500 = new Chain(order500);
order200 = new Chain(order200);
order100 = new Chain(order100);

//指定节点在职责链中的顺序
order500.setNextSuccessor(order200);
order200.setNextSuccessor(order100);
//把请求传递给第一个节点
order500.passRequest(1)



// 异步的职责链(节点有权利决定什么时候把请求交给下一个节点)




//========================================================================================================================

// 使用AOP思想实现职责链模式
Function.prototype.after = function (fn) {
    let self = this;
    return function () {
        let ret = self.apply(this, arguments);
        if (ret === 'next') {
            fn.apply(this, arguments);
        }
        return ret;
    }
}
//eat 是职责链中的一个节点
function eat() {
    console.log('吃饭');
    return 'next';
}
//sleep 是职责链中的一个节点
function sleep() {
    console.log('睡觉');
    return 'next';
}
//hit 是职责链中的一个节点
function hit() {
    console.log('打豆豆')
    return 'next';
}

//各个节点组合成一条链条
let start = eat.after(sleep).after(hit);
start()












