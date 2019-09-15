**参数合并**
Vue在实例化过程中会进行参数合并，将**Vue对象的options属性值**和**实例化时传入的对象**进行合并，合并后产生一个新的对象作为vue实例的`$options`属性。
源码如下：
```javascript
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
```
这里`resolveConstructorOptions(vm.constructor)`就是Vue.options,`options`是实例化Vue时传入的配置对象。接下来我们仔细看以下Vue.options和options分别是什么，分别有什么属性以及他们在合并过程中遵守什么合并规则。
----------------------------------------------------------------------------------------------------------
**构造函数VUE作为对象时，都有哪些属性**
Vue是一个构造函数，源码如下：
```javascript
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```
Vue作为构造函数时，内部逻辑很简单，规定只能用new关键字调用Vue，然后执行原型上的_init方法。我们知道在JavaScript中，函数也是一个对象，那么当Vue构造函数作为对象时，它身上有哪些属性呢。
Vue在源码中经历了以下四个阶段，每个阶段都有特定的任务，让我们一起来简单的看一下吧
1、**在原型上定义方法**
```javascript
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```
`initMixin`方法主要任务是在Vue原型上定义`_init`方法。`Vue.prototype._init = function(){...}`
`stateMixin`方法主要任务是在Vue原型上定义`$data`、`$props`属性，`$set`、`$delete`、`$watch`方法。
`eventsMixin`方法主要任务是在Vue原型上定义`$on`、`$once``$off`、`$emit`方法。
`lifecycleMixin`方法主要任务是在Vue原型上定义`$_update`、`$forceUpdate`、`$destroy`方法。
`renderMixin`方法主要任务是在Vue原型上定义`$nextTick`、`_render`方法。
这里没必要去看每一个方法的实现，只需要知道，Vue原型上定义了许多方法，这些方法按照功能划分有初始化相关的、事件相关的等等。
2、**给Vue构造函数对象定义属性和方法**
```javascript
initGlobalAPI(Vue)
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'
```
这里主要看一下`initGlobalAPI`方法，该方法在Vue上定义了一些属性和方法，也正是我们需要关注的，在实例化Vue时，合并参数时会用到。
`initGlobalAPI`源码简化后如下：
```javascript
  Object.defineProperty(Vue, 'config', {...})
  Vue.util = {...}

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  Vue.options._base = Vue
  //将内置组件合并到Vue.options.components上
  extend(Vue.options.components, builtInComponents)
  //在Vue上定义use方法，use方法用来加载插件
  initUse(Vue)
  //在Vue上定义mixin方法
  initMixin(Vue)
  //在Vue上定义extend方法，extend方法用来定义子类构造函数
  initExtend(Vue)
  //在Vue上定义component\filter\directive方法，注册组件、过滤器、指令
  initAssetRegisters(Vue)
```
经过这一步，Vue作为对象时，它看起来是这个样子的：
```javascript
{
    config: {...},
    util: {...},
    set: function () {... },
    delete: function () { ...},
    nextTick: function () {... },
    options: {
        components: {
            keepAlive:{...}
        },
        filters: {...},
        directives: {...},
        _base: Vue
    },
    component: function () {... },
    filter: function () { ...},
    directive: function () {... },
}
```
这里我们要记住Vue对象上的options有一个_base属性，它指向Vue自身。
3、**其他**
```javascript
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```
这里主要是给config属性定义一些方法以及原型上定义$mount方法等。到这里，Vue的初始化工作就算完成了，主要做了两件事情：
1、在原型上定义方法
2、在Vue上定义属性和方法。
流程图：定义Vue构造函数--->定义Vue的原型方法--->在Vue上定义属性和方法

