import { Model } from 'mongoose';

let mongoose = require('mongoose');
let db = mongoose.connect("mongodb://user:pass@ip:port/database");
/**
user 用户名
pass 密码
ip IP地址
port 端口号
database 数据库
 */
let connection = mongoose.createConnection("mongodb://127.0.0.1/wz");
connection.on('error', (error) => { })
connection.on('open', () => { })

//创建Schema
var personSchema = new Schema({
    name: String, //姓名
    binary: Buffer,//二进制
    living: Boolean,//是否活着
    birthday: Date,//生日
    age: Number,//年龄
    _id: Schema.Types.ObjectId,  //主键
    _fk: Schema.Types.ObjectId,  //外键
    array: [],//数组
    arrOfString: [String],//字符串数组
    arrOfNumber: [Number],//数字数组
    arrOfDate: [Date],//日期数组
    arrOfBuffer: [Buffer],//Buffer数组
    arrOfBoolean: [Boolean],//布尔值数组
    arrOfObjectId: [Schema.Types.ObjectId],//对象ID数组
    nested: { //内嵌文档
        name: String,
    }
});

//创建Model
//连接数据库
mongoose.connect("mongodb://123.57.143.189:27017/wz");
//两个参数表示定义一个模型
var PersonModel = mongoose.model("Person", PersonSchema);
// 如果该Model已经定义，则可以直接通过名字获取
var PersonModel = mongoose.model('Person');//一个参数表示获取已定义的模型




//创建Entity
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/zfpx");
var PersonSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number, default: 0 }
});
var PersonModel = mongoose.model("Person", PersonSchema);

var PersonEntity = new PersonModel({
    name: "zfpx",
    age: 6
});

PersonEntity.save(function (error, doc) {
    if (error) {
        console.log("error :" + error);
    } else {
        //doc是返回刚存的person对象 
        console.log(doc);
    }
});
//Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作,但Model比Entity可以实现的功能更多


//Model基础操作
/**
Model.find(查询条件,callback);  //查找  
Model.create(文档数据, callback))  //保存
Model.update(查询条件,更新对象,callback); //更新
请注意如果匹配到多条记录，默认只更新一条，如果要更新匹配到的所有记录的话需要加一个参数 {multi:true}
Model.remove(查询条件,callback);

 */

//查询操作
/**
find(Conditions,field,callback)
Model.find({},{name:1,age:1,_id:0},(err,docs)=>{docs为查询结果集})
我们只需要把显示的属性设置为大于零的数就可以，当然1是最好理解的，_id是默认返回，如果不要显示加上("_id":0)

findOne(Conditions,callback)
findById(_id, callback)



$gt\$gte\$lt\$lte   $ne(不等于)  $in(等于)  $or   $exists(是否存在)

Model.find({"age":{"$gt":6,"$lt":9}},function(error,docs){
  //查询所有nage大于6小于9的数据
});

Model.find({ age:{$in:[6,7]}},function(error,docs){
  //可以把多个值组织成一个数组
});

Model.find({"$or":[{"name":"zfpx"},{"age":6}]},function(error,docs){
    //查询name为zfpx或age为6的全部文档
});

Model.find({email: {$exists: false}},function(error,docs){
      //查询所有不存在email属性的文档
});


find(Conditions,fields,options,callback);
Model.find({},null,{limit:20},function(err,docs){
        console.log(docs);
});

Model.find({},null,{skip:4},function(err,docs){
        console.log(docs);
});

Model.find({},null,{sort:{age:-1}},function(err,docs){
      //查询所有数据，并按照age降序顺序返回数据docs
});

Model('User').find({})
  .sort({createAt:-1})
  .skip((pageNum-1)*pageSize)
  .limit(pageSize)
  .populate('user')
  .exec(function(err,docs){
     console.log(docs);
  });
 */





//Entity基础操作
/**
let PersonEntity=new PersonModel({name:'wz,high:175});
PersonEntity.save((error,doc)=>{})
 */
Model.find({ "age": 6 }, (err, docs) => { })
PersonModel.create({ name: 'wz', high: 175 }, (error, doc) => { })
PersonModel.update({ name: 'wz' }, { $set: { age: 100 } }, (error) => { })
PersonModel.remove({ name: 'wz' }, (error) => { })


//populate
var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost:27017/201606blog');
//定义课程Schema
var CourseSchema = new mongoose.Schema({
    name: String
});
var CourseModel = mongoose.model('Course', CourseSchema);
var PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // 外键 别的集合的主键
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course' //指明此外键是哪个集合中的外键
    }
});
var PersonModel = mongoose.model('Person', PersonSchema);
CourseModel.create({ name: 'node.js' }, function (err, course) {
    PersonModel.create({ name: 'zfpx', course: course._id }, function (err, doc) {
        console.log(doc);
        PersonModel.findById(doc._id).populate('course').exec(function (err, doc) {
            console.log(doc);
        })
    })
});


