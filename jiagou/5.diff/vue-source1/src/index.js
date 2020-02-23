// 节约性能  先把真是节点 用 一个对象来表示出来 ，在通过对象渲染到页面上
// 前端操作dom的时候 排序 -》正序反序 删除

// diff 新的节点 在生成一个对象

// vue代码基本上不用手动操作dom


// 虚拟dom 只是一个对象
// vue template  render函数  s

// 初始化 将虚拟节点 渲染到页面
// <div id="container"><span style="color:red">hello</span>zf</div>
import {h,render} from './vdom'
let oldVnode = h('div',{id:'container',key:1,class:'abc'},
    h('span',{style:{color:'red',background:'yellow'}},'hello'),
    'zf'
);

let container = document.getElementById('app');
render(oldVnode,container);

// {
//     tag:'div',
//     props:{},
//     children:[{
//         tag:undefined,
//         props:undefined,
//         children:undefined,
//         text:'hello'
//     }]
// }
// <div>hello</div>
// new Vue({
//     render(h){
//         return h('div',{},'hello')
//     }
// })