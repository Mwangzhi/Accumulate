let { spawn,fork } = require('child_process');
let path = require('path');

let p1=spawn('node',['test1.js','a','b','c'],{
    cwd:path.join(__dirname)
})

p1.on('error',function(){
    console.log('p1 err')
})

let p2=spawn('node',['test2.js'],{
    cwd:path.join(__dirname),
    stdio:'pipe'
})
p1.stdout.on('data',function(data){
    console.log('p1:子进程的标准输出：'+data);
    p2.stdin.write(data);
})

p2.on('error',function(){
    console.log('p2 err')
})