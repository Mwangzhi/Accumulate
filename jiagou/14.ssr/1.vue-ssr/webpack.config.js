// 默认打包就会找这个文件
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry: path.resolve(__dirname, './src/main.js'), // webpack打包的入口
    output: { // 打包后的结果
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: { // 给不同模块进行解析的规则
        rules: [
            {
                test:/\.js/, // 匹配js 使用babel-loader 进行转义
                use:{
                    loader:'babel-loader', // 默认回调用@babel/core
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.vue/, // 匹配.vue文件使用vue-loader进行转义
                use:'vue-loader' // 默认调用vue-template-compiler
            },
            {
                test:/\.css/, // 匹配css 使用style-loader css-loader进行转义
                use:['vue-style-loader','css-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({ // 用html作为模板进行打包
            template:path.resolve(__dirname,'public/index.html')
        }),
        new VueLoaderPlugin()
    ]
}