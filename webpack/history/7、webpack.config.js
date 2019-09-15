
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let Happypack = require('happy-pack')
let path = require('path')
module.exports = {
    mode: 'development',
    optimization: {
        splitChunks: {
            cacheGroup: {
                common: {
                    minSize: 0,
                    minChunks: 2,
                    chunks: 'initial'
                },
                vendor: {
                    priority: 1,
                    test: /node_modules/,
                    minSize: 0,
                    minChunks: 2,
                    chunks: 'initial'
                }
            }
        }
    },
    entry: './src/index.js',
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.IgnorePlugin(/\.\/local/, /moment/),
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', 'manifest.json')
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'manifest.json')
        }),
        new Happypack({
            id: 'js',
            use: 'babel-loader'
        })
    ],
    noParse: /jquery/,
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