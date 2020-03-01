import createApp from './app.js';

// 这里服务端渲染要求打包后的结果需要返回一个函数

// 服务端稍后会调用函数 传递一些参数到这个函数中
export default (context)=>{
    let {app,router} = createApp();
    router.push(context.url); // 渲染时 先让路由跳转到当前客户请求的路径
    // router路由对象
    return app; // 已经渲染完成了 把当前路径对应的内容渲染好了
}