/* 
最简单版本
*/
function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(this, arguments)
        }, wait)
    }
}



/* 
immediate-----第一次是否立即执行，true是，false否
*/

function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        if (immediate) {
            let callNow = !timeout
            if (callNow) func.apply(this, arguments)
        }
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(this, arguments)
        }, wait)
    }
}

