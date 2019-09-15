let fs = require('fs');
let rs = fs.createReadStream(path, option);
let ws=fs.createWriteStream(path,option);
/**
可读流的option:
{
    flags: 'r',
    mode: 0o666,
    start: 0,
    end: 0,
    encoding: null,
    highWaterMark: 64 * 1024
}
可写流的option:
{
    flags: 'w',
    encoding: null,
    highWaterMark: 16 * 1024
}
 */
//可读流的两种模式（对象模式、二进制模式）和3种状态（null、true、false）
//可读流事件
rs.on('data', (data) => { });
rs.on('end', () => { })
rs.on('error', (err) => { })
rs.on('open',()=>{})
rs.on('close',()=>{})
rs.on('readable',(data)=>{})

//可读流方法
rs.setEncoding('utf8')
rs.pause()
rs.resume()
rs.read()
rs.pipe();
rs.unpipe()//将之前通过rs.pipe()方法绑定的流分离

//可读流属性
rs._readableState.buffer
rs._readableState.flowing
//...





//可写流事件
ws.on('finish',()=>{})
//可写流方法
ws.write(chunk,encoding,cb)//返回值代表缓存区状态。没满吧？ true--->未满；false--->满了
ws.end(chunk,encoding,cb);//此处cb回放入finish事件的回掉函数
ws._writableState.getBuffer()//获取内部的缓冲器的大小
ws.cork();
/**
调用 writable.cork() 方法将强制所有写入数据都存放到内存中的缓冲区里。
直到调用 stream.uncork() 或 stream.end() 方法时，缓冲区里的数据才会被输出。
在向流中写入大量小块数据（small chunks of data）时，
内部缓冲区（internal buffer）可能失效，从而导致性能下降。writable.cork() 方法主要就是用来避免这种情况。
对于这种情况， 实现了 writable._writev() 方法的流可以对写入的数据进行缓冲，从而提高写入效率。
 */
ws.uncork()
/**
writable.uncork() 将输出在 stream.cork() 方法被调用之后缓冲在内存中的所有数据
如果使用 writable.cork() 和 writable.uncork() 来管理写入缓存，建议使用 process.nextTick() 来延迟调用 writable.uncork() 方法。
通过这种方式，可以对单个 Node.js 事件循环中调用的所有 writable.write() 方法进行批处理。
stream.cork();
stream.write('some ');
stream.write('data ');
process.nextTick(() => stream.uncork());

如果一个流多次调用了 writable.cork() 方法，那么也必须调用同样次数的 writable.uncork() 方法以输出缓冲区数据。
stream.cork();
stream.write('some ');
stream.cork();
stream.write('data ');
process.nextTick(() => {
  stream.uncork();
  // 之前的数据只有在 uncork() 被二次调用后才会输出
  stream.uncork();
});
 */







