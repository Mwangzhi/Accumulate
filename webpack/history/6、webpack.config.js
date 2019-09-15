
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let path = require('path')
module.exports = {
    mode: 'development',
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    resolve: {
        modules: [path.resolve('node_modules')],
        alias: {
            bootstrap: 'bootstrap/dist/css/bootstrap.css'
        },
        mainFields: ['style', 'js'],//找默认字段
        mainFiles: [],//找默认文件
        extensions:['.css','.js']//配置后缀名，页面引入文件没有后缀名时按此规则查找
    },
    devtool: 'source-map',
    watch: true,
    watchOptions: {
        poll: 1000,//多长时间检查一次文件
        aggregateTimeout: 500,//防抖
        ignored: /node_modules/
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'www.wangzhi.com',
                pathRewrite: {
                    '/api': ''
                }
            }
        },
        before(app) {
            app.get('/user', (req, res) => {
                res.send('data')
            })
        },
        after() { }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'home.html',
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'other.html',
            chunks: ['other']
        }),
        new CleanWebpackPlugin('./dist'),
        new CopyWebpackPlugin([
            {
                from: '',
                to: ''
            }
        ]),
        new webpack.BannerPlugin('build by wangzhi'),
        new webpack.DefinePlugin({
            DEV:"'dev'",
            DEV: JSON.stringify('dev'),
            FLAG: 'true',//
            EXPRESS:'1+1'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/
                }
            }
        ]
    }
}