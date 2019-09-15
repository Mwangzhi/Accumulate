
本篇文章解答了60多道关于`webpack`的问题，答案有详细有简单，时间关系，有的问题还未做出解答，后续会补上，持续更新。如果答案有不对的地方，请轻拍。
### 1、全局安装和本地安装，开发依赖和项目依赖有什么区别
#### 1-1、全局安装
全局安装`webpack`，意味着`webpack`包被安装到npm的全局包目录里了。<br>
查看`npm`全局包位置：
```javascript
npm root -g
```
**附加点`npm`的知识：**<br>

查看`npm`配置信息：
```javascript
npm config ls
```
查看`npm`下载源：
```javascript
npm config get registry
```
查看`npm`安装目录：
```javascript
npm config get prefix
```
这里假设通过命令`npm config get prefix`获取到的路径为`C:\Users\wz\AppData\Roaming\npm` ,为了方便起见，用`A`代替`C:\Users\wz\AppData\Roaming`<br>
通过这个目录可以获取到以下信息：<br>
- 1、`npm`全局配置文件(`A\npm\etc`)
- 2、全局安装的包(`A\npm\node_modules`)
- 3、全局命令(npx link生成的命令)(`A\npm`)
- 4、npm缓存(`A\npm-cache`)
#### 1-2、本地安装
本地安装`webpack`，`webpack`包被安装到了项目根目录下的`node_modules`里了。
#### 1-3、开发依赖
开发依赖，指的是只有在项目开发、编译、打包、压缩等过程才会用到的包，一旦文件成功产出，就不再需要他们了，比如：`less-loader`、`webpack`等等。
#### 1-4、项目依赖
项目依赖，指的是从开始编写项目到项目上线以后都需要的包，比如：`vue`、`axios`等等。
### 2、使用webpack需要安装哪些模块
需要安装：
1. `webpack`（`webpack`核心包）
2. `webpack-cli`（`webpack`命令行工具，依赖于`webpack`核心包）
### 3、webpack默认配置文件(2种)的名字是什么
`webpack`默认配置文件：<br>
第一种：`webpack.config.js`<br>
第二种：`webpackfile.js`

`webpack`源码中和配置相关的代码，位置：`webpack/bin/convert-argv.js`
```javascript
//...
//从这里可以看出webpack的2中配置文件
var defaultConfigFiles = ["webpack.config", "webpackfile"].map(function(filename) {
		return extensions.map(function(ext) {
			return {
				path: path.resolve(filename + ext),
				ext: ext
			};
		});
	}).reduce(function(a, i) {
		return a.concat(i);
	}, []);

//...
```
### 4、webpack打包后的结果为什么可以在浏览器中执行
为什么会在浏览器里执行，就要从`webpack`打包后的文件中去找答案了。<br>
搭建一个简单的项目，只安装`webpack`这个包，项目目录如下：<br>

