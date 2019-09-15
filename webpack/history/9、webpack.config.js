let path = require('path');
let DonePlugin = require('./plugins/donePlugin')
let AsyncPlugin = require('./plugins/AsyncPlugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let FileListPlugin = require('./plugins/FileListPlugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let InlineSourcePlugin = require('./plugins/InlineSourcePlugin')
module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new DonePlugin(),
        new AsyncPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new FileListPlugin({
            filename: 'list.md'
        }),
        new MiniCssExtractPlugin({
            filename:'main.css'
        }),
        new InlineSourcePlugin({
            match:/\.[js|css]/g
        })
    ],
    resolveLoader: {
        // alias: {
        //     loader1: path.resolve(__dirname, 'loader', 'loader1')
        // },
        modules: ['node_modules', path.resolve(__dirname, 'loader')]
    },
    devtool: 'soure-map',
    watch: true,
    module: {
        rules: [
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'banner-loader',
                    options: {
                        text: 'wz',
                        filename: path.resolve(__dirname, 'banner.js')
                    }
                }
            },
            {
                test: /\.jpg/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 200 * 1024
                    }
                },

            },
            {
                test: /\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test: /\.jpg/,
                use: 'file-loader'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }

                }
            },
            {
                test: /.js$/,
                use: 'loader1',
                // use: path.resolve(__dirname,'loader/loader1.js')
            },
            {
                test: /\.js$/,
                use: ['loader3', 'loader2', 'loader1']
            },
            {
                test: /\.js$/,
                use: {
                    loader:'loader1'
                },
                enforce:'pre'
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
                    loader: 'loader3'
                },
                enforce:'post'
            }
        ]
    }
}