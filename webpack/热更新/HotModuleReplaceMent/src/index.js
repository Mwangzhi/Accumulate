
import './client.js';
let root = document.getElementById('root');

function render() {
    let title = require('./title').default;
    root.innerHTML = title
}
render()
if (module.hot) {
    //如果此模块依赖的title模块发生了变化，那么重新执行render函数
    module.hot.accept(['./title'], render)
}





