![](https://user-gold-cdn.xitu.io/2019/7/16/16bf899d402ada46?w=236&h=179&f=png&s=6766)
`index.js`如下：
```javascript
function foo() {
    console.log(window.localStorage)
}
module.exports = { foo }
```
`webpack.config.js`如下：
```javascript
module.exports = {
    mode:'development',
    entry: './src/index.js',
    output: {
        path: require('path').resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    } 
}
```
在命令行执行`webpack`命令后，打包后的文件内容，经过删减，总体"框架"代码如下：
```javascript
    (function (modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;

            }
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}

            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = true;
            return module.exports;

        }
        return __webpack_require__("./src/index.js");
    })({
        "./src/index.js": (function (module, exports) {
            eval(/* ... */)
        })
    })
```
分析以上代码：<br>
1、总体是一个自执行函数,双括号形式。
```javascript
(function(modules){/* ... */})({})
```
> 一个自执行函数当然可以在浏览器中执行了。

2、自执行函数的函数体内，定义了模块缓存对象`installedModules`，定义了模块加载方法`__webpack_require__`,这个`__webpack_require__`方法就是为浏览器量身打造的，作用相当于`node`中的`require`方法。`__webpack_require__`方法的逻辑也不难理解，首先通过模块名(其实就是一个路径)去模块缓存对象上查找，找不到的话，就新建一个模块`module`并缓存到`installedModules`上，然后通过模块名找到对应的模块函数，执行它，并将`module`等参数传入，最后返回模块导出对象` module.exports`。这段代码建议仔细看看<br>
3、自执行函数的参数。该参数是一个对象，类似下面这样：
```javascript
{
    "./src/index.js": (function (module, exports) {eval(/* ... */)})
}
```
> 该对象的键是一个路径字符串，其实就是我们调用require方法时传入的模块路径；
值为一个接收`module`和`exports`参数的函数，函数体内是一个包裹着一堆字符串代码的`eval`函数，这一堆字符串代码就是我们写的代码。可见，`webpack`为了让我们的代码能够在浏览器里执行，做了多少工作。<br>

[参考文章](https://zhuanlan.zhihu.com/p/25954788)
### 5、`webpack`有几种模式，对应模式的作用
`webpack`有3种模式：
1. `development`
2. `production`
3. `none`

详情可参考[这篇文章](https://juejin.im/post/5bc80e09f265da0ac07c84ed#heading-11)
### 6、配置执行命令的脚本在`package.json`中如何配置
在`package.json`文件中的`script`字段里配置，如下，我们配置3条命令，分别为`dev`、`pro`、`start`：
```json
{
  "name": "l",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev":"",   //dev命令
    "pro":"",   //pro命令
    "start":""  //start命令
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.35.3"
  }
}
```
配置完成后，就可以在项目的命令行里执行以下命令了：
```
npm run dev

npm run pro

npm run start
```
### 7、如何指定`webpack-dev-server`的启动目录
修改和`webpack-dev-server`有关配置的`contentBase`选项。
```javascript
let path = require('path')
module.exports = {
    mode:'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'bundle.js'
    },
    devServer: {
        port: 8888,//监听的端口号
        progress: true,//启动打包进度显示
        contentBase: path.join(__dirname, 'dist'),//这里指定启动目录
        compress: true //启动压缩
    }
}
```
关于`webpack-dev-server`的更多配置，点击[这里](https://webpack.js.org/configuration/dev-server/#devserver)<br>
从打包的过程也可以看出`webpack-dev-server`的启动目录，如下：<br>

![](https://user-gold-cdn.xitu.io/2019/7/16/16bf89dc16fccf7e?w=752&h=199&f=png&s=19757)
### 8、如何压缩产生的html文件
使用`html-webpack-plugin`插件，配置如下：
```javascript
    plugins: [
        new HtmlWebpackPlugin({
            template: './index1.html',
            filename: 'main.html',
            minify: {
                collapseWhitespace: true,//移除空格
                removeAttributeQuotes:true//移除属性的双引号
            }
        })
    ]
```
[官方](https://github.com/jantimon/html-webpack-plugin#options)说如果模式为`production`的话，`minify`选项会被默认设置成`true`，产出的`HTML`文件会自动压缩，大家可以试试，我尝试的不行。<br>
`minify`的配置选项有很多，感兴趣可以点[这里](https://github.com/kangax/html-minifier#options-quick-reference)查看更多。<br>
其实，`html-webpack-plugin`可以压缩`HTML`文件，内部是依赖的是这个库`html-minifier`,这个压缩`HTML`的库也可以这样使用：
```javascript
var minify = require('html-minifier').minify;
var result = minify('<p title="blah" id="moo">foo</p>', {
  removeAttributeQuotes: true
});
result; // '<p title=blah id=moo>foo</p>'
```
关于`html-minifier`的更多信息，[这里](https://github.com/kangax/html-minifier#options-quick-reference)
### 9、如何解决打包后缓存的问题
`JavaScript`文件解决方法：<br>
第一种：<br>
让文件名称带有`hash`字符串,这样每次打包`js`文件时，只有内容有变化，`hash`字符串就会发生变化，比如下面：
```javascript
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].bundle.js'
    },
```
这里打包后的文件名称为`main.d3a5dd20.bundle.js`。<br>
第二种：<br>
`html-webpack-plugin`的配置项`hash`置为`true`，这样打包后的`js`文件在插入`html`文件后会以`?`开始添加`hash`字符串。如下：
```javascript
    plugins: [
        new HtmlWebpackPlugin({
            template: './index1.html',
            filename: 'main.html',
            hash:true
        })
    ]
```
这里打包后的文件名称如下：<br>
```javascript
<body>
    <h1>This is a title</h1>
<script type="text/javascript" src="main.js?d3a5dd204b4d1b64170c"></script>
</body>
```
### 10、webpack中的loader是干什么的
`loader`的作用是对源代码进行转换，`webpack`只认识`js`、`json`2种文件，其他类型的文件，比如`css`、`img`、`less`等等，只能依靠`loader`去解析转换了。<br>
官方解释，[这里](https://webpack.js.org/concepts/#loaders)
### 11、css-loader和style-loader的作用
`css-loader`主要处理`css`文件中`@import`和`url()`语法的。[官方文档](https://webpack.js.org/loaders/css-loader/)<br>
`style-loader`主要作用是将`css`样式以`style`标签的形式插入到页面中。[官方文档](https://webpack.js.org/loaders/style-loader/)
### 12、请说出loader的特点
1. 第一个`loader`要返回`js`脚本
2. 每个`loader`只做一件事情，为了使`loader`在更多场景下链式调用
3. 每一个`loader`都是一个`node`模块
4. `loader`有同步的，也有异步的
5. `loader`有两个执行阶段，`pitch`、`normal`

[官网文档](https://webpack.js.org/api/loaders/#pitching-loader)<br>
`loader`的执行顺序比较讲究，
如下图所示：

![](https://user-gold-cdn.xitu.io/2019/7/16/16bf8a2176e9579f?w=922&h=819&f=png&s=53495)

### 13、loader有几种写法
配置文件写法、行内`loader`写法、命令行写法3种<br>


**配置文件写法：**<br>
就是将配置信息写到`webpack.config.js`，写法又有以下几种：
#### 13-1、直接写`loader`
```javascript
module.exports={
    module:{
        rules:[
            {
                test: /.js$/,
                loader: 'my-loader',
                exclude: /node_modules/
            },
        ]
    }
}
```
#### 13-2、使用`use`，字符串形式
```javascript
module.exports={
    module:{
        rules[
             {
                test: /.js$/,
                use: 'my-loader',//直接传递字符串
                exclude: /node_modules/
            },
        ]
    }
}
```
#### 13-3、使用`use`，对象形式
```javascript
module.exports={
    module:{
        rules[
             {
                test: /.js$/,
                use: {  //对象形式，可以给loader传递参数
                    loader:'my-loader',
                    options:{}//这里传递参数给loader
                }
                exclude: /node_modules/
            },
        ]
    }
}
```
#### 13-4、使用`use`，数组形式
数组内的每一项可以为字符串，也可以是对象。
```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /.js$/,
                use: [
                    'my-loader1',//字符串形式
                    { loader: 'my-loader2', options: {} }//对象形式
                ],
                exclude: /node_modules/
            },
        ]
    }
}
```
**行内`loader`写法：**<br>
多个`loader`之间用`!`分割。
```javascript
let something=require('loader2!loader1!./profile.js')
```
行内`loader`可添加前缀，代表当前文件是否交由其他`loader`处理:
- `-!` 表示不会让文件再去通过 `pre+normal` `loader`处理了
- `!` 表示不会让`normal` `loader`处理了
- `!!` 该文件只会让行内`loader`处理
```javascript
let a = require('inline-loader!./a') // !分割，inline-loader就是行内loader
let a = require('-!inline-loader!./a') // -!表示不会让文件再去通过 pre+normal loader处理了
let a = require('!inline-loader!./a') // !  表示不会让normal loader处理了
let a = require('!!inline-loader!./a') // !! 该文件只会让行内loader处理
```
**命令行写法：**
```javascript
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```
### 14、loader的默认顺序是怎样的
**从右向左，从下到上**
```javascript
{
    test: /\.js$/,
    use: ['loader3', 'loader2', 'loader1'] 
}
```
以上`loader`执行顺序为 `loader1`---> `loader2`--->`loader3`

```javascript
{
    test: /\.js$/,
    use: {
        loader:'loader3'
    }
},
{
    test: /\.js$/,
    use: {
        loader: 'loader2'
    }
},
{
    test: /\.js$/,
    use: {
        loader: 'loader1'
    }
}
```
以上`loader`执行顺序为 `loader1`--->`loader2`--->`loader3`<br>

### 15、使用loader时如何传递参数
第一种：在配置文件中传递参数
```javascript
module.exports={
    module:{
        rules[
             {
                test: /.js$/,
                use: {  //对象形式，可以给loader传递参数
                    loader:'my-loader',
                    options:{}//这里传递参数给loader
                }
                exclude: /node_modules/
            },
        ]
    }
}
```
第二种：行内`loader`传递参数的方法
```javascript
let foo = require('expose-loader?$!./a.js')
```
### 16、如何控制loader的执行顺序
`loader`的默认顺序是**从右向左，从下到上**，不过可以通过`enforce`字段来打破这种顺序。<br>
`enforce`有两个取值：`pre`代表第一个执行。`post`代表最后一个执行<br>
有如下`loader`配置：
```javascript
            {
                test: /.js$/,
                use: 'loader1.js',
                exclude: /node_modules/,
                enforce: 'pre',//代表loader1首先被执行
            },
            {
                test: /.js$/,
                use: 'loader2.js',
                exclude: /node_modules/
            },
            {
                test: /.js$/,
                use: 'loader3.js',
                exclude: /node_modules/
            },
            {
                test: /.js$/,
                use: 'loader4.js',
                exclude: /node_modules/,
                enforce: 'post'//代表loader4最后被执行
            }
```
如果没有配置`enforce`字段，执行顺序为：loader4--->loader3--->loader2--->loader1<br>
如果配置了`enforce`字段，执行顺序为：loader1--->loader3--->loader2--->loader4<br>
注意：没有配置`enforce`字段的`loader`默认为`normal`，按照默认顺序执行.<br>
如果文件在`require`的时候用到了行内`loader`的话，执行顺序如下：<br>
`pre`--->`normal`--->`inline`--->`post`
### 17、如何指定loader想要处理的js文件
思考中...
### 18、常见的css预处理器有哪些，对应的loader有哪些
`css`预处理器：`less`、`sass`、`stylus`<br>
对应的`loader`：`less-loader`、`sass-loader`、`stylus-loader`
### 19、如何实现`css`样式抽离
安装插件：
```javascript
npm install mini-css-extract-plugin -D
```
配置文件：
```javascript
{
     module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,//使用插件loader
                },
                    'css-loader'
                ]
            },

        ]
    },
    plugins: [
        //添加插件实例
        new MiniCssExtractPlugin({
            filename: 'index.css'
        })
    ]
}
```
`mini-css-extract-plugin`[更多用法](https://webpack.js.org/plugins/mini-css-extract-plugin/)
### 20、如何实现自动添加浏览器前缀
安装包：
```javascript
npm install postcss-loader autoprefixer -D
```
项目根目录下新建文件`postcss.config.js`,内容如下：
```javascript
module.exports = {
    plugins: [require('autoprefixer')]
}
```
`webpack.config.js`配置：
```javascript
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                },
                    'css-loader',
                    'postcss-loader'//这里加入了新的loader
                ],
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },

        ]
    }
```
### 21、抽离css后如何实现css压缩
安装包：
```javascript
npm install optimize-css-assets-webpack-plugin -D
```
`webpack.config.js`配置：
```javascript
{
        plugins: [
        new OptimizeCSSAssetsPlugin()
    ]
}
```
### 22、压缩js需要使用什么插件
安装包：
```javascript
npm install uglifyjs-webpack-plugin --save-dev
```
`webpack.config.js`配置：
```javascript
module.exports = {
  optimization: {
    minimizer: [ new UglifyJsPlugin() ],
  },
};
```
或者:
```javascript
{
        plugins: [
        new UglifyJsPlugin()
    ]
}
```

`uglifyjs-webpack-plugin`[官方文档](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/)
### 23、想把es6转化成es5需要哪些模块
```javascript
npm install @babel/core @babel/preset-env babel-loader -D
```
### 24、babel-loader和@babel/core的关系
`@babel/core`是核心包，提供基础的API服务。`babel-loader`依赖`@babel/core`
### 25、@babel/plugin-proposal-plugin-properties和@babel/plugin-proposal-decorators作用是什么
### 26、@babel/plugin-transform-runtime,@babel/runtime,@babel/polyfill区别是什么
[参考1](https://juejin.im/post/5c21b584e51d4548ac6f6c99)<br>
[参考2](https://juejin.im/post/5c19c5e0e51d4502a232c1c6)
### 27、如何对js代码进行校验
可以使用`eslint`包对`js`代码进行校验。<br>
安装包：
```javascript
npm i eslint eslint-loader babel-eslint -D
```
新建`eslint`配置文件`.eslint.js`:
```javascript
module.exports = {
    root: true,
    //指定解析器选项
    parserOptions: {
        sourecType: 'module'
    },
    //指定脚本执行的环境
    env: {
        browser: true
    },
    //启用的规则及其各自的错误级别
    rules: {
        "semi": "error",//语句强制分号结尾
        "indent": ["error",4],//缩进风格
        "quotes":["error","double"]//引号类型
    }
}
```
`webpack.config.js`
```javascript
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        fix: true
                    },

                },
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/,
            }
        ]
    }
```
`eslint`[官网文档](https://eslint.org/docs/user-guide/configuring)

### 28、请说下暴露变量的三种方式
暴露变量其实就是暴露到全局，也就是挂在到`window`上。<br>
**第一种:**<br>
安装包`expose-loader`
```javascript
npm install expose-loader -D
```
在入口文件(`webpack.config.js`中的`entry`)中使用`expose-loader`，这种方式属于内联`loader`。<br>

```javascript
import $ from 'expose-loader?$!jquery'
console.log(window.$)
```
- ! --->将`loader`和包隔开符号
- ? --->给`expose-loader`传递参数
- \$ --->暴露的全局变量命名为\$

当然也可以不使用内联`loader`：<br>
第一步：入口文件正常引入：<br>
```javascript
import $ from 'jquery'
console.log(window.$)
```
第二步：在`webpack.config.js`配置文件中配置
```javascript
rules: [
            {
                test: require.resolve('jquery'),
                use: 'expose-loader?$'
            }
        ]
```
**第二种:**<br>
在每个模块中注入`$`,注意是每个模块都有一个`$`，但是这个`$`并不是全局的。<br>
在`webpack.config.js`配置文件中配置
```javascript
plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
```
然后模块中可以直接使用`$`<br>
**第三种:**<br>
这种方式叫引入不打包。在`html`文件中引入`jquery`,这里以`jquery`的`cdn`为例:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
    <script src="../dist/bundle.js"></script>
</head>

<body>

</body>

</html>
```
注意：如果使用了这种方式，就不要在js文件内在引入jquery了，否则会重复打包。如果非要引入，那就修改一下`webpack.config.js`：
```javascript
module.exports = {
    //...
    externals: {
        jquery: '$'//webpack打包时，会忽略掉jquery
    },
    //...
}
```
### 29、ProvidePlugin会将提供的变量挂载在window上吗
不会,官方文档没有明说，但是有句话的潜台词表明了不会。哪句话呢，友情提示：Whenever the identifier is encountered as free variable in a module...<br>
参考[官方文档](https://webpack.js.org/plugins/provide-plugin/)
### 30、如何在webpack中处理图片模块
先说一下，使用图片的几种方式。
- js中创建图片来引入
- 在css中引入
- 在html文件中用img标签引入
#### 30-1、js中创建图片来引入
使用方式：<br>
安装包`file-loader`
```javascript
npm install file-loader -D
```
`js`文件内：
```javascript

import logo from '../logo.png'

//file-loader 默认会在内部生成一张图片到build目录下，被导入的图片在js文件内是一个hash字符串
console.log(logo)//19470b4db4deed52a8ba081c816e8f0d.png

let image = new Image()

image.src = logo
```
`webpack.config.js`文件内配上相应的`loader`
```javascript
module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
```
#### 30-2、在css中引入
使用方式：<br>
安装包`style-loader`、`css-loader`,当然还可以安装`css`预处理包
```javascript
npm install style-loader css-loader -D
```
css文件内：
```javascript
body{
    background: url("../logo.png")
}
```
`webpack.config.js`文件内配上相应的`loader`
```javascript
module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
```
#### 30-3、在html文件中用img标签引入
使用方式：<br>
安装包`html-withimg-loader`
```javascript
npm install html-withimg-loader -D
```
`html`文件内：
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="../dist/bundle.js"></script>
</head>

<body>
    <img src="./logo.png" alt="">
</body>

</html>
```
`webpack.config.js`文件内配上相应的`loader`
```javascript
module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-withimg-loader'
            },
        ]
    },

```
### 31、webpack打包时如何处理html的img
使用`html-withimg-loader`包来处理html的img。
### 32、webpack打包时如何把图片变为base64
安装包`url-loader`.
```javascript
npm install url-loader -D
```
`webpack.config.js`文件内配上相应的`loader`
```javascript
module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 200 * 1024
                    }
                }
            },
        ]
    },

```
当图片小于设定的大小(K)的时候，用`base64`来转化，否则用`file-loader`产生真实的图片。
### 33、file-loader和url-loader的关系
他俩其实没有必然联系，只能说可以搭配起来一起工作。`url-loader`只能将图片解析成`base64`，当图片大小超过了限制，`url-loader`就会把解析图片的工作交给其他工具(默认是`file-loader`),当然，当图片大小超过了限制，而我们想用其他工具来处理图片，可以通过参数来控制：
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'responsive-loader',//当图片大小超过8K，用responsive-loader处理
              limit: 8*1024,
            },
          },
        ],
      },
    ],
  },
};
```
可以参考篇幅不长的[官方文档](https://www.npmjs.com/package/url-loader)
### 34、publicPath的作用是什么
`publicPath`指定的路径会被作为前缀添加到所有的`url`上。这里的`url`指的是：<br>
- `html`文件中的`link`标签，`script`标签、`img`标签
- `css`中的带有文件引入的属性等。比如：`background:url()`

一般当静态资源放在CDN时，`publicPath`会指定CDN的路径。<br>
[官方文档](https://webpack.js.org/configuration/output/#outputpublicpath)
### 35、如何配置多页面应用
配置多页面就需要配置`webpack`的多入口。
```javascript
module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js',//入口1，main.js
        index: './src/index.js',//入口2，index.js
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            chunks: 'main',//这里的main和entry里的main属性需要保持一致
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            chunks: 'index',//这里的index和entry里的index属性需要保持一致
            filename: 'main.html'
        })
    ]
}

```
[官方文档](https://webpack.js.org/configuration/entry-context/#entry)
### 36、如何在html文件指定引入某个js文件
### 37、`source-map`和`eval-source-map`的区别
这个配置主要是`debug`用的，配置选项有很多，这里挑选4个说明。
- `source-map` 生成`map`文件，定位到行列
- `eval-source-map` 不生成`map`文件，定位到行列
- `cheap-module-source-map` 生成`map`文件，定位到行
- `cheap-module-eval-source-map` 不生成`map`文件，定位到行

[官方文档](https://webpack.js.org/configuration/devtool/#devtool)
### 38、如何实时编译打包处的文件
在webpack配置文件中新增如下配置信息：
```javascript
module.exports = {
    mode: 'development',
     //开启实时编译
    watch: true,
     //实时编译的配置选项
    watchOptions: {
        ignored: /node_modules/，
        poll:1000,//每秒询问文件变更的次数
        aggregateTimeout:500//防止重复保存频繁重新编译，500毫秒内重复保存不打包
    }
}
```
### 39、aggregateTimeout:500的作用是什么
当检测文件不再发生变化，会先缓存起来，等待一段时间后，再通知监听者，这个等待时间通过`aggregateTimeout`配置。
### 40、`bannerPlugin`的作用
`bannerPlugin`的作用是在产出的资源文件头部添加信息，比如：添加作者、版本号等信息。
```javascript
let webpack=require('webpack')
module.exports={
    //...
    plugins: [
        new webpack.BannerPlugin('author:wangZhi')
    ],
    //...
}
```
产出的文件头部如下所示：<br>
css
```css
/*! author:wangZhi */
body{
    background:red;
}
```
js
```javascript
/*! author:wangZhi */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
```
### 41、`webpack`如何配置代理
首先启动一个`web`服务，配置如下：
```javascript
var path = require('path');

module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
```
然后配置代理:
```javascript
proxy: {
            '/api': {//以/api开头的请求会被代理到'https://other-server.example.com'
                target: 'https://other-server.example.com',
                pathRewrite: {
                    '^/api': ''//以/api开头的路径会被替换成''
                }
            }
        }
```
[官方文档](https://webpack.js.org/configuration/dev-server/#devserverproxy)
### 42、`before`函数中的`app`有什么作用
`webpack-dev-server`是依靠`express`启动一个`web`服务的，配置中的`app`就是`express`中的`app`，有了`app`，我们可以编写接口，响应接口等，相当于前台自己`mock`一些数据。建议看看`express`[官网](http://www.expressjs.com.cn/)。
```javascript
module.exports = {
  //...
  devServer: {
    before: function(app, server) {
        //编写一个/some/path接口，后续请求会在这里直接处理
      app.get('/some/path', function(req, res) {
        res.json({ custom: 'response' });
      });
    }
  }
};
```
### 43、`webpack-dev-middleware`作用是什么
服务端启动webpack，`webpack-dev-middleware`其实是一个`express`的中间件。
```javascript
let webpack = require('webpack')
let express = require('express')
let config = require('./webpack.config')
let middle = require('webpack-dev-middleware')
let app = express();
//webpack提供的方法，传入webpack配置，得到一个编译对象 
let compiler = webpack(config);
//使用中间件
app.use(middle(compiler))
//监听端口
app.listen(2000)
```
[官方文档](https://github.com/webpack/webpack-dev-middleware)
### 44、`resolve`属性有哪些配置
列出几个常用的配置：
```javascript
module.exports = {
  //...
  resolve: {
        //模块查找路径
        modules: [path.resolve('node_modules'),'mydir'],
        //配置别名
        alias: {
            bootstrap:'bootstrap/dist/css/bootstrap.css'
        },
        //查找字段
        mainFields: ['main', 'style'],
        //查找文件名
        mainFiles: ['index.js'],
        //查找文件的后缀名
        extensions:['.js','.css','.vue']
    },
};
```
[官方文档](https://webpack.js.org/configuration/resolve/)
### 45、如何定义别名
见上44题。
### 46、如何省略引入文件的后缀
见上44题。
### 47、如何定义环境变量
定义环境变量需要用到`webpack`的一个包--->`definePlugin`。
```javascript
module.exports = {
    //...
    plugins: [
        new webpack.DefinePlugin({
            DEV: 'dev',
            DEV_str: JSON.stringfiy('dev'),
            FLAG: 'true',
            FLAG_str: "'true'",
            expression: '1+1',
            expression_str: JSON.stringify('1+1')
        })
    ]
}
```
上述配置定义了6个环境变量，打包编译后的结果为：
- DEV--->报错，`dev is not defined`
- DEV_str---> `'dev'`(字符串)
- FLAG---> `true`(布尔值)
- FLAG_str---> `'true'`(字符串)
- expression---> `2`(数字型)
- expression_str---> `'1+1'`(字符串)
### 48、如何区分开发环境和生产环境
第一种方式，可以通过设置环境变量来区分，设置环境变量见上一题。<br>
```javascript
if(DEV==='development'){
    //do something
}else if(DEV==='production'){
    //do something
}
```
第二种方式，创建多套配置文件。<br>
安装包 `webpack-merge`
```javascript
npm install --save-dev webpack-merge
```
项目目录：
```javascript
  webpack-demo
  |- package.json
  |- webpack.common.js //开发环境、生产环境公用配置文件
  |- webpack.dev.js //开发环境配置文件 
  |- webpack.prod.js //生产环境配置文件
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```
`webpack.common.js`文件：
```javascript
  const path = require('path');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
 
  module.exports = {
    entry: {
      app: './src/index.js'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Production'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```
`webpack.dev.js`文件:
```javascript
  const merge = require('webpack-merge');
  const common = require('./webpack.common.js');
 
  module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    }
  });
```
`webpack.prod.js`文件:
```javascript
  const merge = require('webpack-merge');
  const common = require('./webpack.common.js');
 
  module.exports = merge(common, {
    mode: 'production',
  });
```
参考[官方文档](https://webpack.js.org/guides/production/#setup)
### 49、`webpack-merge`作用是什么
`webpack-merge`的作用是合并对象。<br>
最基本的用法：
```javascript
let merge = require('webpack-merge')
let newObj = merge(obj1,obj2,obj3,...)
```
还是看[文档](https://github.com/survivejs/webpack-merge)吧
### 50、如何不解析某些依赖库
`webpack`的配置文件中，通过配置`externals`字段可以达到不解析某些依赖库的目的。如下：
```javascript
module.exports = {
    //...
    externals: {
        jquery: '$'//webpack打包时，会忽略掉jquery
    },
    //...
}
```
[官方文档](https://webpack.js.org/configuration/externals/#externals)
### 51、如何设置`loader`的解析文件夹
1、直接写绝对路径
```javascript
{
    test: /.js$/,
    use: path.resolve(__dirname,'loader/loader1.js')
}
```
2、配置别名
```javascript
    resolveLoader: {
        alias: {
            loader1: path.resolve(__dirname, 'loader', 'loader1')
        }
    }
```
3、配置modules
```javascript
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loader')]
    }
```
[我是官方文档](https://webpack.js.org/configuration/resolve/#resolveloader)
### 52、使用了`moment`后默认会引入`locale`文件夹
```javascript

```
### 53、`dllPlugin`如何使用
打包一个dll文件：
```javascript
let path = require('path');
//引入插件，webpack内置插件
let DllPlugin = require('webpack/lib/DllPlugin')
module.exports = {
    mode: 'development',
    entry: {
        //将react、react-dom库打包成动态链接库
        react:['react','react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].dll.js',
        //动态链接库导出的全局变量
        library: '_dll_[name]'
    },
    plugins: [
        new DllPlugin({
            //name需和output.library一致。
            name: '_dll_[name]',
            //生成的json文件存放目录
            path: path.join(__dirname, 'dist', '[name].manifest.json')
        })
    ]
}
```
按照如上配置，我们最终得到了一个`react.dll.js`文件，该文件内容经过删减替换整理后，如下：
```javascript
var _dll_react = (function (modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}

        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;

    }
    return __webpack_require__(0);
})({
    "module1": (function (module, exports, __webpack_require__) { /* ... */}),
    "module2": (function (module, exports, __webpack_require__) { /* ... */}),
    "module3": (function (module, exports, __webpack_require__) { /* ... */}),
    "module4": (function (module, exports, __webpack_require__) { /* ... */}),
    0: (function (module, exports, __webpack_require__) {
        eval("module.exports = __webpack_require__")
    })
})
```
为了直观，我将源码中的类似`./node_modules/object-assign/index.js`这样的属性名替换成了`module1`,`module2`等等。<br>
分析上述代码，我们可以得知，`_dll_react`变量其实就是`__webpack_require__`方法。该方法接受一个模块`id`，返回该模块的内容。<br>
再来看一下，生成的`react.manifest.json`文件，内容经过删减整理如下：
```json
{
    "name": "_dll_react",
    "content": {
        "./node_modules/react-dom/index.js": {
            "id": "./node_modules/react-dom/index.js",
            "buildMeta": {
                "providedExports": true
            }
        }
        //...
    }
}
```
`content`对象里的键名`./node_modules/react-dom/index.js`就是模块请求路径，也就是说，当`webpack`遇到了如下语句`require('./node_modules/react-dom/index.js')`时,`webpack`会拿着调用`require`方法传入的路径去`react.manifest.json`文件内的`content`对象中找到键为该路径的属性，然后`webpack`就获取到了该路径对应的模块内容。<br>
如果我们不使用动态链接库，当`webpack`遇到了如下语句`require('./node_modules/react-dom/index.js')`时，`webpack`会拿着调用`require`方法传入的路径去获取文件内容，然后拼接头部信息(就是`function (module, exports, __webpack_require__) {}`)，然后递归解析文件内容的require语句，然后将依赖写入依赖列表。<br>
综上所述，使用动态链接库确实在打包速度上得到了一定的提升。<br>
使用一个dll文件相对来说就比较简单了，按照格式写就可以了：
```javascript
let path = require('path');
//引入插件，webpack内置插件
let DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        //使用动态链接库
        new DllReferencePlugin({
           manifest:require('./dist/react.manifest.json')
        })
    ]
}
```
[官方文档](https://webpack.js.org/plugins/dll-plugin/#root)
### 54、如何实现多线程打包，优化前5个
安装包`happypack`。
```javascript
npm install --save-dev happypack
```
`webpack.config.js`配置文件如下：
```javascript
module.exports = {
    rules: [
        {
            test: /\.js$/,
            use: 'happypack/loader?id=jsx'
        },

        {
            test: /\.less$/,
            use: 'happypack/loader?id=styles'
        },
    ],
    plugins: [
        new HappyPack({
            id: 'jsx',
            threads: 4,
            loaders: ['babel-loader']
        }),

        new HappyPack({
            id: 'styles',
            threads: 2,
            loaders: ['style-loader', 'css-loader', 'less-loader']
        })
    ]
}
```
happypack如何工作的呢，一图胜千言：

![](https://user-gold-cdn.xitu.io/2019/7/16/16bf8bb264b787c0?w=657&h=449&f=png&s=22357)

[官方文档](https://www.npmjs.com/package/happypack)
### 55、`tree-shaking`是否支持`require`语法和有什么作用
不支持`require`语法，依赖于ES2015模块的静态结构，比如：`import` `export`。
作用就是能够去除未用到的代码。<br>
[官方文档](https://webpack.js.org/guides/tree-shaking/#root)

### 56、`scope hosting`的作用是什么
`Scope Hoisting` 可以让 `Webpack` 打包出来的代码文件更小、运行的更快， 它又译作 "作用域提升"，是在 `Webpack3` 中新推出的功能。<br>
- 代码体积更小，因为函数声明语句会产生大量代码
- 代码在运行时因为创建的函数作用域更少了，内存开销也随之变小

在配置文件中添加一个新的插件，就可以实现`scope hosting`功能。
```javascript
module.exports = {
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
```
参考[文章](https://zhuanlan.zhihu.com/p/27980441)
### 57、什么时候需要分割代码块
```javascript

```
### 58、怎么样分割代码块 

### 59、如何先抽离第三方插件

### 60、实现`AsyncSeriesWaterfallHook`

### 61、根据自己的理解，请描述webpack打包流程
初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数； 
开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
确定入口：根据配置中的 entry 找出所有的入口文件；
编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。




25  36  52 














