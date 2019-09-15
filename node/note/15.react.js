//模拟render方法
render({
    type: 'div',
    props: {
        children: [{}, {}, {}],
        className: 'active',
        style: { color: 'red' }
    }
}, '#app');

let render = function (eleObj, container) {
    let { type, props } = eleObj;
    let elementNode = document.createElement(type);
    for (let attr in props) {
        if (attr === 'children') {
            if (typeof props[attr] === 'object') {
                props[attr].forEach(item => {
                    if (typeof item === 'object') {
                        render(item, elementNode)
                    } else {
                        elementNode.appendChild(document.createTextNode(item))
                    }
                })
            }
        } else if (attr === 'className') {
            elementNode.setAttribute('class', props[attr])
        } else {
            elementNode.setAttribute(attr, props[attr]);
        }
    }
}

import PropTypes from 'prop-types';
class School extends React.Component {
    static propTypes = {
        age: PropTypes.number.isRequired
    }
    static defaultProps = {
        name: 'wz'
    }
}

//setState()用法：
setState({}, function () { })// 参数1为状态，参数2为修改状态后的回调
setState(function (preState) { }) //传递一个函数，参数为上一次的状态

//react生命周期
//componentWillMount
//render
//componentDidMount
//shouldComponentUpdate
//componentWillUpdate
//componentDidUpdate
//componentWillReceiveProps
//componentWillUnmount

//vue生命周期
// beforeCreate
// create
// beforeMount
// mounted
// beforeUpdate
// updated
// beforeDestroy
// destroyed

//在某些场景下，你想在整个组件树中传递数据，
//但却不想手动地在每一层传递属性。你可以直接在 React 中使用强大的”context” API解决上述问题
/**
第一步：在父组件中声明类型，定义方法
static childContextTypes={
    color:PropTypes.string,
    changeColor:PropTypes.func
}
getChildContext(){
    return {
        color:this.state.color,
        changeColor:(color)=>{
            this.setState({color})
        }
    }
}
第二步：子组件如果想用，需要声明contextTypes,然后就可以通过this.context.使用了
static contextTypes={
    color:PropTypes.string,
    changeColor:PropTypes.func
}
this.context.color
this.context.changeColor('red')
 */

//React.Fragment片段组件
/**
<React.Fragment>
    <li></li>
</React.Fragment>
 */



// Portals 提供了一种很好的方法，将子节点渲染到父组件 DOM 层次结构之外的 DOM 节点。
// ReactDOM.createPortal(child, container)

//错误边界  其实就是多了一个componentDidCatch(err,info)函数
/**
import React from 'react';
import ReactDOM from 'react-dom';
class ErrorBoundary extends React.Component{
    constructor(props) {
        super(props);
        this.state={hasError:false};
    }
    componentDidCatch(err,info) {
        this.setState({hasError: true});
    }
    render() {
        if (this.state.hasError) {
            return <h1>Something Went Wrong</h1>
        }
        return this.props.children;
    }
}

class Page extends React.Component{
    render() {
        return (
            <ErrorBoundary>
                <Clock/>
            </ErrorBoundary>
        )
    }
}
class Clock extends React.Component{
    render() {
        return (
            <div>hello{null.toString()}</div>
        )
    }
}

ReactDOM.render(<Page/>,document.querySelector('#root'));
 */


//高阶组件



