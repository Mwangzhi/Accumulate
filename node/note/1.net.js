const net = require('net');
/**
 * net模块上的属性，其中net.createConnection其实调用的是new net.Socket，其中net.createServer其实调用的是new net.Server
[ '_createServerHandle',
  '_normalizeArgs',
  '_setSimultaneousAccepts',
  'connect',
  'createConnection',
  'createServer',
  'isIP',
  'isIPv4',
  'isIPv6',
  'Server',
  'Socket',
  'Stream' ]
 */
let server = net.createServer((socket) => {
    //socket 是一个duplex，也是EventEmitter.
    socket.on('close', (had_error) => { })//一旦 socket 完全关闭就发出该事件。参数 had_error 是 boolean 类型，表明 socket 被关闭是否取决于传输错误。
    socket.on('connect', () => { })//当一个 socket 连接成功建立的时候触发该事件
    socket.on('data', (chunk) => { })//当接收到数据的时触发该事件。data 参数是一个 Buffer 或 String。数据编码由 socket.setEncoding() 设置
    socket.on('drain', () => { });//当写入缓冲区变为空时触发。可以用来做上传节流。
    socket.on('end', () => { });//当 socket 的另一端发送一个 FIN 包的时候触发，从而结束 socket 的可读端。
    socket.on('error', () => { })//当错误发生时触发。'close' 事件也会紧接着该事件被触发。
    socket.on('lookup',(err,daaress,family,host)=>{})//在找到主机之后创建连接之前触发
    socket .on('timeout',()=>{})//当 socket 超时的时候触发。该事件只是用来通知 socket 已经闲置。用户必须手动关闭。
    socket.address()//返回操作系统报告的 socket 的地址、地址族和端口。返回的对象有三个属性，例如： { port: 12346, family: 'IPv4', address: '127.0.0.1' }
    socket.bufferSize()//net.Socket 具有该属性，socket.write() 工作时需要
    socket.bytesRead//接收的字节数量。
    socket.bytesWritten//发送的字节数量。
    socket.connect()//在给定的套接字上启动一个连接。
    socket.connecting
    socket.destroy()//确保在该 socket 上不再有 I/O 活动。仅在出现错误的时候才需要（如解析错误等）
    socket.end()//半关闭 socket。例如发送一个 FIN 包。服务端仍可以发送数据。如果指定了 data，则相当于调用 socket.write(data, encoding) 之后再调用 socket.end()。
    socket.pause();//暂停读写数据。也就是说，'data' 将不会再被触发。可以用于上传节流。
    socket.ref()
    socket.unref()
    socket.setKeepAlive([enaable],[initialDelay])
    socket.resume();//在调用 socket.pause() 之后恢复读取数据。
    socket.setEncoding('utf-8');
    socket.setTimeout(5000,callback)
    socket.write(data,'utf8',callback)
    socket.pipe(ws, { end: false });
    socket.unpipe(ws);

})
server.listen(8080, 'localhost', () => { })

// 以下是server上的大部分方法、属性、事件。
server.on('close', () => { });//当server关闭的时候触发. 注意,如果有连接存在, 直到所有的连接结束才会触发这个事件
server.on('connection', (socket) => { })//当一个新的connection建立的时候触发
server.on('error', () => { });//'close' 事件不会在这个事件触发后继续触发 除非 server.close() 是手动调用.
server.on('listening', () => { })//当服务被绑定后调用 server.listen().
server.address()//返回值===>{ address: '127.0.0.1', family: 'IPv4', port: 8080 } 只有到了 'listening' 事件被触发时候.才可以调用 server.address()
server.close()
server.listen(port, host, callback)
server.getConnections((err, count) => { });//异步获取服务器的当前并发连接数,回调函数的两个参数是 err 和 count。
server.listening//一个布尔值， 表明 server 是否正在监听连接
server.maxConnections //设置该属性使得当 server 连接数过多时拒绝连接
server.ref()
server.unref()

