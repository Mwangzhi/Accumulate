
class SyncLoopHook {
    constructor(args) {
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        this.tasks.forEach(task => {
            let ret = undefined;
            do {
                ret = task(...args)
            } while (ret !== undefined)     // while条件为真，继续执行
        })
    }
}
let hook = new SyncLoopHook(['name'])
let total = 0
hook.tap('react', (data) => {
    console.log('react', data)

})
hook.tap('node', (name) => {
    console.log('node', name)
    return ++total === 3 ? undefined : 'continue'
})
hook.tap('node', (name) => {
    console.log('node', name)
})
hook.call('wz')