let Vue;
class Store{ // 用户获取的是这个Store类的实例
    constructor(options){
        // 获取用户new 实例时传入的所有属性
        this.vm = new Vue({ // 创建vue的实例 保证状态更新可以刷新视图
            data:{ // 默认这个状态 会被使用Object.defineProperty重新定义
                state: options.state
            }
        })
    }
    get state(){ // 获取实例上的state属性就会执行此方法
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