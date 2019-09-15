let fs = require('fs');
let EventEmitter = require('events');
class ReadStream extends EventEmitter {
    constructor(path, options) {
        super(path, options);
        this.path = path;
        this.fd = options.fd ? options.fd : null;
        this.flowing = false;
        this.encoding = options.encoding ? options.encoding : 'utf8';
        this.flag = options.flag ? options.flag : 'r';
        this.mode = options.mode ? options.mode : 0o666;
        this.start = options.start ? options.start : 0;
        this.pos = this.start;
        this.end = options.end ? options.end : 90;
        this.highWaterMark = options.highWaterMark ? options.highWaterMark : 64 * 1024;
        this.buffer = Buffer.alloc(this.highWaterMark);
        this.autoClose = options.autoClose ? options.autoClose : true;
        this.length = 0;
        this.on('newListener', (type, listener) => {
            if (type === 'data') {
                this.flowing = true;
                this.read();
            }
        });
        this.on('end', () => {
            if (this.autoClose) {
                this.destroy();;
            }
        });
        this.open();
    }
    read() {
        //当文件描述符没有回去到时的处理
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this.read())
        }
        //处理边界值
        let n = this.end ? Math.min(this.end - this.pos, this.highWaterMark) : this.highWaterMark;
        //开始读取数据
        fs.read(this.fd, this.buffer, 0, n, this.pos, (err, bytesRead) => {
            if (err) return;
            if (bytesRead) {
                let data = this.buffer.slice(0, bytesRead);
                data = this.encoding ? data.toString(this.encoding) : data;
                //发射事件，将读取到的数据返回。
                this.emit('data', data);
                this.pos += bytesRead;
                if (this.end && this.pos > this.end) {
                    return this.emit('end');
                }
                //flowing模式下，不停的读取数据
                if (this.flowing) {
                    this.read();
                }

            } else {
                this.emit('end');
            }
        })
    }
    open() {
        //打开文件
        fs.open(this.path, this.flag, this.mode, (err, fd) => {
            //如果打开文件失败，发射error事件
            if (err) {
                if (this.autoClose) {
                    this.destroy();
                    return this.emit('error', err);
                }
            }
            //获取到文件描述符
            this.fd = fd;
            this.emit('open', fd);
        })
    }
    end() {
        if (this.autoClose) {
            this.destroy();
        }
    }
    destroy() {
        fs.close(this.fd, () => {
            this.emit('close');
        })
    }
    pipe(des) {
        //监听data事件，拿到数据
        this.on('data', (data) => {
            //flag为true时表示缓存区未满，可以继续写入。
            let flag = des.write(data);
            if (!flag) {
                this.pause();
            }
        });
        //drain事件表示缓存区的数据已经全部写入，可以继续读取数据了
        des.on('drain', () => {
            this.resume();
        });
        this.on('end', () => {
            des.end();
        })
    }
    pause() {
        this.flowing = fasle;
    }
    resume() {
        this.flowing = true;
        this.read();
    }

}
module.exports = ReadStream;


