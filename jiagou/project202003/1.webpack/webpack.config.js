let path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin').default;
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    //context: path.resolve(__dirname),
    //webpack打包的时候会从入口出发，打包所有的文件
    //chunk是webpack在打包过程的一个中间概念。用来代码的合并和分割
    entry: './src/index.js',
    /* entry: {
        index: './src/index.js',
        about: './src/about.js',
    }, */
    //entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),//以它为静态文件根目录
        host: 'localhost',
        compress: true,
        port: 8080
    },
    ///loader 如何转换模块代码
    //三种loader写法  loader:[]字符串数组
    //use 是一个字符串数组 如果需要传参数的话可以传对象
    module: {
        rules: [
            //https://babeljs.io/docs/en/babel-plugin-proposal-decorators
            //https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
            //loader都需要插件支持吗
            //babel-loader 内部会调用 babel-core 实现语法转换 core空的引擎，core要靠插件来实现转换
            //pre+normal+post

            {
                test: /\.js$/,//normal
                loader: 'babel-loader'
            },
            /* {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',// pre post
                include: [path.resolve(__dirname, 'src')],
                options: { fix: true }//自动修复
            }, */
            {
                test: /\.css$/,//   ./index.css
                //会先执行css-loader，处理CSS中的url 和 import语句的
                //style-loader是把这些CSS代码转成style标签并插入HTML中
                //css-loader的作用内容方法是把url import.另外会把这个CSS模块变成一个JS模块
                //miniCssExtractPlugin.loader
                use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(jpg|png|gif|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 8,
                            outputPath: 'images',//指定图片的输出路径
                            publicPath: '/images'
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    miniCssExtractPlugin.loader, 'css-loader', 'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    miniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.(woff|ttf|eot|svg|otf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024
                    }
                }
            }
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: "style/[name].[hash].[chunkhash].[contenthash].css"
            //filename: 'style/[name].css',//把CSS提供出来，单独生成文件并且在HTML中通过link引入。得有文件
        }),
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: true,
            hash: true,//会在引入资源的时候加入hash值 ，防止缓存导致不能更新
            //chunks: ['index'],// 你将要向此HTML里面插入的代码块的名称
            //chunksSortMode: "manual"
            /*   chunksSortMode: function (a, b) {
                  return b.size - a.size;
              } */
        })
        /* new htmlWebpackPlugin({
            template: './src/about.html',
            filename: 'about.html',
            inject: true,
            hash: true,//会在引入资源的时候加入hash值 ，防止缓存导致不能更新
            chunks: ['about'],
            chunksSortMode: "manual"
            //chunks: ['about'],// 你将要向此HTML里面插入的代码块的名称
              chunksSortMode: function (a, b) {
                 console.log('a,b', a, b, '================');
                 return a.size - b.size;
             } 
        }) */
        //new HtmlInlineCssWebpackPlugin()
    ]
}