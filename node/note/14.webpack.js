let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');//自动产出html
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');//提取css
let CopyWebpackPlugin = require('copy-webpack-plugin');//拷贝静态文件
let CleanWebpackPlugin = require('clean-webpack-plugin');//清空目录
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');//压缩js
let PurifyCSSPlugin = require('purifycss-webpack');
const cssExtract = new ExtractTextWebpackPlugin('css.css');
const lessExtract = new ExtractTextWebpackPlugin('less.css');
const sassExtract = new ExtractTextWebpackPlugin('sass.css');
const bootstrap = require('node_modules/bootstrap/dist/css/bootstrap.css')

module.exports = {
    entry: '',
    // entry:{
    //     index:'./src/index.js',
    //     main:'./src/main.js'
    // },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: '[name].[hash].js',
    //     publicPath: PUBLIC_PATH
    // },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin({
                    use: 'css-loader'
                }),
                //use:['style-loader','css-loader']
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },
            // {
            //     test: /\.css$/,
            //     use: cssExtract.extract({
            //         use: [{
            //             loader: 'css-loader',
            //             options: { minimize: true }
            //         }, 'postcss-loader']
            //     }),
            //     //use:['style-loader','css-loader']
            //     include: path.join(__dirname, './src'),
            //     exclude: /node_modules/
            // },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: 'url-loader',
                include: path.join(__dirname, './src'),
                exclude: /node_modules/,
                options: {
                    limit: 1024,
                    outputPath: 'images/'
                }
            },
            {
                test: /\.(html|html)$/,
                use: 'html-withimg-loader',
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: lessExtract.extract({
                    use: ['css-loader', 'less-loader']
                }),
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: sassExtract.extract({
                    use: ['css-loader', 'sass-loader']
                }),
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0', 'react']
                    },
                    include: path.join(__dirname, './src'),
                    exclude: /node_modules/
                }
                //use:['babel-loader?cacheDirectory']
            }
        ],
        noParse: ['/react\.min\.js/']//让 Webpack 忽略对部分没采用模块化的文件的递归解析处理
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                removeAttributeQuotes: true //minify 是对html文件进行压缩，removeAttrubuteQuotes是去掉属性的双引号
            },
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new ExtractTextWebpackPlugin('css/index.css'),
        new ExtractTextWebpackPlugin.ProvidePlugin({
            _: 'lodash'
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'public'),  ////静态资源目录源地址
            to: './public'  ////目标地址，相对于output的path目录
        }]),
        new CleanWebpackPlugin(path.join(__dirname, 'dist')),//清空目录
        new UglifyjsWebpackPlugin(),
        new PurifyCSSPlugin({
            //purifycss根据这个路径配置遍历你的HTML文件，查找你使用的CSS
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        })
        // "build": "cross-env NODE_ENV=production webpack --mode development",
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        port: '8080',
        hot:true,//热替换
        inline: true,//自动刷新浏览器
        compress: '',//是否启动gzip压缩
        watch: true,
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 300,//监听到变化发生后等300ms再去执行动作，防止文件更新太快导致编译频率太高
            poll: 1000 //通过不停的询问文件是否改变来判断文件是否发生变化，默认每秒询问1000次
        }
    },
    resolve: {
        extensions: ["", ".js", ".css", ".json"],
        alias: {
            'bootstrap': bootstrap
        },
        modules: [path.join(__dirname, 'node_modules')], //优化
        mainFields: ['browser', 'module', 'main'],
        // mainFields:['module','target'],
        // mainFields:['main']
    },
    devtool: 'eval-source-map'
    //devtool:'cheap-module-source-map'
    //devtool:'source-map'
    //devtool:'cheap-module-eval-source-map'
}


//DLL动态链接库
module.exports = {
    entry: {
        react: ['react'] //react模块打包到一个动态连接库
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].dll.js', //输出动态连接库的文件名称
        library: '_dll_[name]' //全局变量名称
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]', //和output.library中一致，值就是输出的manifest.json中的 name值
            path: path.join(__dirname, 'dist', '[name].manifest.json')
        })
    ]
}
//使用动态链接库
module.exports = {
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, 'dist', 'react.manifest.json')),
        })
    ]
}




//HappyPack就能让Webpack把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程
//npm i happypack@next -D
module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            //把对.js文件的处理转交给id为babel的HappyPack实例
            use: 'happypack/loader?id=babel',
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/
        }, {
            //把对.css文件的处理转交给id为css的HappyPack实例
            test: /\.css$/,
            use: 'happypack/loader?id=css',
            include: path.resolve(__dirname, 'src')
        }],
        noParse: [/react\.min\.js/]
    },
    plugins: [
        //用唯一的标识符id来代表当前的HappyPack是用来处理一类特定文件
        new HappyPack({
            id: 'babel',
            //如何处理.js文件，和rules里的配置相同
            loaders: [{
                loader: 'babel-loader',
                query: {
                    presets: [
                        "env", "react"
                    ]
                }
            }]
        }),
        new HappyPack({
            id: 'css',
            loaders: ['style-loader', 'css-loader'],
            threads: 4, //代表开启几个子进程去处理这一类型的文件
            verbose: true //是否允许输出日子
        })
    ]
}



//ParallelUglifyPlugin可以把对JS文件的串行压缩变为开启多个子进程并行执行
//npm i -D webpack-parallel-uglify-plugin
module.exports = {
    plugins: [
        new ParallelUglifyPlugin({
            workerCount: 3, //开启几个子进程去并发的执行压缩。默认是当前运行电脑的 CPU 核数减去1
            uglifyJS: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false, //不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            },
        })
    ]
}














