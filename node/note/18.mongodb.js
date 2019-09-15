/**
//启动mongodb数据库服务
mongod --dbpath=D:\Mongodb\data
注意：D:\Mongodb\data为已经创建好的文件夹的路径。




启动客户端链接服务器
在mongodb安装目录下(一般是C:\Program Files\MongoDB 2.6 Standard\bin)，按下shift+右键
mongo --host=127.0.0.1 //本地服务器




db代表当前数据库
1、use wz 
2、show dbs  //查看所有的数据库
   show roles //参看角色
3、db或db.getName() //查看当前使用的数据库
4、db.wz.insert({name:'wz',high:175})
5、db.dropDatabase() //删除数据库
6、db.wz.help() //查看集合帮助
7、show collections //查看数据库下的集合
8、db.createCollection(collection_name)  //创建一个空集合
9、db.collection_name.insert(document)  //创建集合并插入一个文档
10、db.collection_name.insert(document)  //插入一个文档
11、db.collection_name.save(document) //如果不指定 _id 字段 save() 方法类似于 insert() 方法。如果指定 _id 字段，则会更新该 _id 的数据。
12、db.collection.update(
   <query>, //查询条件
   <updateObj>, //更新对象
   {
     upsert: <boolean>,//没找到是否插入
     multi: <boolean> //是否更新全部
   }
)
13、db.collection.remove(
   <query>,
   {
     justOne: <boolean>
   }
)
14、db.collection_name.find() //查询文档
    db.student.find({age:{$not:{$gte:20,$lte:30}}});
15、db.collection_name.find({queryWhere},{key:1,key:1})//查询指定列  1表示显示
16、db.collection_name.findOne()
17、条件操作符：
$gt-------大于
$gte------大于等于
$lt-------小于
$lte------小于等于
18、db.students.find({_id:ObjectId("5adb666ecd738e9771638985")});//根据_id查找
19、db.collectoin_name.find().count() // 查询结果集的条数
20、db.collection.find({key:/value/})  //正则匹配
21、db.collection_name.find(
   {
      $or: [
   {key1: value1}, {key2:value2}
      ]
   }
)
22、db.collectoin_name.find().limit(number) //读取指定数量的数据记录
23、db.collectoin_name.find().skip(number) //跳过指定数量的数据，skip方法同样接受一个数字参数作为跳过的记录条数
24、db.collectoin_name.find().skip(skipNum).limit(limitNum) //通常用这种方式来实现分页功能
25、db.collectoin_name.find().sort({key:1}) //sort()方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而-1是用于降序排列
26、db.createUser({  //新的创建用户的方法
    user:"zfpx2",
    pwd:"123456",
    roles:[
        {
            role:"readWrite",
            db:"school"
        },
        'read'
   ]
})
27、db.runCommand({usersInfo:'zfpx2',showPrivileges:true}) //查看用户的权限
28、服务器启动权限认证
dbpath=E:\mongo\data
logpath=E:\mongo\log
port=50000
auth=true
29、用户登录和修改密码 
db.changeUserPassword('zfpx','123')
db.auth('zfpx','123')
30、修改个人信息
use admin
db.runCommand({updateUser:'zfpx',pwd:'123', customData:{
        name:'珠峰培训',
        email:'zfpx@126.com',
        age:18,
}});
db.runCommand({usersInfo:'zfpx',showPrivileges:true})







Mongodb启动命令mongod参数说明
--port
--dbpath
--logpath
--logappend
--directoryperdb 
--auth  //以安全方式启动数据库，默认不验证
--config   //文件名为mongo.conf
--fork //以后台守护的方式进行启动
--master


1、mongoexport -h 127.0.0.1 --port 50000  -d school -c students -o stu.bak //备份记录
2、mongoimport --port 50000 --db school --collection students --file stu.bak //导入记录



在Mongodb中我们使用mongodump命令来备份MongoDB数据。该命令可以导出所有数据到指定目录中。
mongodump  -d school -o data.dmp


锁定和解锁数据库
db.runCommand({fsync:1,lock:1});
db.fsyncUnlock();


//主从复制
主数据库服务器：
master.conf:
dbpath=E:\ms\master
prot=1000
master=true

master.bat:
mongod --config master.conf


从数据库服务器：
slave.conf
dbpath=E:\p\slave
prot=1001
slave=true
source=127.0.0.1:1000

slave.bat:
mongod --config slave.conf
rs.slaveOk();


//利用shell动态添加和删除主节点
use local;
show collections;
db.sources.find();
//{  "host" : "127.0.0.1:8000", "source" : "main", "syncedTo" : Timestamp(1524728329, 1) }
db.sources.insert({host:'127.0.0.1:8000'});//挂载主节点
db.sources.remove({host:'127.0.0.1:8000'});//删除已经挂载的主节点











 */