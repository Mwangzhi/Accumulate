import Reaction from './reaction'
function deepProxy(val, handler) {
    if (typeof val !== 'object') return val
    for (let key in val) {
        val[key] = deepProxy(val[key], handler)//从里往外实现深度代理
    }
    return new Proxy(val, handler())
}
function createObservable(val) {
    let handler = () => {
        let reaction = new Reaction();
        return {
            set(target, key, value) {
                if (key === 'length') return Reflect.set(target, key, value);
                let r = Reflect.set(target, key, value);
                reaction.run()
                return r;
            },
            get(target, key) {
                reaction.collect();
                return Reflect.get(target, key)
            }
        }
    }
    return deepProxy(val, handler)
}


let observable = (target, key, descriptor) => {
    if (typeof key === 'string') {
        let v = descriptor.initializer();
        let reaction = new Reaction();
        v = createObservable(v)
        return {
            enumerable: true,
            configurable: true,
            get() {
                reaction.collect()
                return v;
            },
            set(value) {
                v = value;
                reaction.run()
            }
        }
    }
    return createObservable(target)
}
export default observable





