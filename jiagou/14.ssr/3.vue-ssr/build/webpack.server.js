const base = require('./webpack.base');
const merge = require('webpack-merge')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueServerRenderer = require('vue-server-renderer/server-plugin');
module.exports = merge(base,{
    entry: {
        server:path.resolve(__dirname, '../src/server-entry.js'), // webpack打包的入口
    },
    target:'node', // 输出的文件是给node来使用的 不需要打包node自带的模块
    output:{
        libraryTarget:'commonjs2' // module.exports = 导出入口的函数
    },
    plugins:[
        new VueServerRenderer(), // 这个插件需要放到html上面
        new HtmlWebpackPlugin({ // 用html作为模板进行打包
            filename:'server.html',
            template:path.resolve(__dirname,'../public/server.html'),
            excludeChunks:['server'] // 排除引入 server入口打包出来的结果，因为服务端渲染不要引入服务端打包后的结果
        }),
    ]
})

// 服务端打包出来的结果 要给koa去用 通过koa渲染成一个字符串插入到server.html中
// 需要将客户端打包的js 插入到server.html中