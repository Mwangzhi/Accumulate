## 引入图片
- 通过 JS引用
- url-loader是对file-loader的增强，它会判断如果说文件的体积小于limit参数指定的值的话。
会返回一个base64的图片字符串


##  文件指纹 
- [name] 代码块的名称 about entry里的key
- [hash] 代码一次编译 不管改多少文件，每次编译都产生同一个新的hash
- [chunkhash] 同一个入口，生成的文件chunkhash都是一样的
- [contenthash] 是基于文件内容生成的，只要谁的内容不变，不管多少编译contenthash一样

## 先preset plugin
- 插件 就是一个个的转换方法 
 - 转换箭头函数的 plugin
 - class-properties plugin 
 - decorators plugin
- preset-env 是插件的集合


//runtime  polyfill
//runtime 一些工具方法， es6 类转译成es5 function 
//polyfill promise set map

/**
AAAA   转换后的第1行第1列，对应源文件script.js的第一行第一列，不对应任务变量
IAAIA  转换后的第1行9列，对应源文件script.js的第一行第9列，对应变量a
CACIC   c这个变量，在转换前"script.js"的第3行第8列，转换后在第一行第3列
/**
