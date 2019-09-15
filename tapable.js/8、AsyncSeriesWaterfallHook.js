//注册钩子有3中类型：tap、tapAsync、tapPromise
//调用有3中方式：call、callAsync、promise
class AsyncSeriesWaterfallHook {
    constructor(args) {
        this.tasks = []
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        let finalCallback = args.pop()
        let index = 0
        let next = (err, data) => {
            if (err) return err
            let task = this.tasks[index];
            if (!task) return finalCallback()
            if (index === 0) {
                task(...args, next)
            } else {
                task(data, next)
            }
            index++
        }
        next()
    }
    // tapPromise(name, task) {
    //     this.tasks.push(task)
    // }
    // promise(...args) {
    //     let [first, ...others] = this.tasks
    //     return others.reduce((p, n) => {
    //         return p.then(() => n(...args))
    //     }, first(...args))
    // }
}
//------------------------Async版本
let hook = new AsyncSeriesWaterfallHook(['name'])
let total = 0
hook.tapAsync('react', (name, cb) => {
    setTimeout(() => {
        console.log('react', name)
        cb(null, 'result')
    }, 1000);
})
hook.tapAsync('node', (name, cb) => {
    setTimeout(() => {
        console.log('node', name)
        cb(null, 'aaa')
    }, 1000);
})
hook.callAsync('wz', () => {
    console.log('all over')
})

//------------------------Promise版本
// let hook = new AsyncSeriesHook(['name'])
// let total = 0
// hook.tapPromise('react', (name) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('react', name)
//             resolve()
//         }, 1000);
//     })
// })
// hook.tapPromise('node', (name) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('node', name)
//             resolve()
//         }, 1000);
//     })
// })
// hook.promise('wz').then(() => {
//     console.log('all over')
// })