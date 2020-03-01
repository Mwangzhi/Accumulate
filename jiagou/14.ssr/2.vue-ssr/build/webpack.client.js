const base = require('./webpack.base');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueServerRender = require('vue-server-renderer/client-plugin')

module.exports = merge(base,{
    entry: {
        client1:path.resolve(__dirname, '../src/client-entry.js'), // webpack打包的入口
    },
    plugins:[
        new HtmlWebpackPlugin({ // 用html作为模板进行打包
            filename:'client.html',
            template:path.resolve(__dirname,'../public/client.html')
        }),
        new VueServerRender()
    ]
})