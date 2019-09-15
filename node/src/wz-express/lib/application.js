let http = require('http');
let Router = require('./router');
let methods = require('methods');
let slice = Array.prototype.slice;
function Application() {
    this.settings = {};
    this.engines = {};
}
Application.prototype.lazyrouter = function () {
    if (!this._router) {
        this._router = new Router();
    }
}
Application.prototype.set = function (key, value) {
    if (arguments.length === 1) {
        return this.settings[arguments[0]]
    }
    this.settings[key] = value;
    return this;
}
methods.forEach(method => {
    Application.prototype[method] = function () {
        if (method === 'get') {
            if (arguments.length === 1) {
                return this.set(arguments[0]);
            }
        }
        this.lazyrouter();
        this._router[method].apply(this._router, slice.call(arguments));
    }
})
Application.prototype.listen = function () {
    let self = this;
    let server = http.createServer(function (req, res) {
        function done() {
            res.end('Not Found!')
        }
        res.app = self;
        self._router.handle(req, res, done)
    });
    server.listen.apply(server, arguments)
}
module.exports = Application;