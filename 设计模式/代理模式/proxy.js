

/* 
代理和本体接口的一致性

*/

//本体对象只做一件事情，给img节点设置src属性值
var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function (src) {
            imgNode.src = src;
        }
    }
})();
//代理对象对外提供和本体对象一制的接口，负责给本体对象增加其他功能
var proxyImage = (function () {
    var img = new Image;
    img.onload = function () {
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function (src) {
            myImage.setSrc('file:// /C:/Users/svenzeng/Desktop/loading.gif');
            img.src = src;
        }
    }
})();
proxyImage.setSrc('http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');


//==========================使用高阶函数创建代理===============================

function mult() {
    let a = 1;
    for (let val of arguments) {
        a *= val;
    }
    return a;
}
function add() {
    let a = 0;
    for (let val of arguments) {
        a += val;
    }
    return a;
}

//创建缓存代理的工厂
function createProxyFactory(fn) {
    let cache = {};
    return function () {
        let args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = fn.apply(this, arguments);
    }
}



//=========================================================
class Google {
    constructor() { }
    get() {
        return 'google'
    }
}
class Proxy {
    constructor() {
        this.google = new Google()
    }
    get() {
        return this.google.get()
    }
}
let proxy = new Proxy()
let ret = proxy.get()
console.log(ret)

//场景
//1、事件委托、代理跨域、缓存
