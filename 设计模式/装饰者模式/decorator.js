


/* 
装饰者模式能够在不改变对象自身的基础上，在程序运行期间给对象
动态地添加职责。跟继承相比，装饰者是一种更轻便灵活的做法，这是一种“即用即付”的方式，
比如天冷了就多穿一件外套，需要飞行时就在头上插一支竹蜻蜓

装饰者模式将一个对象嵌入另一个对象之中，实际上相当于这个对象被另一个对象包
装起来，形成一条包装链。请求随着这条链依次传递到所有的对象，每个对象都有处理这条
请求的机会。


分离业务代码和数据统计代码，无论在什么语言中，都是 AOP的经典应用之一.

通过数据上报、统计函数的执行时间、动态改变函数参数以及插件式的表单验证这 4个
例子，我们了解了装饰函数，它是 JavaScript中独特的装饰者模式
*/

//   AOP 装饰函数
Function.prototype.before = function (beforefn) {
    var __self = this; // 保存原函数的引用
    return function () { // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply(this, arguments); // 执行新函数，且保证 this 不被劫持，新函数接受的参数
        // 也会被原封不动地传入原函数，新函数在原函数之前执行
        return __self.apply(this, arguments); // 执行原函数并返回原函数的执行结果，
        // 并且保证 this 不被劫持
    }
}
Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
}

/* 
装饰器模式是将一个对象嵌入到另一个对象中，实际上相当于这个对象被另一个对象包装起来，形成一条包装链
请求随着这条链条一次传递到所有的对象，每个对象有处理这个请求的机会
AOP----->面向切片编程。在不改变原代码的情况下，为程序统一添加功能
*/

class Duck {
    constructor() {

    }
    eat(food) {
        console.log(`吃${food}`)
    }
}

class TangDuck {
    constructor() {
        this.duck = new Duck()
    }
    eat() {
        this.duck.eat()
        console.log('Thanks')
    }
}
//-------------------------------------------------------------------


class Coffe {
    make(water) {
        return `${water}+咖啡`
    }
    cost() {
        return 10
    }
}
class MilkCoffe {
    constructor(parent) {
        this.parent = parent
    }
    make(water) {
        return `${this.parent.make(water)}+牛奶`
    }
    cost() {
        return this.parent.cost() + 1
    }
}
class SugarCoffe {
    constructor(parent) {
        this.parent = parent
    }
    make(water) {
        return `${this.parent.make(water)}+糖`
    }
    cost() {
        return this.parent.cost() + 2
    }
}
let coffee = new Coffe()
let milkCoffe = new MilkCoffe(Coffe)
let milksugarCoffe = new SugarCoffe(MilkCoffe)
console.log(milksugarCoffe.make('水') + '=' + milksugarCoffe.cost())

//-------------------------------------------------------------------------
Function.prototype.before = function (beforeFn) {
    let _this = this
    return function () {
        beforeFn.apply(this, arguments)
        return _this.apply(this, arguments)
    }
}
Function.prototype.after = function (afterFn) {
    let _this = this
    return function () {
        afterFn.apply(this, arguments)
        _this.apply(this, arguments)
    }
}
function buy(money, goods) {
    console.log(`花${money}买${goods}`)
}
buy = buy.before(function () {
    console.log(`向媳妇申请1块钱`)
})
buy = buy.after(function () {
    console.log(`把剩下的2毛钱还给媳妇`)
})

