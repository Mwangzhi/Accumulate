/**
 * 可读流测试单元
let ReadStream = require('./1.ReadStream_s');
let path = require('path');
let filePath = path.join(__dirname, 'a.txt')
let rs = new ReadStream(filePath,{
    encoding:'utf8',
    flag:'r',
    mode:0o666,
    start:0,
    autoClose:true
})
let str=''
rs.on('open',()=>{
    console.log('open')
})
rs.on('data',(data)=>{
    console.log(data);
})
rs.on('end',()=>{
    console.log('end')
})
rs.on('close',()=>{
    console.log('close')
})
 */


/**
 * pipe方法测试单元
 let ReadStream = require('./1.ReadStream_s');
let WriteStream = require('./3.WriteStream_s')
let path = require('path');
let filePath_r = path.join(__dirname, 'a.txt')
let filePath_w = path.resolve(__dirname, 'b.txt');
let rs = new ReadStream(filePath_r,{
    encoding:'utf8',
    flag:'r',
    mode:0o666,
    start:0,
    autoClose:true
})

let ws=new WriteStream(filePath_w,{
    flags:'w',
    mode:0o666,
    highWaterMark:16*1024,
    start:8
})
rs.pipe(ws)
 */




/**
 * 可写流测试单元
let WriteStream = require('./3.WriteStream_s')
let path = require('path');
let filePath = path.resolve(__dirname, 'b.txt');
let ws=new WriteStream(filePath,{
    flags:'w',
    mode:0o666,
    highWaterMark:16*1024,
    start:8
})
ws.write('abcdefg','utf8',()=>{console.log('写入成功')})
ws.on('drain',()=>{console.log('drain')})
 */























