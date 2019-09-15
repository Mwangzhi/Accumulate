//https://juejin.im/post/5cef46226fb9a07eaf2b7516#heading-16
/* 
javascript 实现一个带并发限制的异步调度器，保证同时最多运行2个任务
*/
class Scheduler {
    constructor() {
        this.parallel_count = 0;
        this.queue = [];
    }
    add(promiseCreator) {
        return new Promise(resolve => {
            this.queue.push({ promiseCreator, resolve });
            if (this.parallel_count < 2) this.begin();
        })
    }
    begin() {
        while (this.parallel_count <= 1 && this.queue.length > 0) {
            let { promiseCreator, resolve } = this.queue.shift()
            promiseCreator().then(() => {
                resolve();
                this.parallel_count--;
                if (this.parallel_count == 0) {
                    return
                }
                this.begin();
            })
            this.parallel_count++
        }
    }
}
const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
})
const scheduler = new Scheduler();
const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order))
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output:2 3 1 4













