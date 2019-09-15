
//call实现
if (!Function.prototype.call) {
    Function.prototype.call = function (context) {
        context = context ? Object(context) : window
        context.fn = this
        let args = []
        for (let i = 1; i < arguments.length; i++) {
            args.push('arguments[' + i + ']')
        }
        let r = eval('context.fn(' + args + ')')
        delete context.fn
        return r
    }
}

//apply实现
if (!Function.prototype.apply) {
    //apply只能传递两个参数，第二个必须是数组,该数组的每一项会被依次传入函数
    Function.prototype.apply = function (context, args) {
        context = context ? Object(context) : window
        context.fn = this
        if (!args) {
            return context.fn()
        }
        let r = eval('context.fn(' + args + ')')
        delete context.fn
        return r
    }
}

//bind实现
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () { },
            fBound = function () {
                // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
                return fToBind.apply(this instanceof fBound
                    ? this
                    : oThis,
                    // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        // 维护原型关系
        if (this.prototype) {
            // Function.prototype doesn't have a prototype property
            fNOP.prototype = this.prototype;
        }
        // 下行的代码使fBound.prototype是fNOP的实例,因此
        // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
        fBound.prototype = new fNOP();
        return fBound;
    };
}