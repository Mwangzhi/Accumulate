
let HtmlWebpackPlugin = require('html-webpack-plugin')

let path = require('path')
module.exports = {
    devServer: {
        port: 8080,
        progress: true,
        contentBase: './build',
        compress: true
    },
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {//压缩html
                removeAttributeQuotes: true,//移除双引号
                collapseWhitespace: true,//去掉空格
            },
            hash: true,
        })
    ]
}