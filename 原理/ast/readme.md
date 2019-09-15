### esprima
```
let esprima=require('esprima')
let options={
    jsx:false,//是否解析jsx语法
    range:false,//是否显示代码范围
    loc:false,
    tolerant:false,
    tokens:false,
    comment:false
}
esprima.parseScript(code,options,callback)
esprima.parseModule()
```
### estraverse
```
let estraverse=require('estraverse')
let options={
    enter(node,parent){
        this.skip()
        this.break()
    },
    leave(){

    },
    //跳过某些节点
    fallback(node){

    },
    //By passing visitor.keys mapping, we can extend estraverse traversing functionality.
    keys:{}
}

estraverse.traverse(ast,options)
```
### escodegen
```
let escodegen=require('escodegen')
escodegen.generate(AST[, options]);
```

实例名称：wangzhi
登陆密码：WANGzhi0525
远程连接密码：161116
172.17.91.134
