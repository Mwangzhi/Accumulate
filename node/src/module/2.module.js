let fs = require('fs');
let path = require('path');
let vm = require('vm');

function Module(p) {
    this.id = p;
    this.exports = {};
    this.loaded = false;
}
Module.wrapper = ['(function(exports,require,module){', '\n})'];
Module._extensions = {
    '.js': function (module) {
        let script = fs.readFileSync(module.id, 'utf8');
        let fn = Module.wrapper[0] + script + Module.wrapper[1];
        vm.runInThisContext(fn).call(module.exports, module.exports, req, module);
        return module.exports;
    },
    '.json': function (module) {
        return JSON.parse(fs.readFileSync(module.id, 'utf8'));
    },
    '.node': 'xxx'
}
Module._cacheModule = {};
Module._resolveFileName = function (moduleId) {
    let p = path.resolve(moduleId);
    if (!path.extname(moduleId)) {
        let arr = Object.keys(Mdoule._extensions);
        for (let i = 0; i < arr.length; i++) {
            let file = p + arr[i];
            try {
                fs.accessSync(file);
                return file;
            } catch (e) {
                console.log(e);
            }
        }
    } else {
        return p;
    }
}

Module.prototype.load = function (filepath) {
    let ext = path.extname(filepath);
    let content = Module._extensions[ext](this);
    return content;
}
function req(moduleId) {
    let p = Module._resolveFileName(moduleId);
    if (Module._cacheModule[p]) {
        return Module._cacheModule[p].exports;
    }
    let module = new Module(p);
    let content = module.load(p);
    Module._cacheModule[p] = module;
    module.exports = content;
    return module.exports;
}
let a = req('./a.json');

console.log(a);
/**
 1、解析出一个绝对路径
 2、匹配出路径名。.js .json .node
 3、得到一个真实的加载路径，先去缓存查找是否存在
 4、如果不存在，fs.readFileSync()读出文件内容。
 5、将读出的文件内容，加一个闭包，把内容放进去，执行。
 */



















