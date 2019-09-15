//const pathToRegexp = require('path-to-regexp');
function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
    //this.regexp = pathToRegexp(this.path, this.keys = []);
}
Layer.prototype.match = function (path) {
    if (this.path == path) {
        return true;
    }
}

Layer.prototype.handle_request = function (req, res, next) {
    this.handler(req, res, next);
}

module.exports = Layer;






