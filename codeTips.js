/* 
一些约定：
KJ:框架简称
YH：代表用户，也就是使用框架的人，也就是程序员，程序猿，加班狗、苦逼男。
*/

/* 
封装函数时，规定回调函数，
来让用户决定一些事情，
poll函数内部会找到数组中最小的那一项，
至于最小指的是什么，可以通过回调函数来让用户决定。
*/
function poll(arr, prediction) {
    if (arr.length === 0) return null;
    let min = prediction(arr[0]);
    let index = 0;
    for (let i = 1; i < arr.length; i++) {
        let tem = prediction(arr[i]);
        if (tem < min) {
            min = tem;
            index = i;
        }
    }
    return arr.splice(index, 1)[0]
}
poll([1, 2, 3, 4], x => x);
poll([{ name: 'a', val: 1 }, { name: 'b', val: 2 }], x => x.val)
//========================================================================================================

let tasks = [fn1, fn2, fn3, fn4]
//1
tasks.forEach(task => task())
//2
let i = -1, ret;
do {
    i++;
    ret = tasks[i]();
} while (!ret)
//3
let [first, ...tasks] = tasks;
tasks.reduce((ret, task) => task(ret), first());
//4
tasks.forEach(task => {
    let ret = true;
    do {
        ret = task();
    } while (ret === true || !(ret === undefined))
})

//异步玩法
//1
let done = function () {
    if (++i === tasks.length) {
        callback()
    }
}
tasks.forEach(task => task(done));
//2
let promises = tasks.map(task => task());
return Promise.all(promises)
//3
function next() {
    let task = tasks[index++];
    if (task) {
        task(next);
    } else {
        finalCallback();
    }
}
//4
let [first, ...tasks] = tasks;
tasks.reduce((a, b) => {
    return a.then(() => b());
}, first())
//5
function next(err, data) {
    if (err) return callback(err);
    let task = tasks[i++];
    if (task) {
        if (i === 0) {
            task(next);
        } else {
            task(data, next);
        }
    } else {
        callback(err, data);
    }
}











//========================================================================================================









//========================================================================================================








//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================









//========================================================================================================