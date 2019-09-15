/**
 * 测试虚拟dom
 */

// 因为使用了babel,所以执行的时候需要
// npm run test
import {assert} from 'chai'
import dom from './dom'
import {JSDOM} from 'jsdom'



const html = new JSDOM(`<!doctype html><html></html>`)
global.document = html.window.document

describe('测试虚拟DOM', () => {
  it('测试基本的append操作', () => {
    const v1 = <div><p>hello world!</p></div>
    const node = v1.renderToDomNode()
    assert.equal(node.children[0].innerHTML, 'hello world!')
  })

  it('测试classList & styles', () => {
    const v1 = <div><p style={{
      color : 'blue',
      fontSize : '14px'

    }} class='x y'>hello world!</p></div>
    const node = v1.renderToDomNode()

    assert.equal(node.children[0].classList.contains('x'), true)
    assert.equal(node.children[0].classList.contains('y'), true)
    assert.equal(node.children[0].style.color, 'blue')
    assert.equal(node.children[0].style.fontSize , '14px')
  })

  it('测试列表', () => {
    const list = ['a', 'b', 'c']
    const v = <ul>
      {list.map(x => <li>{x}</li>)}
    </ul>

    const node = v.renderToDomNode()

    assert.equal(node.children.length , 3)
  })

  it('测试dom-diff算法 01', () => {

    function render(color){
      return <div><p style={{
        color,
        fontSize: '14px'
      }} class='x y'>hello world!</p></div>
    }


    const v1 = render('blue')
    const v2 = render('red')


    const updates = v1.diff(v2)
    assert.equal(updates.length, 1)

  })

  it('测试dom-diff&apply 01', () => {

    function render(list){
      return <ul>
        {list.map(x => <li>{x}</li>)}
      </ul>
    }

    const v1 = render(['hello', 'world', '!!'])
    const v2 = render(['hello', 'programming', 'today', 'today'])
    const node = v1.renderToDomNode()
    const updates = v1.diff(v2)
    v1.apply(updates)
    assert.deepEqual(
      [...node.children].map(node => node.innerHTML),
      ['hello', 'programming', 'today', 'today']
    )

  })


  it('测试dom-diff&delete 02', () => {

    function render(list){
      return <ul>
        {list.map(x => <li>{x}</li>)}
      </ul>
    }

    const v1 = render(['hello', 'world', '!!'])
    const v2 = render(['hello', 'world'])
    const node = v1.renderToDomNode()
    const updates = v1.diff(v2)
    v1.apply(updates)
    assert.deepEqual(
      [...node.children].map(node => node.innerHTML),
      ['hello', 'world']
    )

  })

  it('branch-test 03', () => {
    function render(data){


      let tab = null
      if(data.type === 1) {
        tab = <div>hi</div>
      } else {
        tab = <p>done</p>
      }
      return <div>{tab}</div>
    }

    const v1 = render({type : 1})
    const v2 = render({type : 2})
    const node = v1.renderToDomNode()
    const updates = v1.diff(v2)

    v1.apply(updates)

    assert.equal(node.children[0].tagName, 'P')
    assert.equal(node.children[0].innerHTML, 'done')
  })

  it('null test', () => {

    function render(show) {
      if(!show) {return null}
      return <div>hello world!</div>
    }

    const v1 = render(true)
    const v2 = render(false)
    const node = v1.renderToDomNode()
    const updates = v1.diff(v2)
    v1.apply(updates)
  })

})