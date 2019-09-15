
class SyncBailHook {
    constructor(args) {
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        let ret, index = 0;
        do {
            ret = this.tasks[index++](...args)
        } while (ret === undefined && index < this.tasks.length)
    }
}
let hook = new SyncBailHook(['name'])
hook.tap('react', (name) => {
    console.log('react', name)
    return 'stop'
})
hook.tap('node', (name) => {
    console.log('node', name)
})
hook.call('wz')