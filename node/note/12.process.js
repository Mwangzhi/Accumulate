process.memoryUsage()
process.nextTick()//nextTick方法用于将一个函数推迟到代码中所书写的下一个同步方法执行完毕或异步方法的回调函数开始执行前调用
process.chidr()//chdir方法用于修改Node.js应用程序中使用的当前工作目录，使用方式如下
process.cwd()//cwd方法用返回当前目录，不使用任何参数
process.exit();//退出运行Node.js应用程序的进程
process.uptime();//返回当前程序的运行时间
process.on('exit', function () {
    console.log('Node.js进程被推出');
});
//标准输出流其实是可读流，标准输入流其实是可写流

/**
 测试一个代码段的运行时间,返回两个时间，第一个单位是秒，第二个单位是纳秒
let fs = require('fs);
let time = process.hrtime();
let data = fs.readFileSync('index.txt');
let diff = process.hrtime(time);
console.log(`读文件操作耗费的%d秒`,diff[0]);

 */

//child_process
/**
child_process.spawn(command,args,options)
options{
    cwd:
    env:
    detached: 如果为true,该子进程是一个进程组中的领头进程，当父进程不存在时也可以独立存在
    stdio:[] //pipe\ipc\ignore\stream\null\undefined
}


child_process.fork(modulePath,args,options)
options{
    cwd:
    env:
    encoding:
    silent:false
}
child.send(message,sendHandle)
process.send(message,sendHandle)
process.on('message',function(m,setHandle){})
父子进程共享HTTP服务器、socket对象


child_process.exec(command,options,callback)

child_process.execFile(file,args,options,callback)

cluster

 */


























