// 脏值检查 你要先保留一个原有的值 有一个新值
// 上一个例子中是不停的监控新放的值，$watch,$apply,angular.js更新的方式是手动更新，angular有一个scope的概念
// viewModel
function Scope() {
    this.$$watchers = [];
}
Scope.prototype.$digest = function () { //负责检查的
    // 至少执行一次
    var dirty = true; //默认我认为只要调用了$digest方法就应该去查一次
    var count = 9;
    do {
        dirty = this.$digestOne();
        if (count === 0) { //已经查了10次
            throw new Error('10  $digest() iterations reached,Aborting!')
        }
    } while (dirty && count--);
}
Scope.prototype.$digestOne = function () { // 检查一次
    let dirty = false;
    this.$$watchers.forEach(watcher => {
        let oldVal = watcher.last; //老值
        let newVal = this[watcher.exp];
        if (newVal !== oldVal) { // 更新了
            watcher.fn(newVal, oldVal); //调用了fn可能就会更改数据,更改数据就应该在查一遍
            dirty = true;
            watcher.last = newVal; // 更新老值，让老值得值变成最新更改的值，方便下次更新
        }
    });
    return dirty
}
Scope.prototype.$watch = function (exp, fn) {
    // $watch中应该有保留的内容有函数 还有当前的老值，保留一个表达式
    this.$$watchers.push({
        fn,
        last: this[exp],
        exp
    })
};
Scope.prototype.$apply = function () {
    this.$digest()
};
let scope = new Scope();
scope.name = 'wz';
scope.age = 9;
scope.$watch('name', function (newVal, oldVal) {
    console.log(newVal, oldVal);
    scope.name = Math.random()
});
scope.$watch('age', function (newVal, oldVal) {
    scope.name = 'wz number one'
});
scope.age = 10;
// vue Object.defineProperty  proxy+reflect代理，改写原生的方法set方法