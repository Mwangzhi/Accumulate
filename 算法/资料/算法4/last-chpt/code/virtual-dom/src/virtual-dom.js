import EditDistance from './edit_distance'
import shadow_compare from './shadow_compare'

const REPLACE_ALL = 1 // 替换全部
const REPLACE = 2 // 仅仅替换属性
const REPLACE_CHILDREN = 3 // 使用edit-distance的结果对children进行变更


/**
 * virtual-dom
 */
export default class VDOM {

  constructor(componentType, props, ...args) {

    this.componentType = componentType
    this.props = props || {}
    // 有的节点会附有文本
    this.innerText = null
    this.children = [].concat(...args)


    /* 为子节点绑定 parentNode */
    if (this.children.length === 1 && typeof this.children[0] === 'string') {
      this.innerText = this.children[0]
      this.children = []
    } else {
      this.children = this.children.map(vdom => {
        if (typeof vdom === 'string' || typeof vdom === 'number') {
          vdom = new VDOM('text', { text: vdom + '' })
        }
        vdom.p = this
        return vdom
      })
    }

  }

  diff(v2) {
    return this.__diff(this, v2)
  }

  /**
   * 比较两个虚拟节点并生成操作序列
   * 因为是深度优先搜索，所以得到的更新序列是从底
   * 向上的
   */
  __diff(v1, v2) {

    // console.log('diff', v1.componentType, v2.componentType)
    let updates = []

    // 比较两个dom节点， 然后初步确定一个更新策略
    // 如果componentType不同，那么就不需要再比较下去，
    // 当然componentType也可能是某个构造函数
    if (v1 === v2) { return updates }
    if (v1 === null || v2 === null || v1.componentType !== v2.componentType) {
      updates.push({
        type: REPLACE_ALL,
        from: v1,
        to: v2
      })
      return updates
    }

    // 浅比较属性，如果不一致那么进行属性的更新
    if (!shadow_compare(v1.props, v2.props) || (v1.innerText !== v2.innerText)) {
      updates.push({
        type: REPLACE,
        from: v1,
        to: v2
      })
    }

    // 先使用edit_distance算法比较所有子元素
    const editDistance = new EditDistance(
      v1.children,
      v2.children,
      (a, b) => {
        if (a === b) { return true }
        if (a === null || b === null) { return false }
        if (a.componentType !== b.componentType) { return false }
        return shadow_compare(a.props, b.props) && (a.innerText === b.innerText)
      }
    )

    editDistance.find()

    // 计算完成的修改序列，根据这个修改序列可以继续向下递归
    const seq = editDistance.edit_seq()



    let op = null

    const delOrIns = seq.filter(x => x.type === 1 || x.type === 2)
    const replaceOrUnChange = seq.filter(x => x.type === 0 || x.type === 3)

    delOrIns.length > 0 && updates.push({
      type: REPLACE_CHILDREN,
      seq: delOrIns
    })


    // 对所有不需要del和ins的节点都需要
    // 进行递归计算子元素的更新序列
    for (let op of replaceOrUnChange) {
      updates = updates.concat(this.__diff(op.from, op.to))
    }



    return updates
  }

  /**
   * 应用更新
   * @param {*} updates
   */
  apply(updates) {
    updates.forEach(update => {
      switch (update.type) {
        case REPLACE: {
          const { from, to } = update
          from.updateProps(to)
          break
        }
        case REPLACE_CHILDREN: {

          const { seq } = update

          seq.forEach(op => {

            switch (op.type) {
              case 1: //delet
                this.delete(op.at)
                break
              case 2: { // insert
                this.insert(op.at, op.item)
                break
              }
            }

          })
          break
        }
        case REPLACE_ALL: {
          const { from, to } = update
          this.transplant(from, to)
          break
        }

      }
    })
  }

  /**
   * 将虚拟DOM节点渲染成DOM节点
   * 如果componentType是字符串，说明是类似div,h1,p等原有的html标签
   * 如果是其他类型，那么说明是某个VirtualDOM类型，这个类型应该
   * 拥有renderToDOM方法，那么递归利用。
   */
  renderToDomNode() {
    let node = null
    if (typeof this.componentType === 'string') {

      node = null
      if (this.componentType === 'text') {
        node = document.createElement('span')
        node.innerHTML = this.props.text
      } else {
        node = document.createElement(this.componentType)
      }

      /* 处理 style & class */
      if (this.props.style) {
        for (let key in this.props.style) {
          node.style[key] = this.props.style[key]
        }
      }

      this.props.class && (node.className = this.props.class)

      if (this.innerText) {
        node.innerHTML = this.innerText
      } else {
        this.children.map(vdom => {
          node.appendChild(vdom.renderToDomNode())
        })
      }

      // 处理消息 （目前只处理了点击)
      // TODO: 处理更多的消息
      if (this.props.onClick) {
        node.addEventListener('click', this.props.onClick)
      }
    } else {
      const component = new this.componentType(this.props)
      component.vdom = this
      node = component.renderToDomNode()
    }
    this.domNode = node
    return node
  }

  /**
   * 将节点to移植到from的位置
   * @param {*} from
   * @param {*} to
   */
  transplant(from, to) {

    const p = from.p

    if (p) {
      const idx = p.children.indexOf(p.children.find(x => x === from))
      p.children[idx] = to
    }

    if (to) {
      to.p = p
    }

    if (from.domNode) {
      if (to === null) {
        if (from.parent) {
          from.parent.removeChild(from)
        }
      } else {
        from.domNode.parentNode.replaceChild(to.renderToDomNode(), from.domNode)
      }
    }
  }


  /**
   * 插入一个节点
   */
  insert(at, v) {
    // 插入虚拟dom
    this.children.splice(at, 0, v)

    // 在dom中插入真实元素
    if (this.domNode) {
      const node = this.domNode.children[at]
      if (node) {
        this.domNode.insertBefore(v.renderToDomNode(), node)
      }
      else {
        this.domNode.appendChild(v.renderToDomNode())
      }
    }
  }

  /**
   * 删除一个节点
   * @param {*} at
   */
  delete(at) {
    this.children.splice(at, 1)

    if (this.domNode) {
      const node = this.domNode.children[at]
      node.parentNode.removeChild(node)
    }
  }

  /**
   * 更新属性
   */
  updateProps(to) {

    const props = to.props
    if (typeof this.componentType === 'string') {
      if (this.domNode) {
        if (this.componentType === 'text') {
          this.domNode.innerHTML = to.props.text
        } else {
          // 更新style
          const nextStyle = props.style || {}
          const prevStyle = this.props.style || {}

          // 比较prevStyle和nextStyle的异同，进行更新
          const k1 = Object.keys(prevStyle)
          const k2 = Object.keys(nextStyle)

          for (let key in prevStyle) {
            if (nextStyle[key] === undefined) {
              this.domNode.style[key] = ''
            }
          }

          for (let key in nextStyle) {
            this.domNode.style[key] = nextStyle[key]
          }

          // 更新classList
          this.domNode.className = props.class


          // 更新文本
          if (this.innerText !== to.innerText) {
            this.domNode.innerHTML = to.innerText
          }
        }

      }

    }


    this.props = props
  }


  /**
   * 将节点追加到一个dom节点上，并记录这个追加的节点
   * @param {*} domNode
   */
  appendToDOMNode(domNode) {
    const dom = this.renderToDomNode()
    domNode.appendChild(dom)
  }



}
