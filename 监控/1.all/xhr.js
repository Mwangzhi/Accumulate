

export default {
    init(cb) {
        let xhr = window.XMLHttpRequest;
        let oldOpen = xhr.prototype.open;
        xhr.prototype.open = function (method, url, async, username, password) {
            this.info = {
                method, url, async, username, password
            }
            return oldOpen.apply(this, arguments)
        }
        let oldSend = xhr.prototype.send;
        xhr.prototype.send = function (value) {
            let start = Date.now();
            let fn = (type) => () => {
                this.info.time = Date.now() - start;
                this.info.requestSize = value ? value.length : 0;
                this.info.responseSize = this.responseText.length;
                this.info.type = type;
                cb(this.info)
            }
            this.addEventListener('load', fn('load'), false)
            this.addEventListener('error', fn('error'), false)
            this.addEventListener('abort', fn('abord'), false)
            return oldSend.apply(this, value)
        }
    }
    //如果window上有fetch，那就类似重写fetch
}