let zlib = require('zlib');
let fs = require('fs');
let path = require('path');
//压缩和解压缩对象都是一个可读可写流

//作为流时的使用方法
function zip(src) {
    let gzip = zlib.createGzip();
    let inputStream = fs.createReadStream(src);
    let outputStream = fs.createWriteStream(src + '.gz');
    inputStream.pipe(gzip).pipe(outputStream);
}
function unzip(src) {
    let gunzip = zlib.createGunzip();
    let inp = fs.createReadStream(src);
    let out = fs.createWriteStream(src.slice(0, -3));
    inp.pipe(gunzip).pipe(out)
}
let src=path.join(__dirname,'a.txt.gz')
//zip(src)
//unzip(src)

//作为方法时的使用方法
let b=Buffer.from('wangzhi')
zlib.gzip(b,(err,buffer)=>{
    if(!err){
        zlib.unzip(buffer,(err,res)=>{
            console.log(res.toString());//wangzhi
            
        })
    }
})
//第一组
zlib.gzip();
zlib.gzipSync();
zlib.gunzip();
zlib.gunzipSync();

//第二组
zlib.inflate();
zlib.inflateSync();
zlib.deflate();
zlib.deflateSync();

//第三组
zlib.inflateRaw();
zlib.inflateRawSync();
zlib.deflateRaw();
zlib.deflateRawSync();

//第四组
zlib.unzip()
zlib.unzipSync()


//作为流时的使用方法

zlib.createGzip();
zlib.createGunzip();

zlib.createInflate();
zlib.createDflate();

zlib.createInflateRaw();
zlib.createDeflateRaw();

zlib.createUnzip();

let thunk = function({getState,dispatch}){
    return function(next){
        return function(action){
           if(typeof action == 'function'){
                action(dispatch,getState);
           }else{
               next(action);
           }
        }
    }
}