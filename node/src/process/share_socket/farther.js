let { fork } = require('child_process');
let path = require('path');
let child = fork(path.join(__dirname, 'child.js'));
let server = require('net').createServer();
server.on('connection', (socket) => {
    if (Date.now() % 2 == 0) {
        child.send('socket', socket);
    } else {
        socket.end('客户端被父进程处理');
    }
})
server.listen(41234);