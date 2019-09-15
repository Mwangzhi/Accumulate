let http = require('http');
process.on('message', function (msg, server) {
    if (msg === 'server') {
        console.log('子进程的服务器已经创建');
        let httpServer = http.createServer();
        httpServer.on('request', (req, res) => {
            if (req.url !== '/favicon.ico') {
                let sum = 0;
                for (var i = 0; i < 10000; i++) {
                    sum += i;
                }
                res.write('客户端请求在子进程中被处理');
                res.end('sum=' + sum);
            }
        });
        httpServer.listen(server);
    }
})