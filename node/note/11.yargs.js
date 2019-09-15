/**
linux的chmod命令：
http://www.runoob.com/linux/linux-comm-chmod.html
Linux/Unix 的文件调用权限分为三级 : 文件拥有者u、群组g、其他o、三者全是a
u 表示该文件的拥有者，g 表示与该文件的拥有者属于同一个群体(group)者，o 表示其他以外的人，a 表示这三者皆是。
+ 表示增加权限、- 表示取消权限、= 表示唯一设定权限。
r 表示可读取，w 表示可写入，x 表示可执行，X 表示只有当该文件是个子目录或者该文件已经被设定过为可执行。

r=4，w=2，x=1
若要rwx属性则4+2+1=7；
若要rw-属性则4+2=6；
若要r-x属性则4+1=5。

查看文件权限
ls -l

获取命令行参数。
process.argv
实例：
当在cmd里执行一个命令a，传递了3个参数，分别为hello、world、hi
a hello world hi
a命令执行的那个文件中就可以通过process.argv获取到参数，结果如下
[ 'D:\\SoftWare\\NODE\\node.exe',
  'C:\\Users\\wz\\AppData\\Roaming\\npm\\node_modules\\aaaa\\1.yargs.js',
  'hello',
  'world',
  'hi'
]

let yargs=require('yargs')
let argv=yargs.alias('n','name').argv; //别名

.alias()   //别名
.demand() //是否必选
.default()  //默认值
.describe()  //描述
.boolean()
.option('n',{
  alias:'name',
  demand:true,
  default:'',
  describe:'',
  type:'string',
  boolean:true
})
.usage()   //用法格式
.example()  //提供例子
.help()  //显示帮助信息
.epilog() //出现在帮助信息的结尾
.argv


argv._  //获取非连词线开头的参数
 */
