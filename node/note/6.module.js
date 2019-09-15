

//循环依赖
/**
a.js
console.log('a 开始');
exports.done = false;
const b = require('./b.js');
console.log('在 a 中，b.done = %j', b.done);
exports.done = true;
console.log('a 结束');

b.js
console.log('b 开始');
exports.done = false;
const a = require('./a.js');
console.log('在 b 中，a.done = %j', a.done);
exports.done = true;
console.log('b 结束');

main.js
console.log('main 开始');
const a = require('./a.js');
const b = require('./b.js');
console.log('在 main 中，a.done=%j，b.done=%j', a.done, b.done);

输出结果
main 开始
a 开始
b 开始
在 b 中，a.done = false
b 结束
在 a 中，b.done = true
a 结束
在 main 中，a.done=true，b.done=true

分析
当 main.js 加载 a.js 时，a.js 又加载 b.js。
此时，b.js 会尝试去加载 a.js。 为了防止无限的循环，
会返回一个 a.js 的 exports 对象的 未完成的副本 给 b.js 模块。 
然后 b.js 完成加载，并将 exports 对象提供给 a.js 模块。
 */


//模块的解析语法
/**
 文件模块
1、根据路径去匹配.js .json .node
2、当没有以 '/'、'./' 或 '../' 开头来表示文件时，这个模块必须是一个核心模块或加载自 node_modules 目录。

目录作为模块
1、去package.json文件里找main字段对应的入口文件
2、如果没有package.json，会找index.js index.node文件

node_modules
1、当前父目录下的node_modules中查找
2、上一级的node_modules中查找，知道根目录

 */
//模块包装器
/**
(function(exports, require, module, __filename, __dirname) {
    // 模块的代码实际上在这里
    });
 */


//module的属性
/**
 id: '.',
  exports: {},
  parent: null,//最先引用本模块的其他模块
  filename: 'c:\\Users\\wz\\Desktop\\high\\src\\module\\2.module.js',
  loaded: false,
  children: [],//本模块引用的其他模块
  paths: //模块查找路径
   [ 'c:\\Users\\wz\\Desktop\\high\\src\\module\\node_modules',
     'c:\\Users\\wz\\Desktop\\high\\src\\node_modules',
     'c:\\Users\\wz\\Desktop\\high\\node_modules',
     'c:\\Users\\wz\\Desktop\\node_modules',
     'c:\\Users\\wz\\node_modules',
     'c:\\Users\\node_modules',
     'c:\\node_modules' ] }
 */