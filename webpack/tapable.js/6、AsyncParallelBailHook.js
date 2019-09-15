//注册钩子有3中类型：tap、tapAsync、tapPromise
//调用有3中方式：call、callAsync、promise
class AsyncParallelHook {
    constructor(args) {
        this.tasks = []
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        let finalCallback = args.pop()
        let index = 0
        let done = () => {
            index++
            if (index === this.tasks.length) {
                finalCallback()
            }
        }
        this.tasks.forEach(task => {
            task(...args, done)
        })
    }
    tapPromise(name, task) {
        this.tasks.push(task)
    }
    promise(...args) {
        let tasks = this.tasks.map(task => task(...args))
        return Promise.all(tasks);
    }
}
//------------------------Async版本
let hook = new AsyncParallelHook(['name'])
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
let hook = new AsyncParallelHook(['name'])
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