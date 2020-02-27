const install = (Vue) =>{
    // 默认我希望可以将这个router放到任何的组件使用
    Vue.mixin({
        beforeCreate(){
            // 判断是不是根
            if(this.$options.router){
                // 保存根实例
                this._routerRoot = this;
                this._router = this.$options.router;

                // 路由的初始化
                this._router.init(this); // 这里的this是根实例
            }else{ // 子组件组件中的属性 是没有router属性的
                // 子组件上都有一个_routerRoot属性可以获取到最顶层的根实例
                this._routerRoot = this.$parent && this.$parent._routerRoot;
                // 如果组件想获取到 根实例中传入的router
                // this._routerRoot._router
            }
        }
    })
}
export default install