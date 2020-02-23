let Vue;
let forEach = (obj,callback) =>{
    Object.keys(obj).forEach(key=>{
        callback(key,obj[key]);
    })
}
class ModuleCollection{
    constructor(options){
        // 深度遍历将所有的子模块都遍历一遍 
        this.register([],options); 
    }
    register(path,rootModule){
        let rawModule = {
            _raw:rootModule,
            _children:{},
            state:rootModule.state
        }
        if(!this.root){
            this.root = rawModule
        }else{
            // 不停的找到要定义的模块 将这个模块定义到他的父亲上
            let parentModule = path.slice(0,-1).reduce((root,current)=>{
                return root._children[current];
            },this.root);
            parentModule._children[path[path.length-1]] = rawModule
        }
        if(rootModule.modules){
            forEach(rootModule.modules,(moduleName,module)=>{
                // 将a模块进行注册 [a], a模块的定义
                // 将b模块进行注册 [b], b模块的定义

                // 将c 模块进行注册 [b,c] c模块的定义
                // [b,c,e]
                this.register(path.concat(moduleName),module)
            })
        } 
    }
}
class Store{ // 用户获取的是这个Store类的实例
    constructor(options){
        // 获取用户new 实例时传入的所有属性
        this.vm = new Vue({ // 创建vue的实例 保证状态更新可以刷新视图
            data:{ // 默认这个状态 会被使用Object.defineProperty重新定义
                state: options.state
            }
        });
        // let getters = options.getters; // 获取用户传入的getters
        this.getters = {};
        this.mutations = {};
        this.actions = {};
 
        // 我需要将用户传入的数据进行格式化操作

        this.modules = new ModuleCollection(options)
        console.log(this.modules)

        // -----------------

        // 遍历对象的功能非常的常用
        // forEach(getters,(getterName,value)=>{
        //     Object.defineProperty(this.getters ,getterName,{
        //         get:()=>{
        //             return value(this.state)
        //         }
        //     })
        // });
        // 我需要将用户定义的mutation 放到store上  订阅 将函数订阅到一个数组中 发布 让数组中的函数依次执行
        // let mutations = options.mutations;
        
        // forEach(mutations,(mutationName,value)=>{
        //     this.mutations[mutationName] = (payload) =>{ // 订阅
        //         value(this.state,payload);
        //         // todo.... 
        //     }
        // });
        // let actions = options.actions;
        
        // forEach(actions,(actionName,value)=>{ // 最后我们会做一个监控 看一下是不是异步方法都在action中执行的不是在mutation中执行的
        //     this.actions[actionName] = (payload)=>{
        //         value(this,payload);
        //     }
        // })
    }
    commit = (mutationName,payload) => { // es7 的写法 这个里面的this 永远指向当前的store的实例
        this.mutations[mutationName](payload); // 发布
    }
    dispatch = (actionName,payload) =>{ // 发布的时候回找到对应action执行
        this.actions[actionName](payload);
    }
    // es6 中类的访问器
    get state(){ // 获取实例上的state属性就会执行此方法
        // todo..
        return this.vm.state
    }
}

// 官方api
const install = (_Vue) =>{ // Vue的构造函数
    Vue = _Vue; // vue的构造函数
    // 放到vue的原型上 不对 因为默认会给所有的实例增加
    // 只从当前的根实例开始 所有根实例的子组件才有$store方法

    Vue.mixin({ // 组件的创建过程是先父后子
        beforeCreate(){
            // 把父组件的store属性 放到每个组件的实例上
            if(this.$options.store){ // 根实例
                this.$store = this.$options.store
            }else{
                this.$store = this.$parent && this.$parent.$store
            }
        }
    }) // 抽离公共的逻辑 放一些方法
}
export default {
    Store,
    install
}