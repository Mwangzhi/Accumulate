let path=require('path');
path.resolve();//解析绝对路径
path.join();//join就是拼路径用的 可以传递多个参数
path.extname('a.min.js');// 获取文件的后缀名（最后一个.的内容）
path.basename();
path.posix.delimiter //属性值为系统指定的环境变量路径分隔符 window下是分号  maclinux 是:
path.sep//操作系统指定的文件分隔符 //window \  linux /
path.normalize //将非标准的路径字符串转化为标准路径字符串
console.log(path.normalize('./a////b//..\\c//e//..//'));//  \a\c\
path.dirname()//返回指定路径的所在目录












