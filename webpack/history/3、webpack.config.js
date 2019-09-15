
let HtmlWebpackPlugin = require('html-webpack-plugin')

let path = require('path')
module.exports = {
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
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        insertAt: 'top'//将生成的样式插入到html顶部
                    }
                },
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        insertAt: 'top'//将生成的样式插入到html顶部
                    }
                },
                    'css-loader', //@import 路径
                    'less-loader'
                ]
            }
        ]
    }
}