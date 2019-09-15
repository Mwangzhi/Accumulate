let methods = require('methods')
let Layer = require('./layer');
let Route = require('./route');
let http = require('http');
let path = require('path');
let url = require('url');
let slice = Array.prototype.slice;
function Router() {
    function router(req, res, next) {
        router.handle(req, res, next);
    }
    Object.setPrototypeOf(router, proto);
    router.stack = [];
    //router.paramCallbacks = {};
    //router.use(init);
    return router;
}
const proto = Object.create(null);
proto.route = function (path) {
    const route = new Route(path);
    const layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}
methods.forEach(function (method) {
    proto[method] = function (path) {
        let route = this.route(path);
        route[method].apply(route, slice.call(arguments, 1));
        return this;
    }
})
proto.handle = function (req, res, out) {
    let idx = 0, self = this, removed = '', slashAdded = false;
    let { pathname } = url.parse(req.url, true);
    function next(){
        if(idx>=self.stack.length){
            return out();
        }
        let layer=self.stack[idx++];
        layer.handle_request(req,res,next);
    }
    next()
}
module.exports = Router;