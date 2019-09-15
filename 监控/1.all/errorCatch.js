export default {
    init(cb) {
        //如果是图片报错的话，使用window.addEventListener('error',fn,true)
        // promise 失败了不能通过onerror 捕获promise错误
        window.onerror = function (message, source, lineno, colno, error) {
            let info = {
                message: error.message,
                name: error.name,
            }
            let stack = error.stack;
            let matchUrl = stack.match(/http:\/\/[^\n]*/)[0]
            info.filename = matchUrl.match(/http:\/\/(?:\S*)\.js/)[0]
            let [, row, colume] = matchUrl.match(/:(\d+):(\d+)/);
            info.row = row;
            info.colume = colume
            cb(info)
        }
    }
}
