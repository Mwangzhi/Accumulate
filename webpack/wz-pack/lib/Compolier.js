let fs = require('fs')
let path = require('path')
let babylon = require('babylon')
let t = require('@babel/types')
let traverse = require('@babel/traverse').default;
let generator = require('@babel/generator').default;
let ejs = require('ejs');
let {SyncHook } = require('tapable');
class Compolier {
    constructor(config) {
        this.config = config;
        //需要保存入口文件的路径
        this.entryId;
        //需要保存所有的模块依赖
        this.modules = {}
        this.entry = config.entry;
        this.root = process.cwd();
        this.hooks = {
            entryOption: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook(),
        }
        let plugins = this.config.plugins;
        if (Array.isArray(plugins)) {
            plugins.forEach(Plugin => {
                Plugin.apply(this);
            })
        }
        this.hooks.afterPlugins.call();
    }
    getSource(modulePath) {
        let content = fs.readFileSync(modulePath, 'utf8');
        let rules = this.config.modules.rules;
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            let { test, use } = rule;
            let len = use.length - 1
            if (test.test(modulePath)) {
                function mormalLoader() {
                    let loader = require(use[len--]);
                    content = loader(content)
                    if (len >= 0) {
                        mormalLoader();
                    }
                }
                mormalLoader()
            }
        }

        return content;
    }
    parse(source, parentPath) {//AST
        //babylon
        //@babel-traverse
        //@babel-types
        //@babel-generator
        let ast = babylon.parse(source);
        let dependencies = [];//依赖数组
        traverse(ast, {
            CallExpression(p) {
                let node = p.node;
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value;
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
                    moduleName = './' + path.join(parentPath, moduleName);//
                    dependencies.push(moduleName);
                    node.arguments = [t.stringLiteral(moduleName)]
                }
            }
        });
        let sourceCode = generator(ast).code;
        return {
            sourceCode,
            dependencies
        }
    }
    //构建模块
    buildModule(modulePath, isEntry) {
        //modulePath = D:\E\webpack-dev\src\index.js
        //this.root = D:\E\webpack-dev
        let source = this.getSource(modulePath);
        let moduleName = './' + path.relative(this.root, modulePath);
        if (isEntry) {
            this.entryId = moduleName;//保存入口的名字
        }
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));
        this.modules[moduleName] = sourceCode;

        dependencies.forEach(dep => {
            this.buildModule(path.join(this.root, dep), false);
        })

    }
    emitFile() {
        let main = path.join(this.config.output.path, this.config.output.filename);
        let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
        let code = ejs.render(templateStr, { entryId: this.entryId, modules: this.modules })
        this.assets = {}
        this.assets[main] = code;
        fs.writeFileSync(main, this.assets[main])
    }
    run() {
        this.hooks.compile.call();
        //创建模块依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true);
        //发射一个文件，打包后的文件
        this.hooks.afterCompile.call();
        this.emitFile();
        this.hooks.emit.call();
        this.hooks.done.call();
    }
}
module.exports = Compolier

