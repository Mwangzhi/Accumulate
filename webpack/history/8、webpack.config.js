
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let Happypack = require('happy-pack')
let path = require('path')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    hot:true,//启动热加载
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.NamedModulesPlugin(),//打印更新的模块路径
        new webpack.HotModuleReplacementPlugin()//热更新插件
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'Happypack/loader?id=js',
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    options: {}
                }
            }
        ]
    }
}