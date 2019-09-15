let net = require('net');
let { StringDecoder } = require('string_decoder');
let { Readable } = require('stream');
class IncomingMessage extends Readable{
    _read(){}
}

let server=net.createServer((socket)=>{
    parser(socket,(req,res)=>{
        server.emit('request',req,res);
    })
})
server.on('connection',()=>{
    console.log('connection is established successfully')
})

server.listen(3000);











