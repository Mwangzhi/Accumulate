
let VNODE_TYPE = 'VNODE_TYPE';
function isSameVnode(oldVnode, newVnode) {
    return oldVnode.key === newVnode.key && oldVnode._type === newVnode._type;
}
function isVnode(vnode) {
    return vnode && vnode._type === VNODE_TYPE;
}
function vnode(type, key, props = {}, children, text, DOMElement) {
    return {
        _type: VNODE_TYPE,
        type, key, props, children, text, DOMElement
    }
}

function patch(newVnode, oldVnode) {
    //如果新旧节点类型不一样，直接替换。
    if (newVnode.type !== oldVnode.type) {
        return oldVnode.domElement.parentNode.replaceChild(createDOMElementForVnode(newVnode));
    }
    //如果新节点是文本节点，那么直接修改内容
    if (typeof newVnode.text !== undefined) {
        return oldVnode.domElement.textContent = newVnode.text;
    }
    //dom节点复用，oldVnode.domElement是已经创建好的，直接赋值给newVnode，达到了复用。
    let domElement = newVnode.domElement = oldVnode.domElement;
    //更新节点属性
    updateProperties(newVnode, oldVnode.props);
    let oldChildren = oldVnode.children;
    let newChildren = newVnode.children;
    //新旧节点都有子节点，进一步比较
    if (oldChildren.lenth > 0 && newChildren.length > 0) {
        updateChildren(domElement, oldChildren, newChildren);
    }
    //只有旧节点有子节点，删除
    else if (oldChildren.length > 0) {
        oldVnode.domElement.innerHTML = '';
    }
    //只有新节点有子节点,添加
    else if (newChildren.length > 0) {
        for (let child of newChildren) {
            oldVnode.domElement.appendChild(createDOMElementForVnode(child));
        }
    }
}
//创建key到index的映射
function createKey2IndexMap(children) {
    let map = {};
    for (let i = 0; i < children.length; i++) {
        let key = children[i].key;
        if (key) map[key] = i;
    }
    return map;
}
//新旧节点都有子节点时的细致比较
/* 
        旧节点          新节点
          头     --->    头
          尾     --->    尾
          头     --->    尾
          尾     --->    头
        其他情况(通过key找到已经存在节点)
*/
function updateChildren(parentDOMElement, oldChildren, newChildren) {
    let oldStartIndex = 0, oldStartVnode = oldChildren[0];
    let oldEndIndex = oldChildren.length - 1, oldEndVnode = oldChildren[oldEndIndex - 1];
    let newStartIndex = 0, newStartVnode = newChildren[0];
    let newEndIndex = newChildren.length - 1, newEndVnode = newChildren[newEndIndex];
    let oldKey2IndexMap = createKey2IndexMap(oldChildren);
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if (!oldStartVnode) {
            oldStartVnode = oldChildren[++oldStartIndex];
        } else if (!oldEndVnode) {
            oldEndVnode = oldChildren[--oldEndIndex];
        }
        if (isSameVnode(oldStartVnode, newStartVnode)) {
            patch(oldStartVnode, newStartVnode);
            oldStartVnode = oldChildren[++oldStartIndex];
            newStartVnode = newChildren[++newStartIndex];
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
            patch(oldEndVnode, newEndVnode);
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
            patch(oldStartVnode, newEndVnode);
            parentDOMElement.insertBefore(oldStartVnode.domElement, oldEndVnode.domElement.nextSibling);
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
            patch(oldEndVnode, newStartVnode);
            parentDOMElement.insertBefore(oldEndVnode, domElement, oldStartVnode.domElement);
            oldEndVnode = oldChildren[--oldEndIndex];
            newStartVnode = newChildren[++newStartIndex];
        } else {
            let oldIndexByKey = oldKey2IndexMap[newStartVnode.key];
            if (oldIndexByKey == null) {
                parentDOMElement.insertBefore(createDOMElementForVnode(newStartVnode), oldStartVnode.domElement);
                newStartVnode = newChildren[++newStartIndex];
            } else {
                let oldVnodeToMove = oldChildren[oldIndexByKey];
                if (oldVnodeToMove.type !== newStartVnode.type) {
                    parentDOMElement.insertBefore(createDOMElementForVnode(newStartVnode), oldStartVnode.domElement);
                } else {
                    patch(oldVnodeToMove, newStartVnode);
                    oldChildren[oldIndexByKey] = undefined;
                    parentDOMElement.insertBefore(oldVnodeToMove.domElement, oldStartVnode.domElement);
                }
                newStartVnode = newChildren[++newStartVnode];
            }
        }
        if (newStartIndex <= newEndIndex) {
            let beforeDOMElement = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].domElement;
            for (let i = newStartIndex; i <= newEndIndex; i++) {
                parentDOMElement.insertBefore(createDOMElementForVnode(newChildren[i]), beforeDOMElement);
            }
        }
        if (oldStartIndex <= oldEndIndex) {
            for (let i = oldStartIndex; i <= oldEndIndex; i++) {
                if (oldChildren[i]) {
                    parentDOMElement.removeChild(oldChildren[i].domElement);
                }
            }
        }
    }
}
function createDOMElementForVnode(vnode) {
    let children = vnode.children;
    let type = vnode.type;
    let props = vnode.props;
    if (type) {
        let domElement = vnode.domElement = document.createElement(type);
        updateProperties(vnode);
        if (Array.isArray(children)) {
            children.forEach((childVnode) => {
                domElement.appendChild(createDOMElementForVnode(child));
            })
        }
    } else {
        vnode.domElement = document.createTextNode(vnode.text);
    }
    return vnode.domElement;
}
function mount(vnode, root) {
    let newDOMElement = createDOMElementForVnode(vnode);
    root.appendChild(newDOMElement);
}

function updateProperties(vnode, oldProps = {}) {
    let domElement = vnode.domElement;
    let newProps = vnode.props;
    let oldStyle = oldProps.style || {};
    let newStyle = newProps.style || {};
    for (let oldAttrName in oldStyle) {
        if (!newStyle[oldAttrName]) {
            domElement.style[oldAttrName] = '';
        }
    }
    for (let oldPropName in oldProps) {
        if (!newProps[oldPropName]) {
            delete domElement[oldPropName];
        }
    }
    for (let propName in newProps) {
        if (propName == 'style') {
            let styleObject = newProps[propName];
            for (let attr in styleObject) {
                domElement.style[attr] = styleObject[attr];
            }
        } else {
            domElement[propName] = newProps[propName];
        }
    }
}