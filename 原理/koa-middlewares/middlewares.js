



let fs = require('fs');
let fsPromise = fs.promises;
let path = require('path');
let mime = require('mime')

//=================================koa-static静态文件中间件=================================
function static(pathname) {
    return async (ctx, next) => {
        let requestPath = path.join(pathname, ctx.path);
        try {
            let statObj = fsPromise.stat(requestPath);
            if (!statObj.isFile()) {
                requestPath = path.join(requestPath, 'index.html');
            }
            ctx.set('Content-Type', mime.getType(requestPath));
            ctx.body = fs.createReadStream(requestPath);
        } catch (e) {
            next()
        }
    }
}

//=================================koa-router路由中间件=================================
class Layer {
    constructor(p, callback, method) {
        this.path = p;
        this.callback = callback;
        this.method = method;
    }
    match(path, method) {
        return this.path === path && this.method == method;
    }
}
class Router {
    constructor() {
        this.stacks = [];
    }
    get(path, callback) {
        let layer = new Layer(path, callback, 'GET');
        this.stacks.push(layer);
    }
    compose(stacks, ctx, next) {
        async function dispatch(idx) {
            if (idx === stacks.length) return next();
            let layer = stacks[idx];
            return layer.callback(ctx, () => dispatch(idx + 1));
        }
        return dispatch(0);
    }
    routes() {
        return async (ctx, next) => {
            let { path, method } = ctx;
            let stack = this.stacks.filter(layer => layer.match(path, method));
            this.compose(stack, ctx, next);
        }
    }
}
module.exports = Router;

//=================================koa-bodyParser中间件=================================
let bodyParser = () => {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let arr = [];
            ctx.req.on('data', data => {
                arr.push(data);
            });
            ctx.req.on('end', err => {
                ctx.request.body = {};
                if (ctx.get('content-type') === 'application/x-www-form-urlencoded') {
                    ctx.request.body = require('querystring').parse(Buffer.concat(arr).toString());
                }
                if (ctx.get('content-type' === 'application/json')) {
                    ctx.request.body = JSON.parse(Buffer.concat(arr).toString());
                }
                resolve();
            })
        });
        await next();
    }
}
module.exports = bodyParser;

//=================================koa-better-body中间件=================================
Buffer.prototype.split = function (sep) {
    let arr = [];
    let len = Buffer.from(sep).length;
    let offset = 0;
    let current;
    while (-1 !== (current = this.indexOf(sep, offset))) {
        arr.push(this.slice(offset, current));
        offset = current + len;
    }
    arr.push(this.slice(offset));
    return arr
}
let fs = require('fs');
let uuid = require('uuid');
let path = require('path');
let betterBody = ({ uploadDir }) => {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let arr = [];
            ctx.req.on('data', function (data) {
                arr.push(data);
            });
            ctx.req.on('end', function () {
                let contentType = ctx.get('Content-Type');
                if (contentType.includes('multipart/form-data')) {
                    let boundary = '--' + contentType.split('=')[1];
                    let buffer = Buffer.concat(arr);
                    let lines = buffer.split(boundary).slice(1, -1);
                    ctx.request.fields = {}
                    lines.forEach(line => {
                        let [head, body] = line.split('\r\n\r\n');
                        head = head.toString(); // 字符串
                        let key = head.match(/name="([\s\S]+?)"/)[1];
                        if (head.includes('filename')) {
                            //  文件
                            // body 不一定是完整的数据
                            let content = line.slice(head.length + 4, -2);
                            // content文件的二进制内容
                            let filename = uuid.v4();
                            let pathname = path.join(uploadDir, filename)
                            fs.writeFileSync(pathname, content);
                            let obj = {
                                size: content.length,
                                path: pathname
                            }
                            ctx.request.fields[key] ? ctx.request.fields[key].push(obj) : ctx.request.fields[key] = [obj]
                        } else {
                            let value = body.toString().slice(0, -2);
                            ctx.request.fields[key] = value
                        }
                    });
                    resolve();
                }
            })
        });
        await next();
    }
}
module.exports = betterBody;