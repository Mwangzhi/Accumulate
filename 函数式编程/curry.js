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
function compose(...functions) {
    return functions.reduce((f, g) => (...args) => f(g(...args)))
}