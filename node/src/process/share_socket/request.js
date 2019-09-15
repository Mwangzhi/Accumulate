let net = require('net');
let client = new net.Socket();
client.setEncoding('utf8');
client.connect(41234, 'localhost');
client.on('data', (data) => {
    console.log(data);
})