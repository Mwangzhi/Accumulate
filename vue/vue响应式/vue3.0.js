let toProxy = new WeakMap();//放置的是原对象
let toRaw = new WeakMap();//被代理过的对象：原对象
function isObject(val) {
    return typeof val === 'object' && val !== null;
}
function hasOwn(target, key) {
    return target.hasOwnProperty(key);
}
function reactive(target) {
    return createReactiveObject(target);
}
function createReactiveObject(target) {
    //Reflect会替代掉object上的方法，有返回值，不会报错
    if (!isObject(target)) return target;
    // 如果对象A被代理后的对象是B，那么以后无论是再次去代理A，还是B，都直接返回
    let proxy = toProxy.get(target);
    if (proxy) return proxy;
    if (toRaw.get(target)) return target;
    let baseHandler = {
        get(target, key, receiver) {
            let result = Reflect.get(target, key);
            track(target, key, effect);//如果目标上的这个key变化了，重新让数组中的effect执行即可
            //多层代理通过get方法实现
            return isObject(result) ? reactive(result) : result;
        },
        set(target, key, value, receiver) {
            //如果修改的是length，那么屏蔽掉
            let hasKey = hasOwn(target, key);
            let oldValue = target[key];
            if (!hasKey) {
                trigger(target, 'add', key);
            } else if (oldValue !== value) {
                trigger(target, 'set', key);
            }
            let res = Reflect.set(target, key, value, receiver);
            return res;
        },
        deleteProperty(target, key) {
            let res = Reflect.deleteProperty(target, key);
            return res;
        }
    }
    let observerd = new Proxy(target, baseHandler);
    toProxy.set(target, observerd);
    toRaw.set(observerd, target);
    return observerd;
}

let activeEffectStack = [];
let targetsMap = new WeakMap();
function track(target, key) {
    let effect = activeEffectStack[activeEffectStack.length - 1];
    if (effect) {
        let depsMap = targetsMap.get(target);
        if (!depsMap) {
            targetsMap.set(target, depsMap = new Map())
        }
        let deps = depsMap.get(key);
        if (!deps) {
            depsMap.set(key, deps = new Set());
        }
        if (!deps.has(effect)) {
            deps.add(effect);
        }
        //动态创建依赖关系
    }
}
function trigger(target, type, key) {
    let depsMap = targetsMap.get(target);
    if (depsMap) {
        let deps = depsMap.get(key);
        if (deps) {
            deps.forEach(effect => {
                effect();
            })
        }
    }
}
function effect(fn) {
    let _effect = createReactiveEffect(fn);
    _effect();//默认先执行一次
}
function createReactiveEffect(fn) {
    let effect = function () {
        return run(effect, fn);//运行 1、让fn执行 2、将effect存到栈中
    }
    return effect;
}
function run(effect, fn) {
    try {
        activeEffectStack.push(effect);
        fn();
    } finally {
        activeEffectStack.pop();
    }
}

let proxy = reactive({ name: 'wz' })
//effect会被执行两次，默认先执行一次，之后依赖的数据变化了，会再次执行
effect(() => {
    console.log(proxy.name);
})
proxy.name = 'cool'














