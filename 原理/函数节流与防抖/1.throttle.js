/* 
最简单版本实现函数节流
当触发函数时，先获取当前时间，与上一次时间做差，
差值如果大于节流时间，执行函数，并更新上一次时间
如果小于节流时间，不做处理
*/
/* 
参考：https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/5
https://github.com/yygmind/blog/issues/38
https://github.com/yygmind/blog/issues/39
https://juejin.im/post/5d253402e51d45108f254284
https://segmentfault.com/a/1190000017227559
*/
function throttle(func, wait) {
    let previous = 0
    return function () {
        let now = Date.now()
        if (now - previous >= wait) {
            func.apply(this, arguments)
            previous = now
        }
    }
}



/* 
加入额外功能的实现
options.trailing-------最后一次是否触发
options.leading-------第一次是否触发,true触发，false不触发
*/
function throttle(func, wait, options) {
    let args, context, previous = 0, timeout
    let later = function () {
        previous = options.leading === false ? 0 : Date.now()
        func.apply(context, args)
    }
    let _throttle = function () {
        args = arguments
        context = this
        let now = Date.now()
        if (!previous && options.leading === false) {
            previous = now
        }
        let remaning = wait - (now - previous)
        if (remaning <= 0) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            func.apply(context, args)
            previous = now
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaning);
        }
    }
    return _throttle
}