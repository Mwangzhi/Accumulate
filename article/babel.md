### babel
### 1、babel是什么
babel是一个JavaScript代码转换器，主要目的是将ES2015+的代码转换成llq或者其他环境识别的代码，主要目的有以下几个：
- 转换语法（babylon）
- 兼容新方法( @babel/polyfill)
- 源码转换(babel-generator)
### 2、babel的基本用法
#### 2-1、通过引入babel核心包使用
安装
```javascript
npm install @babel/core -D
```
使用
```javascript
const babel = require('@babel/core')
babel.transform("code",optionsObject)
```
Babel的核心包提供了一些最基础的API，比如：`babel.transformFile`、`babel.transformFromAst`等等，具体可查看，[这里](https://babeljs.io/docs/en/babel-core)
#### 2-2、通过命令行使用
`@babel/cli`包依赖`@babel/core`，所以需要同时安装这两个包。
```javascript
npm install @babel/core @babel/cli
```
安装完这两个包后，Babel提供了一个`babel`命令，假如现在要
将src文件夹下的js文件编译到lib目录下,执行如下命令：
```javascript
./node_modules/.bin/babel src --out-dir lib
```
或者：
```javascript
npx babel src --out-dir lib
```
当然，在使用命令行时可以给babel传递参数，比如下面这样传递plugins：
```
./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```
或者传递presets
```
./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
```
### 3、插件和预设的区别
Babel核心包并不会去转换代码，核心包只提供一些核心API，真正的代码转换工作由插件或者预设来完成，比如要转换箭头函数，会用到这个`plugin`，`@babel/plugin-transform-arrow-functions`，当需要转换的要求增加时，我们不可能去一一配置相应的plugin，这个时候就可以用到预设了，也就是`presets`。`presets`是`plugins`的集合，一个`presets`内部包含了很多`plugin`。

### 4、polyfill
Babel转换代码分为两部分，第一部分是将新的语法转换为普通语法，比如下面这样，将ES6中的箭头函数转换为ES5：

转换前：
```javascript
let fn = (a, b) => a + b;
```
转换后：
```javascript
var fn = function fn(a, b) {
  return a + b;
};
```
第二部分是，模拟新的API，比如说，我们代码中使用了`Promise`，而目标环境不支持`Promise`，那么Babel会手动实现一个`Promise`，使得目标环境支持`Promise`，这个过程叫做`polyfill`。

看个例子，下面我们创建一个项目，目录如下:

![](https://user-gold-cdn.xitu.io/2019/6/27/16b969289f218b57?w=165&h=169&f=png&s=5842)
- `node_modules` 项目依赖包
- `src` 源文件
- `babel.config.js`  Babel的配置文件
- `package.json`  项目描述文件

`src`文件下有个`index.js`文件，也就是需要编译的文件，内容如下：
```javascript

let count = 1; //let 声明的变量
let fn = (a, b) => a + b;  //箭头函数

let obj = { a: 1, b: 2 }
let b = { ...obj } //解构赋值


let promise = new Promise(() => {  //promise
    resolve(1)
})
function* it() {  //generator 函数
    yield 1;
    yield 2;
    return 3;
}
```
`babel.config.js`内容如下：
```javascript
module.exports = {
    presets: [
    [
        "@babel/env",
            {
                useBuiltIns: "usage",//也可以写entry
                corejs: "2.6.9"
            },
        ]
    ]
}
```
编译后代码如下：
```javascript
"use strict";

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(it);

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var count = 1; //let 声明的变量

var fn = function fn(a, b) {
  return a + b;
}; //箭头函数


var obj = {
  a: 1,
  b: 2
};

var b = _objectSpread({}, obj); //解构赋值


var promise = new Promise(function (resolve) {
  //promise
  resolve(1);
});

function it() {
  return regeneratorRuntime.wrap(function it$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          _context.next = 4;
          return 2;

        case 4:
          return _context.abrupt("return", 3);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
```
编译后的代码量增加了很多，仔细分析大概分为这几部分：

1、`require`语句，大部分是从`core.js`包分别导入具体API对应的`polyfill`。

2、因为使用了`generator`函数，需要去`regenerator-runtime`包中导入对应方法

3、对箭头函数，解构赋值、`generator`函数进行改写。

因为我们在配置文件中配置了这项：
```javascript
{
    useBuiltIns: "usage",
    corejs: "2.6.9"      
},
```
这个配置表示文件内用到了什么API，那么就转换什么API，没用到的不用转，也就是按需加载，所以我们会看到那么多的require语句。

还有一种方法是，不需要在每个文件都进行转换，因为这样会导致代码重复，同一个API在不同的文件都被转换了。

那么我们只需要在入口文件中手动引入`polyfill`即可。如下：
```javascript
import '@babel/polyfill'
```
`polyfill`后，我们就可以使用`Promise`、`WeakMap`、`Array.from`、`Object.assign`、`Array.prototype.includes`等方法了。

有种场景下，我们可能不需要使用这么多方法，比如在编写库或者工具的时候，那我们就可以使用`transform-runtime`来取代`@babel/polyfill`了。
### 5、Babel的配置形式
#### 5-1、babel.config.js
项目根目录下新建`babel.config.js`,内容如下：
```javascript
module.exports = function (api) {
  api.cache(true);

  const presets = [ ... ];
  const plugins = [ ... ];

  return {
    presets,
    plugins
  };
}
```
具体配置，可参考,[这里](https://babeljs.io/docs/en/config-files#project-wide-configuration)
#### 5-2、.babelrc
项目根目录下新建`.babelrc`,内容如下：
```javascript
{
  "presets": [...],
  "plugins": [...]
}
```
具体配置，可参考,[这里](https://babeljs.io/docs/en/config-files#file-relative-configuration)
#### 5-3、package.json
也可以在`package.json`文件中配置
```javascript
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [ ... ],
    "plugins": [ ... ],
  }
}
```
#### 5-1、.babelrc.js
这种方法和`.babelrc`配置的唯一区别就是，可以编写js代码，比如：
```javascript
const presets = [ ... ];
const plugins = [ ... ];

if (process.env["ENV"] === "prod") {
  plugins.push(...);
}

module.exports = { presets, plugins };
```
#### 5-1、cli中的配置
```javascript
babel --plugins @babel/plugin-transform-arrow-functions script.js
```
具体配置，可参考https://babeljs.io/docs/en/babel-cli
#### 5-1、核心包中的配置
```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});
```
具体配置，可参考,[这里](https://babeljs.io/docs/en/babel-core)

### 6、plugin
#### 6-1、插件的写法
插件的写法：
1. 直接写插件名称
```javascript
{
  "plugins": ["babel-plugin-myPlugin"]
}
```
2. 直接写插件路径，可以是相对路径也可以是绝对路径
```javascript
{
  "plugins": ["./node_modules/asdf/plugin"]
}
```
3. 插件缩写，如果插件是以`babel-plugin-`开头的，就可以缩写
```javascript
{
  "plugins": [
    "myPlugin",
    "babel-plugin-myPlugin" // equivalent
  ]
}
```
#### 6-2、插件的顺序
几条规则：
- 1. 插件在预设之前工作，也就是先`plugin`后`preset`。
- 2. `plugin`的顺序是从左到右。first to last
- 3. `preset`的顺序是从右到左。last to first

`preset`的顺序为啥是这样的，官方是这样说的：

This is mostly for ensuring backwards compatibility, since most users list "es2015" before "stage-0"。
#### 6-3、给插件传参数
插件的写法有以下三种，第三种就是传递参数的形式
```javascript
{                 1           2              3
  "plugins": ["pluginA", ["pluginA"], ["pluginA", {}]]
}

```
具体一点就是这样：
```javascript
{
  "plugins": [
    [
      "transform-async-to-module-method",
      {
        "module": "bluebird",
        "method": "coroutine"
      }
    ]
  ]
}
```
preset也一样：
```javascript
{
  "presets": [
    [
      "env",
      {
        "loose": true,
        "modules": false
      }
    ]
  ]
}
```
#### 6-4、编写插件
一个插件长这样:
```javascript
export default function() {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name
          .split("")
          .reverse()
          .join("");
      },
    },
  };
}
```
具体可参考[babel手册](https://github.com/jamiebuilds/babel-handbook)











