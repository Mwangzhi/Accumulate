process.on('message', (m, socket) => {
    if (m === 'socket') {
        socket.end('客户端请求在子进程中处理');
    }
})