----------------------------------------------------------------------------------------------------------
**实例化VUE时，传入的配置对象**
实例化Vue时，传入的对象有两种情况，
第一种：用户传入的配置对象。
比如：
```javascript
let config = {
    el: '#app',
    methods: {},
    data: function () { return {} },
    watch: {},
    filters: {},
    components: {},
    render:function(){}
}
new Vue(config)
```
上面的`config`对象就是用户传入的配置对象
第二种：Vue内部在初始化组件时传入的配置对象
```javascript
const options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
}
```
这种情况我们暂时不考虑，等说到组件的时候在详细说明。
----------------------------------------------------------------------------------------------------------

**合并策略**
合并参数调用的是`mergeOptions`方法，这个方法大致可以分为3部分：
1、标准化3个属性，分别为`props`、`inject`、`directives`。
2、递归解析child
3、根据不同的属性采用对应的合并策略。
**根据不同的属性采用对应的合并策略**
通过源码可以看到，在合并过程中，不同的属性有不同的合并策略，所有的合并策略都定义在名为strats对象上，也就是说，strats是一个能产出所有属性的对象的工厂函数集合，这些属性就是实例化Vue时传入的配置对象的属性，包括el、data、methods、computed、watch、provide等等。
strats对象看起来是下面这样子的：
```javascript
let strats = {
    ['el', 'propsData']: function (parent, child) { return defaultStrat(parent, child) },
    data: function (parent, child) { /*  ... */ },
    ['所有的生命周期钩子']: function () {/*  ... */  },
    ['components', 'filters', 'directives']: function (parentVal, childVal) {
        const res = Object.create(parentVal || null)
        if (childVal) {
            return extend(res, childVal)
        } else {
            return res
        }
    },
    watch: function (parentVal, childVal) {/*  ... */ },
    ['props', 'methods', 'inject', 'computed']: function (parentVal, childVal) {
        if (!parentVal) return childVal
        const ret = Object.create(null)
        extend(ret, parentVal)
        if (childVal) extend(ret, childVal)
        return ret
    },
    provide: function (parentVal, childVal) { /* ... */ },
    defaultStrat: function (parentVal, childVal) {
        return childVal === undefined ? parentVal : childVal
    }
}
```
mergeOptions方法最终返回一个新对象，这个对象被挂载到vm.$options上，此时，该对象上有一个_base属性，指向Vue构造函数。
----------------------------------------------------------------------------------------------------------

**代理数据到实例上**
initState(vm)方法，初始化props、methods、data、computed、watch。
initState的代码如下：
```javascript
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```
initData(vm)将vm.$options.data上的数据代理到了实例上，换句话说就是在实例上也能访问data上的属性。
如何实现数据代理呢，这里展示两种方法.
----------------------------------------------------------------------------------------------------------
**利用Object.defineProperty**
```javascript
let data = {
    name: 'wz',
    location: 'beijing',
    job: 'The end of front'
}
let vm = {}
function proxy(target, source) {
    Object.keys(source).forEach(key => {
        Object.defineProperty(target, key, {
            get() {
                return source[key]
            }
        })
    })
}
vm = proxy(vm, data)
console.log(vm.name)
```
data是原始数据，即被代理数据；vm是代理者，就是说要实现的效果是，当访问vm上的某个属性时，需要返回data上该属性的值。
比如，需要访问vm.name，这时应该返回data.name。因为 Object.defineProperty方法能够拦截属性的**获取**和**设置**操作，
所以就它提供了一种机制，能让我们去改写这种默认行为。

----------------------------------------------------------------------------------------------------------

**利用Proxy**
```javascript
let data = {
    name: 'wz',
    location: 'beijing',
    job: 'The end of front'
}
let vm = {}
let vm_p = new Proxy(vm, {
        get(target, key, receiver) {
            // Reflect.get(target, key, receiver);
            return Reflect.get(data, key, receiver)
        }
    })
console.log(vm_p.name)
```
Proxy同样可以拦截属性的**获取**和**设置**操作。
其实，只要实现一种能够拦截属性的**获取**和**设置**机制，就能做到代理数据、双向绑定等功能。
源码中关于代理数据的实现如下：
```javascript
export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```
----------------------------------------------------------------------------------------------------------

