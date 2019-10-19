


const toProxy = new WeakMap(); //存放的是代理后的对象
const toRaw = new WeakMap();//存放的是代理前的对象

function trigger() {
    console.log('触发试图更新');
}

function isObject(target) {
    return typeof target === 'object' && target !== null;
}
function reactive(target) {
    if (!isObject(target)) {
        return target;
    }
    if (toProxy.get(target)) { //如果传入的对象已经被代理了，直接返回
        return toProxy.get(target)
    }
    if (toRaw.has(target)) {//如果传入的对象是代理其他对象后的对象，直接返回
        return toRaw.get(target);
    }
    const handlers = {
        set(target, key, value, receiver) {
            if (target.hasOwnProperty(key)) { //如果target是数组的话，需要屏蔽掉length属性。
                trigger()
            }
            return Reflect.set(target, key, value, receiver)
        },
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver);
            if (isObject(target)) {
                return reactive(res);//如果取值是对象的话，需要继续监听
            }
            return res;
        },
        deleteProperty(target, key) {
            return Reflect.deleteProperty(target, key);
        }
    }
    let observed = new Proxy(target, handlers);
    toProxy.set(target, observed);
    toRaw.set(observed, target);
    return observed;
}
let obj = {
    name: 'wangzhi',
    a: [1, 2, 3]
}
let p = reactive(obj);
p.name = 'wz';
console.log(obj);








