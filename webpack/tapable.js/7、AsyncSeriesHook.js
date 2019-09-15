//注册钩子有3中类型：tap、tapAsync、tapPromise
//调用有3中方式：call、callAsync、promise
class AsyncSeriesHook {
    constructor(args) {
        this.tasks = []
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        let finalCallback = args.pop()
        let index = 0
        let next = () => {
            if (this.tasks.length === index) {
                return finalCallback()
            }
            let task = this.tasks[index++];
            task(...args, next)
        }
        next()
    }
    tapPromise(name, task) {
        this.tasks.push(task)
    }
    promise(...args) {
        let [first, ...others] = this.tasks
        return others.reduce((p, n) => {
            return p.then(() => n(...args))
        }, first(...args))
    }
}
//------------------------Async版本
let hook = new AsyncSeriesHook(['name'])
let total = 0
hook.tapAsync('react', (name, cb) => {
    setTimeout(() => {
        console.log('react', name)
        cb()
    }, 1000);
})
hook.tapAsync('node', (name, cb) => {
    setTimeout(() => {
        console.log('node', name)
        cb()
    }, 1000);
})
hook.callAsync('wz', () => {
    console.log('all over')
})

//------------------------Promise版本
let hook = new AsyncSeriesHook(['name'])
let total = 0
hook.tapPromise('react', (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name)
            resolve()
        }, 1000);
    })
})
hook.tapPromise('node', (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name)
            resolve()
        }, 1000);
    })
})
hook.promise('wz').then(() => {
    console.log('all over')
})