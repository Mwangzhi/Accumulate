let http = require('http');
let { fork } = require('child_process');
let fs = require('fs');
let net = require('net');
let path = require('path');
let child = fork(path.join(__dirname, 'child.js'));
let server = net.createServer();
server.listen(8080, '127.0.0.1', () => {
    child.send('server', server);
    console.log('父进程中的服务器已经创建');
    let httpServer = http.createServer();
    httpServer.on('requrest', (req, res) => {
        if (req.url != '/favicon.ico') {
            let sum = 0;
            for (let i = 0; i < 10000; i++) {
                sim += i;
            }
            res.write('客户端请求在父进程中被处理');
            res.end('sum=' + sum);
        }
    });
    httpServer.listen(server);
})