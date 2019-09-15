//函数柯里化
const curry = func => {
    const g = (...allArgs) => allArgs.length >= func.length ?
        func(...allArgs) : (...args) => g(...allArgs, ...args)
    return g
}


//函数柯里化
function curry(fn, arg = []) {
    return function () {
        let res = [...arg, ...arguments];
        if (res.length < fn.length) {
            return curry.call(this, fn, res);
        } else {
            return fn.apply(this, res);
        }
    }
}



//组合函数
function fn1(a) { console.log(1 + a); return a }
function fn2(a) { console.log(2 + a); return a }
function fn3(a) { console.log(3 + a); return a }
function fn4(a) { console.log(4 + a); return a }
function fn5(a) { console.log(5 + a); return a }
let todo = [fn1, fn2, fn3, fn4, fn5]

function compose(funcs) {
    let length = funcs.length;
    let index = length;
    while (index--) {
        if (typeof funcs[index] !== 'function') {
            throw new Error('Expected a function')
        }
    }
    return function (...args) {
        let index = 0;
        let result = length ? funcs.reverse()[index].apply(this, args) : args[0];
        while (++index < length) {
            result = funcs[index].call(this, result);
        }
        return result
    }
}

function compose(funcs) {
    if (funcs.length === 0) {
        return arg => arg;
    }
    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
    // return funcs.reduce((a, b) => (...args) => b(a(...args)))
}
compose(todo)('aa')