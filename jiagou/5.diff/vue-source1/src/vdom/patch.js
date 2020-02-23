// 这个文件除了第一次的初始化渲染之外

export function render(vnode,container){ // 让虚拟节点 渲染成真实节点
    let el = createElm(vnode);
    container.appendChild(el);
}
// 创建真实节点
function createElm(vnode){
    let {tag,children,key,props,text} = vnode;
    if(typeof tag === 'string'){
        // 标签  一个虚拟节点 对应着他的真实节点  主要是做一个映射关系
        vnode.el = document.createElement(tag);
        updateProperties(vnode);
        children.forEach(child => { // child是虚拟节点
            return render(child,vnode.el); // 递归渲染当前孩子列表
        });
    }else{
        // 文本
        vnode.el = document.createTextNode(text);
    }
    return vnode.el
}
// 更新属性也会调用此方法  oldProps={a:1,style:{fontSize:18px}}
function updateProperties(vnode,oldProps={}){
    let newProps = vnode.props; // 获取当前老节点中的属性 
    let el = vnode.el; // 当前的真实节点

    let newStyle = newProps.style || {};
    let oldStyle = oldProps.style || {};
    
    // 稍后会用到这个更新操作 主要的作用就是 根据新的虚拟节点 来修改dom元素
    for(let key in oldStyle){
        if(!newStyle[key]){
            el.style[key] = ''
        }
    }
    // 如果下次更新时 我应该用新的属性 来更新老的节点 
    // 如果老的中有属性 新的中没有
    
    for(let key in oldProps){
        if(!newProps[key]){
            delete el[key]; // 如果新的中没有这个属性了 那就直接删除掉dom上的这个属性
        }
    }
    // 我要先考虑一下 以前有没有
    for(let key in newProps){
        if(key === 'style'){ // 如果是style的话 需要再次遍历添加
            for(let styleName in  newProps.style){ // {color:red}
                // el.style.color = 'red'
                el.style[styleName] = newProps.style[styleName]
            }
        }else if(key === 'class'){
            el.className= newProps.class
        }else{ // 给这个元素添加属性 值就是对应的值
            el[key] = newProps[key]
        }
    }
}