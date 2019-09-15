/* 
lodash库实现

*/

//防抖+节流

function debounce(func, wait, opts = {}) {
    let maxWait;///////////////////////////////////////////////
    if ('maxWait' in opts) {
        maxWait = opts.maxWait
    }
    let leading = true; //第一次点击时触发
    let trailing = true;//最后一次也要触发
    let lastCallTime;//最后调用的时间
    let timeout;
    let lastThis;//返回函数的this
    let lastArgs;//返回函数的参数
    let lastInvokeTime;///////////////////////////////////////////////
    let shouldInvoke = function (now) {
        let sinceLastTime = now - lastCallTime;
        let sinceLastInvoke = now - lastInvokeTime;
        return lastCallTime === undefined || sinceLastTime > wait || sinceLastInvoke >= maxWait
    }
    //leadingEdge 是否第一次执行
    let invokeFunc = function (time) {
        lastInvokeTime = time;///////////////////////////////////////////////
        func.apply(lastThis, lastArgs)
    }
    //startTimer就是开启了一个定时器
    let startTimer = function (timerExpired, wait) {
        timeout = setTimeout(timerExpired, wait);
    }
    let remainingWait = function (now) {
        return wait - (now - lastCallTime)
    }
    let trailingEdge = function (time) {
        timeout = undefined
        if (trailing) {
            invokeFunc(time)
        }
    }
    let timerExpired = function () {
        let now = Date.now();
        if (shouldInvoke(now)) {
            return trailingEdge(now)
        }
        startTimer(timerExpired, remainingWait(now))
    }
    let leadingEdge = function (time) {
        lastInvokeTime = time;///////////////////////////////////////////////
        if (leading) {
            invokeFunc(time)
        }
        startTimer(timerExpired, wait)
    }
    let debounced = function (...args) {
        lastThis = this;
        lastArgs = args;
        let now = Date.now();
        //判断当前的debounce是否需要执行
        let isInvoking = shouldInvoke(now)
        lastCallTime = now;
        if (isInvoking) {
            if (timeout === undefined) {
                leadingEdge(now);
            }
        }
    }
    return debounced
}
// function logger() {
//     console.log('logger')
// }
// let btn = document.getElementById('btn')
// btn.addEventListener('click', debounce(logger, 1000), false)


















