import Vue from 'vue'
import Router from './vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
// 用了这个插件之后
// 会给每个组件都增加两个属性 $route 放的所有路由相关的属性 $router 放了一些方法 Vue.prototype
// 还提供了两个组件 router-view,router-link Vue.component
Vue.use(Router);

export default   new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component:About,
      children:[
         {
           path:'a', // 这个路径前面不能加/
           component:{
             render(h){return <h1>this is an about/a</h1>}
           }
         },
         {
          path:'b', // 这个路径前面不能加/
          component:{
            render(h){return <h1>this is an about/b</h1>}
          }
        }
      ]
    }
  ]
})
