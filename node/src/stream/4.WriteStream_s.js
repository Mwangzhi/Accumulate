let fs = require('fs');
let EventEmitter = require('events');
class WriteStream extends EventEmitter {
    constructor(path, options) {
        super(path, options);
        this.path = path;
        this.fd = options.fd;
        this.flags = options.flag || 'w';
        this.mode = options.mode || 0o666;
        this.encoding = options.encoding;
        this.start = options.start || 0;
        this.pos = this.start;
        this.writing = false;
        this.autoClose = true;
        this.highWaterMark = options.highWaterMark || 16 * 1024;
        this.buffers = [];
        this.length = 0;
        this.open();
    }
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) return this.emit('error', err);
            this.fd = fd;
            this.emit('open', fd);
        })
    }
    write(chunk, encoding, cb) {
        //参数判断
        if (typeof encoding === 'function') {
            cb = encoding;
            encoding = null;
        }
        //处理传入的数据
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, this.encoding || 'utf8');
        let len = chunk.length;
        this.length += len;
        let ret = this.length < this.highWaterMark;
        //当数据正在写入时，将新任务添加到任务队列中
        if (this.writing) {
            this.buffers.push({
                chunk,
                encoding,
                cb
            })
            //写入数据
        } else {
            this.writing = true;
            this._write(chunk, encoding, this.clearBuffer.bind(this));
        }
        return ret;
    }
    _write(chunk, encoding, cb) {
        //当文件描述符没有拿到时的处理
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._write(chunk, encoding, cb));
        }
        //写入数据，执行回调函数
        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, written) => {
            if (err) {
                if (this.autoClose) {
                    this.destroy();
                }
                return this.emit('error', err);
            }
            this.length -= written;
            //更新写入数据后，下一次该从哪个位置写入的变量
            this.pos += written;
            //执行回调函数
            cb && cb();
        })
    }
    clearBuffer(cb) {
        //从任务队列中拿出一个任务
        let data = this.buffers.shift();
        //如果任务有值，那么就将数据写入文件中
        if (data) {
            this._write(data.chunk, data.encoding, this.clearBuffer.bind(this));
        } else {
            this.writing = false;
            this.emit('drain');
        }
    }
    end() {
        if (this.autoClose) {
            this.emit('end');
            this.destroy();
        }
    }
    destroy() {
        fs.close(this.fd, () => {
            this.emit('close');
        })
    }
}
module.exports = WriteStream;