**获取render函数**
vue在实例化的时候，是必须要确定render函数的，而render函数可以是用户手动传入，也可以是从template编译而来的。
如果是从template编译而来的话，那么对template的格式就有一写要求，也就是template只能是以下这几种形式之一，否则template
不合法。
![a](./template.png)
如上图所示，template只能是以下几种形式
- DOM节点，也就是通过原生方法获取到的节点
- 标准字符串，比如：\<div>{{msg}}\</div>
- id,比如，"#app",vue内部会根据这个id获取DOM。
- 没有传template的情况下，vue会根据el的值去获取template

----------------------------------------------------------------------------------------------------------
**_render()生成vnode**
无论是普通元素，比如：div、span，还是组件，Vue都会将他们变成一个虚拟dom，也就是vnode。vnode有嵌套关系，根节点只有一个，也就是说，从根节点开始，一层层嵌套下去就形成了一颗vnode树，也就是虚拟dom。当数据发生改变后，会生成一颗新的虚拟dom，比较新旧虚拟dom树，找到差异，最小化更新到真实dom中。
_render()生成一个虚拟节点需要经历的步骤如下:
1、参数重载
2、扁平化子节点
3、创建vnode
接下来就仔细看一下每一步具体做了什么
----------------------------------------------------------------------------------------------------------
**参数重载**
源码中createElement方法对参数做了一些校验，然后转交给_createElement方法去生成vnode。
```javascript
export function createElement (
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  return _createElement(context, tag, data, children, normalizationType)
}
```


----------------------------------------------------------------------------------------------------------
**扁平化子节点**
_createElement方法中有如下一段代码，是对子节点数据的处理，将用户传入的参数或者是组件参数格式化为符合Vue内部要求的格式。
```javascript
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
```

----------------------------------------------------------------------------------------------------------
**什么是vnode**



----------------------------------------------------------------------------------------------------------
**创建vnode**
_createElement方法在处理完参数和子节点数据后，就开始创建vnode了，这里我们只看普通元素的vnode创建过程，组件元素创建过程这里不考虑。源码中创建普通元素vnode的代码如下：
```javascript
vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
```
----------------------------------------------------------------------------------------------------------
**保留老的挂载节点、vnode、vm**

```javascript
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const prevActiveInstance = activeInstance
    activeInstance = vm
    vm._vnode = vnode
```



----------------------------------------------------------------------------------------------------------
**利用函数柯里化缓存DOM方法以及平台相关方法**

```javascript
const patch=createPatchFunction()
```
createPatchFunction函数大致如下：
```javascript
function createPatchFunction() {
    function a() { /* ... */}
    function b() { /* ... */ }
    function c() { /* ... */ }
    function d() { /* ... */ }
    return function patch(oldVnode, vnode, hydrating, removeOnly) {
        //....
        createElm()
        //...
    }
}
```


----------------------------------------------------------------------------------------------------------
**先子后父,递归创建元素**
```javascript
function createElm() {
    createChildren(vnode, children, insertedVnodeQueue)
 
    insert(parentElm, vnode.elm, refElm)
}

function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
        for (let i = 0; i < children.length; ++i) {
            createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i)
        }
    } else if (isPrimitive(vnode.text)) {
        nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))
    }
}
```




----------------------------------------------------------------------------------------------------------
**将创建好的元素挂载到真实DOM上**

```javascript
  function insert (parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref)
        }
      } else {
        nodeOps.appendChild(parent, elm)
      }
    }
  }
```



----------------------------------------------------------------------------------------------------------
**移除旧挂载节点**

```javascript
 // destroy old node
if (isDef(parentElm)) {
  removeVnodes(parentElm, [oldVnode], 0, 0)
} else if (isDef(oldVnode.tag)) {
  invokeDestroyHook(oldVnode)
}
```

