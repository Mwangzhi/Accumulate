let fs=require('fs');
//关于文件操作
fs.readFile(path,{encoding:'utf8',flag:'r'},(err,data)=>{})
fs.readFileSync(path,options)

fs.writeFile(file,data,options,callback)
fs.writeFileSync(file,data,options)

fs.appendFile(path,data,{encoding:'utf8',mode:0o666,flag:'a'},(err)=>{})


fs.open(filename,flags,mode,callback)
fs.read(fd,buffer,offset,length,position,callback(err,bytesRead,buffer))
fs.wirte(fd,buffer,offseet,length,position,callback)
fs.close(fd,callback)
fs.fsync(fd,callback)
//读
/**
从 fd 指定的文件中读取数据。

buffer 是数据将被写入到的 buffer。

offset 是 buffer 中开始写入的偏移量。

length 是一个整数，指定要读取的字节数。

position 指定从文件中开始读取的位置。 如果 position 为 null，则数据从当前文件读取位置开始读取，且文件读取位置会被更新。 如果 position 为一个整数，则文件读取位置保持不变。

回调有三个参数 (err, bytesRead, buffer)。
 */

//写
/**
写入 buffer 到 fd 指定的文件。

offset 决定 buffer 中被写入的部分，length 是一个整数，指定要写入的字节数。

position 指向从文件开始写入数据的位置的偏移量
 */






//关于目录操作
fs.mkdir(path,mode,callback)//要求父目录必须存在
fs.access(path,mode,callback)//测试 path 指定的文件或目录的用户权限
fs.readdir(path,options,callback)
fs.stat(path,callback)
fs.rename(oldPath,newPath,callback)
fs.unlink(path,callback)
fs.ftruncate(fd,len,callback)
fs.watchFile(filename,options,listener)

//关于flag的值
r
r+
rs

w
w+
wx
wx+

a
a+
ax
ax+


//助记
r //读取
w //写入
s //同步
+ //增加相反操作
x //排他方式

/**
r+ w+的区别?
当文件不存在时，r+不会创建，而会导致调用失败，但w+会创建。
如果文件存在，r+不会自动清空文件，但w+会自动把已有文件的内容清空。
 */
