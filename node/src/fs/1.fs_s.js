//递归创建目录
let fs = require('fs');
let path = require('path');
function mkdirp(dirs,cb){
  let paths = dirs.split('/');
  !function next(i){
    if(i>paths.length) return cb();
    let current = paths.slice(0,i++).join('/');
    fs.access(current,fs.constants.R_OK,function (err) {
        if(err){
            fs.mkdir(current,()=>next(i));
        }else{
            next(i);
        }
    })
  }(1)
}
mkdirp('a/b/c',function (err) {
    console.log(err);
});

//删除空目录，只能用在空目录上
let fs = require('fs');
function rmdirp(target){
  let files = fs.readdirSync(target);
  files.forEach(function(item){
    let child = target+'/'+item;
    if(fs.statSync(child).isDirectory()){
      rmdirp(child);
    }else{
      fs.unlinkSync(child);
    }
  });
  fs.rmdirSync(target);
}
rmdirp('a');



//异步删除非空目录(Promise版)
function rm(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stat) => {
            if (err) return reject(err);
            if (stat.isDirectory()) {
                fs.readdir(dir, (err, files) => {
                    if (err) return reject(err);
                    Promise.all(files.map(file => rm(path.join(dir,file)))).then(() => {
                        fs.rmdir(dir, resolve);
                    })
                })
            } else {
                fs.unlink(dir, resolve);
            }
        })
    })
}


//异步删除非空目录(广度优先版)
let fs = require('fs');
let path = require('path');

function rmp(dir, callback) {
    let dirs = [dir];
    let index = 0;

    function rmdir() {
        let current = dirs[--index];
        if (current) {
            fs.stat(current, (err, stat) => {
                if (stat.isDirectory()) {
                    fs.rmdir(current, rmdir);
                } else {
                    fs.unlink(current, rmdir)
                }
            })
        }
    }

    !function next() {
        if (index == dirs.length) {
            return rmdir();
        }
        let current = dirs[index++];
        fs.stat(current, function (err, stat) {
            if (err) return callback(err);
            if (stat.isDirectory()) {
                fs.readdir(current, function (err, files) {
                    dirs = [...dirs, ...files.map(item => path.join(current, item))];
                    next();
                })
            } else {
                next();
            }
        })

    }()
}

rmp('a', function (err) {
    console.log(err);
})

//异步删除非空目录(深度优先版)
let fs = require('fs');
let path = require('path');
function rmDirAsync(dir,callback) {
    fs.readdir(dir, 'utf8', function (err, files) {
        !function next(index) {
            if (err) return console.error(err);
            if (files.length == 0 || index >= files.length) {
                fs.rmdir(dir, function (err) {
                    if (err) console.error(err);
                    callback && callback();
                });
            } else {
                let childPath = path.join(dir,files[index])
                fs.stat(childPath, function (err, stats) {
                    if (err) {
                        console.error(err);
                    }
                    if (stats.isDirectory()) {
                        rmDirAsync(childPath,()=>next(index+1))
                    } else{
                        fs.unlink(childPath, function (err) {
                            if (err) {
                                console.error(err);
                            }
                            next(index + 1);
                        });
                    }
                })
            }
        }(0);
    });
}
rmDirAsync('a',()=>{
    console.log('ok');
});

//同步深度优先+先序遍历
function deepSync(dir){
    console.log(dir);
    fs.readdirSync(dir).forEach(file=>{
        let child = path.join(dir,file);
        let stat = fs.statSync(child);
        if(stat.isDirectory()){
            deepSync(child);
        }else{
            console.log(child);
        }
    });
}
//异步深度优先+先序遍历
function deep(dir,callback) {
    console.log(dir);
    fs.readdir(dir,(err,files)=>{
        !function next(index){
            if(index == files.length){
                return callback();
            }
            let child = path.join(dir,files[index]);
            fs.stat(child,(err,stat)=>{
                if(stat.isDirectory()){
                    deep(child,()=>next(index+1));
                }else{
                    console.log(child);
                    next(index+1);
                }
            })
        }(0)
    })
}


// 同步广度优先+先序遍历
function wideSync(dir){
    let dirs = [dir];
    while(dirs.length>0){
        let current = dirs.shift();
        console.log(current);
        let stat = fs.statSync(current);
        if(stat.isDirectory()){
            let files = fs.readdirSync(current);
            files.forEach(item=>{
                dirs.push(path.join(current,item));
            });
        }
    }
}
//异步广度优先+先序遍历

let fs = require('fs');
let path = require('path');
function wide(dir, cb) {
    console.log(dir);
    cb && cb()
    fs.readdir(dir, (err, files) => {
        !function next(i){
            if(i>= files.length) return;
            let child = path.join(dir,files[i]);
            fs.stat(child,(err,stat)=>{
                if(stat.isDirectory()){
                    Wide(child, () => next(i+1));
                } else {
                    console.log(child);
                    next(i+1);
                }
            })
        }(0);
    })

}
wide('a');






