let fs = require('fs');
let EventEmitter = require('events');
let util = require('util');
util.inherits(LineReader, EventEmitter);
let data = fs.readFileSync('./src/stream/1.txt','utf8');
console.log(data);
console.log('..................................')
function LineReader(path) {
    EventEmitter.call(this);
    this._rs = fs.createReadStream(path);
    this.RETURN = 0x0D;//\r
    this.NEW_LINE = 0x0A;//\n
    this.on('newListener', function (type, listener) {
        if (type === 'newLine') {
            let buffer = [];
            this._rs.on('readable', () => {
                let bytes;
                while (null !== (bytes = this._rs.read(1))) {
                    let ch = bytes[0];
                    switch (ch) {
                        case this.RETURN:
                            this.emit('newLine', Buffer.from(buffer));
                            buffer.length = 0;
                            let nByte = this._rs.read(1);
                            if (nByte && nByte[0] != this.NEW_LINE) {
                                buffer.push(nByte[0]);
                            }
                            break;
                        case this.NEW_LINE:
                            this.emit('newLine', Buffer.from(buffer));
                            buffer.length = 0;
                            break;
                        default:
                            buffer.push(bytes[0]);
                            break;
                    }
                }
            })
            this._rs.on('end', () => {
                if (buffer.length > 0) {
                    this.emit('newLine', Buffer.from(buffer));
                    buffer.length = 0;
                    this.emit('end');
                }
            })
        }
    })
}
var lineReader = new LineReader('./src/stream/1.txt');
lineReader.on('newLine', (data) => {
    console.log(data.toString())
}).on('end', function () {
    console.log('data is used up')
})