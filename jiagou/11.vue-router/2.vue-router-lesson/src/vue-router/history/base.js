export function createRoute(record,location) {
    // 根据路径 算出匹配到了几个记录
    let res = []; // 如果匹配到了路径 需要将这个路径都放进来
    if(record){
       while (record) { // /about/a  /about /about/a
        res.unshift(record);
        record = record.parent
       }
    } 
    return {
        ...location,
        matched:res
    }
}
// 
class History {
    constructor(router){
        this.router = router;
        this.current = createRoute(null,{
            path:'/' // 默认路由就是/
        });
    }
    transitionTo(location,callback){ // 最好屏蔽一下 如果多次调用 路径相同不需要跳转
        // 需要根据路径 获取到对应的组件
        let r = this.router.match(location)
        // *****
        // this.current = r;
        callback && callback();
    }
    setupListener(){
        window.addEventListener('hashchange',()=>{
            this.transitionTo(window.location.hash.slice(1));
        })
    }
}

export default History