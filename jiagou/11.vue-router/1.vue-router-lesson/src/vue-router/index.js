// 入口文件
// 这里应该导出一个类这个类上应该有有一个install方法
import createMatcher from './create-matcher';
import install from './install'
class VueRouter {
    constructor(options){ 
        // matcher 匹配器  处理树形结构 将他扁平化

        // 这里会返回两个方法 addRoute   match 匹配对应的结果
        this.matcher = createMatcher(options.routes || [])
        console.log(options); // 1) 默认需要先进行数据的格式化
    }
    init(app){ // 初始化方法
        // app 是最顶层的vue的实例
        console.log(app)
    }
}

VueRouter.install = install


export default VueRouter