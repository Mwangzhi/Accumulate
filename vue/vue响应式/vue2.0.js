
//vue2.0中对数组的拦截方法
let oldArrayPrototype = Array.prototype;
let proto = Object.create(oldArrayPrototype);
['push', 'pop', 'shift', 'unshift'].forEach(method => {
    proto[method] = function () {
        updateView();
        oldArrayPrototype[method].call(this, ...arguments)
    }
})

//观察数据
function observer(target) {
    if (typeof target !== 'object' || target == null) return target;
    if (Array.isArray(target)) {
        target.__proto__ = proto;
        // Object.setPrototypeOf(target, proto);
    }
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}
function defineReactive(target, key, value) {
    //value也有可能是个对象，需要递归监听
    observer(value);
    Object.defineProperty(target, key, {
        get() {
            return value;
        },
        set(newValue) {

            if (newValue !== value) {
                updateView();
                value = newValue;
            }
        }
    })
}
function updateView() {
    console.log('view updated');
}
let data = { name: 'wz', money: [1, 2] };
observer(data);
data.name = 'cool'
data.money.push(3)


