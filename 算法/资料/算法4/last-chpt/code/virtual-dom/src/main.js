/**
 * 以下的代码模拟React的基本操作，setState进行组件更新
 * Component类代表React.Component
 * render函数代表ReactDOM.render方法
 */
import dom from './dom'
import VDOM from './virtual-dom';


/**
 * 类似React的Component组件的父组件
 */
class Component {

  constructor(){

  }

  /**
   * 更新DOM节点
   */
  update(vdom){
    // 作为一个组件， render函数要求每次只render一个节点，
    // 作为算法提供方，这个条件可以放开，比如允许
    // render(){
    //   return [<div />, <div />]
    // }
    // 目前这里还可以优化
    const childVDOM = this.vdom.children[0]
    const updates = childVDOM.diff(vdom)
    childVDOM.apply(updates)
  }


  setState(nextState, callback) {
    // 保存当前状态，用于回滚
    const currentState = this.state


    // 更新状态，进行渲染
    if(!this.render) {
      throw '组件没有定义render方法'
    }

    try{
      this.state = nextState
      const childVdom = this.render()
      this.update(childVdom)
      callback && callback()
    }catch(ex) {
      console.error(ex)
      // 发生异常回滚状态
      this.state = currentState
    }
  }


  /**
   * 渲染成DOM节点， 兼容vdom的方法
   */
  renderToDomNode(){
    const vdom = this.render()
    if(this.vdom) {
      this.vdom.children.push(vdom)
      vdom.p = this.vdom
    }
    return vdom.renderToDomNode()
  }
}


/**
 * 类似ReactDOM.render方法
 */
function render(component, domNode){
  component.appendToDOMNode(domNode)
}


class Counter extends Component{

  constructor(){
    super()
    this.state = {
      count : 0
    }
  }

  handleClick = (e) => {
    this.setState({
      count : this.state.count + 1
    })
  }


  render(){
    return <div>
      <h1>这是一个计数器 : {this.state.count}</h1>
      <button onClick={this.handleClick}>+1</button>
    </div>
  }
}


render(<Counter />, document.body)









