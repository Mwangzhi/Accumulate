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





