
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function () {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
console.log('script end');

/* 
async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，
再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/33

运行顺序：https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7
*/
