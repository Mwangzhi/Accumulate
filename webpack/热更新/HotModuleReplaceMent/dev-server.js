const path = require('path');
const express = require('express');
const mime = require('mime');
const webpack = require('webpack');
const config = require('./webpack.config');
const MemoryFileSystem = require('memory-fs');
const compiler = webpack(config);
class Server {
    constructor(compiler) {
        this.compiler = compiler;
        let sockets = [];
        let lasthash;//每次编译完成后都会产生一个stats对象，其中有一个hash值代表这一次编译结果的hash
        compiler.hooks.done.tap('webpack-dev-server', (stats) => {
            lasthash = stats.hash;
            //每当新一个编译完成都会给客户端发送消息
            sockets.forEach(socket => {
                //向客户端发送hash
                socket.emit('hash', stats.hash);
                //向客户端发送ok
                socket.emit('ok')
            });

        });
        let app = new express();
        compiler.watch({}, err => {
            console.log('编译完成')
        })
        //设置文件系统为内存文件系统
        let fs = new MemoryFileSystem();
        compiler.outputFileSystem = fs;
        function meddleware(req, res, next) {
            if (req.url === '/favicon.ico') {
                return res.sendStatus(404);
            }
            let filename = path.join(config.output.path, req.url.slice(1));
            let stat = fs.statSync(filename);
            if (stat.isFile()) {
                let content = fs.readFileSync(filename);
                let contentType = mime.getType(filename);
                res.setHeader('Content-Type', contentType);
                res.statusCode = res.statusCode || 200;
                res.send(content);
                next()
            } else {
                // next();
                res.sendStatus(404)
            }
        }
        app.use(meddleware);
        this.server = require('http').createServer(app);
        let io = require('socket.io')(this.server);
        io.on('connection', socket => {
            sockets.push(socket);
            //向客户端发送hash
            socket.emit('hash', lasthash);
            //向客户端发送ok
            socket.emit('ok')
        })
    }
    listen(port) {
        this.server.listen(port, () => {
            console.log(`服务器已经在${port}端口上启动了`)
        })
    }
}
let server = new Server(compiler);
server.listen(8000)




















