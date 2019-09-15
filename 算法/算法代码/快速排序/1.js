//
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    };
};
var push = Array.prototype.push.uncurrying();
var obj = { "length": 1, "0": 1 };
push(obj, 2);
console.log(obj);


//没有用到该函数的话，该函数不会像闭包那样占用内存；用到的时候只需执行一次判断，
//之后就不用经历判断而且能够正确的执行。
var addEvent = function (elem, type, handler) {
    if (window.addEventListener) {
        addEvent = function (elem, type, handler) {
            elem.addEventListener(type, handler, false);
        }
    } else if (window.attachEvent) {
        addEvent = function (elem, type, handler) {
            elem.attachEvent('on' + type, handler);
        }
    }
    addEvent(elem, type, handler);
};

//动态创建命名空间
let myApp = {}
myApp.namespace = function (name) {
    let parts = name.split('.')
    let current = myApp
    for (let i in parts) {
        if (!current[parts[i]]) {
            current[parts[i]] = {}
        }
        current=current[parts[i]]
    }
}