----------------------------------------------------------------------------------------------------------
**创建组件vnode**
源码中`createComponent`方法就是创建一个组件vnode，大致分为3步，创建子组件构造函数--->安装组件钩子函数--->创建组件vnode.
```javascript
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor)
  }

  installComponentHooks(data)

  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )  
```
----------------------------------------------------------------------------------------------------------
**创建子组件构造函数**
每一个子组件最开始的时候都是一个对象，无论是模板编译还是用户自定义。我们需要将这个对象组件转化为一个函数。该函数会继承Vue，因为Vue是一个拥有从初始化到渲染再到更新销毁完整过程的函数，组件需要继承它已完成组件内部的一系列操作。
Vue.extend方法就是接受一个组件对象，返回一个组件函数。
```javascript
Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }


    const Sub = function VueComponent (options) {
      this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super

    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }


    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use


    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    cachedCtors[SuperId] = Sub
    return Sub
  }
```
可以看到，组件对象会被转化为一个组件函数。首先判断有没有缓存，然后构造一个子类函数，函数继承Vue，同时将Vue的option和子类的合并，子类对象保留对父类的引用以及参数引用。
----------------------------------------------------------------------------------------------------------
**安装组件钩子函数**
vnode在挂载的时候会触发自身的一些钩子函数，所以这里我们注册了几个钩子函数进去，主要任务就是完成我们组件的初始化、更新、销毁等工作。
```javascript
const componentVNodeHooks = {
    init() {/* ... */ },
    prepatch() {/* ... */ },
    insert() {/* ... */ },
    destroy() {/* ... */ }
}
```
比如init钩子中就会初始化组件，代码如下：
```javascript
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      )
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
```


----------------------------------------------------------------------------------------------------------
**创建组件vnode**
到这里，我们准备好了组件函数、组件钩子函数，然后传入Vnode类，创建组件的vnode
```javascript
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )
  return vnode;
```

----------------------------------------------------------------------------------------------------------
**组件vnode挂载过程**





----------------------------------------------------------------------------------------------------------
**创建组件vnode实例**
如果vnode是一个组件的话，Vue会为它创建一个实例。创建实例的过程和Vue创建实例的过程相似，`createComponentInstanceForVnode`方法如下：
```JavaScript
export function createComponentInstanceForVnode (
  vnode: any, // we know it's MountedComponentVNode but flow doesn't
  parent: any, // activeInstance in lifecycle state
): Component {
  const options: InternalComponentOptions = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  }
  // check inline-template render functions
  const inlineTemplate = vnode.data.inlineTemplate
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render
    options.staticRenderFns = inlineTemplate.staticRenderFns
  }
  return new vnode.componentOptions.Ctor(options)
}
```




----------------------------------------------------------------------------------------------------------
**父组件的实例、vnode与子组件的实例、vnode之间的相互引用**
每一个vm都有一个vnode，因为vnode是由vm._render()方法产生的。当vnode是组件的时候，vnode会产生一个新的vm，新的vm同样有自己的一个vnode。
vm实例上有如下属性：
$parent:指向父实例
$children:指向子实例
$vnode:指向父vnode
_vnode:指向自己的vnode
vnode上有如下属性：
parent:指向父vnode


----------------------------------------------------------------------------------------------------------
**组件挂载过程参数合并**
组件在初始化阶段就已经合并了一部分配置，就是将Vue上的属性和创建组件的配置对象做了一次合并，之后在初始化组件的时候，只是又合并了一些父vnode、父实例相关的属性。
```javascript
export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}
```
这里的`vm.constructor.options`就是已经将Vue和组件的配置对象合并以后的对象。

----------------------------------------------------------------------------------------------------------






----------------------------------------------------------------------------------------------------------






----------------------------------------------------------------------------------------------------------





----------------------------------------------------------------------------------------------------------






----------------------------------------------------------------------------------------------------------






----------------------------------------------------------------------------------------------------------
