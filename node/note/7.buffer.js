//截取乱码问题
let { StringDecoder } = require('string_decoder');
let sd = new StringDecoder();
let buffer = new Buffer('珠峰');
console.log(sd.write(buffer.slice(0, 4)));
console.log(sd.write(buffer.slice(4)));


// 编码转化的问题
let fs = require('fs');
let path = require('path');
let iconvLite = require('iconv-lite'); // 这个包需要转化的是buffer
let r = fs.readFileSync(path.resolve(__dirname, 'a.txt'));
let result = iconvLite.decode(r, 'gbk'); // 进行内容编码的转化
console.log(result);

//buffer的创建
let b1 = Buffer.alloc(10, 1);// 创建一个长度为 10、且用 0x1 填充的 Buffer。
let b2 = Buffer.allocUnsafe(10)// 创建一个长度为 10、且未初始化的 Buffer。
let b3 = Buffer.from('wangzhi');
let b4 = Buffer.from([1, 2, 3]);
let b5 = new Buffer(1);

//实例方法
let buffer = Buffer.alloc(10);
buffer.fill(0);
buffer.write(string, offset, length, encoding)

buffer.writeInt8()
buffer.readInt8();

buffer.writeInt16BE()
buffer.readInt16BE()

buffer.writeInt16LE()
buffer.readInt16LE()

buffer.toString(encoding, start, end)

buffer.slice()

buffer.copy(target, targetStart, sourceStart, sourceEnd)

//类方法
Buffer.concat(list, totalLength);
Buffer.isBuffer();
Buffer.byteLength('wangzhi');


//copy方法
Buffer.prototype.mycopy = function (target, targetStart, sourceStart, sourceEnd) {
  for (var i = 0; i < sourceEnd - sourceStart; i++) {
    target[i + targetStart] = this[sourceStart + i];
  }
}


//自己实现concat方法
Buffer.myConcat = function (list, totalLength = list.reduce((len, item) => len + item.length, 0)) {
  if (list.length == 0)
    return list[0];
  let newBuffer = Buffer.alloc(totalLength);
  let offset = 0;
  for (let i = 0; i < list.length; i++) {
    if (offset + list[i].length > totalLength) {
      list[i].copy(newBuffer, offset, 0, totalLength - offset);
      break;
    } else {
      list[i].copy(newBuffer, offset, 0, list[i].length);
      offset += list[i].length;
    }
  }
  return newBuffer;
}

//base64原理
const CHARTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function transfer(str) {
  let buf = Buffer.from(str);
  let result = '';
  for (let b of buf) {
    result += b.toString(2);
  }
  return result.match(/(\d{6})/g).map(val => parseInt(val, 2)).map(val => CHARTS[val]).join('');
}
let r = transfer('王');//546L


//buffer切割
Buffer.prototype.split = function (sep) {
  let index = 0;
  let len = Buffer.from(sep).length;
  let i = 0;
  let arr = [];
  while (-1 !== (i = this.indexOf(sep, index))) {
    let a = this.slice(index, i);
    index = i + len
    arr.push(a);
  }
  arr.push(this.slice(index));
  return arr.map(item => item.toString());
}

// 节约内存的copy 流 pipe ***
function copy(source, target) {
  let BUFFER_SIZE = 3;
  let buffer = Buffer.alloc(BUFFER_SIZE);
  let index = 0;
  fs.open(source, 'r', function (err, rfd) { // 开启读取的文件描述符
    if (err) return console.log(err);
    // fd 代表的是文件描述符 符号是从3开始
    // 0 代表的是标准输入
    // 1 标准输出 process.stdout
    // 2 代表的是错误输出 process.stderr
    fs.open(target, 'w', 0o666, function (err, wfd) { // 开启写入的文件描述符
      function next() {
        fs.read(rfd, buffer, 0, BUFFER_SIZE, index, function (err, bytesRead) {
          // 要写入的文件描述符 写入的buffer buffer的偏移量，buffer写入的个数，文件的位置
          fs.write(wfd, buffer, 0, bytesRead, index, function (err, byteWritten) {
            index += bytesRead;
            if (byteWritten) { // 如果有写入的内容，就继续读取
              next();
            } else {
              fs.close(rfd, () => { });
              // 把内存中的内容 强制写入后再关闭文件(写入的操作是异步操作)
              fs.fsync(function () {
                fs.close(wfd, () => { })
              })
            }
          });
        })
      }
      next();
    })
  })
}








