
class Google{
    constructor() { }
    get() {
        return 'google'
    }
}
class Proxy{
    constructor() {
        this.google=new Google()
    }
    get() {
        return this.google.get()
    }
}
let proxy = new Proxy()
let ret = proxy.get()
console.log(ret)

//场景
//1、事件委托、代理跨域、缓存
