https://www.imooc.com/article/287172
http://www.imooc.com/article/286880
### 1、传统布局和flex布局有什么区别
css盒子模型不是某种布局专属的，是所有布局专属的。
目前在用的主流方法主要有两类。一类是基于格子布局，将页面看成行+列的二维布局。另一类是flex布局，将页面看成行或者列的一维布局。到现在这个时代，其他的方法都归为传统布局，或者说过时的布局方法。比如传说中的默认布局，其实就是不去布局。还有基于float实现多列的布局。还有依赖table的表格布局。
性能上flex允许子元素不设置宽高，而是由算法动态去计算，性能会比设定好宽高的稍慢。但在这个时代大体没有影响。但计算有时候会不符合人的预期，有时候需要用flex提供的属性给予启发。

基本上答了传统布局是基于盒模型的就错了。第二个大坑是，传统布局+flex布局！=所有布局。

如果能知道除了传统布局和flex布局外还有grid布局，多列布局等等n多种方法。那就比较出彩了。

grid  layout就是格子布局。最后补充几个相关问题，第一个是大家要知道flex几种历史的写法，比如哪些浏览器支持-webkit-box？还有比如说，flex目前是w3c的提议还是标准？再比如说，什么是布局？再比如说flex在移动端兼容性如？其实已经很好了。

**1)css的display属性**
**2)浮动布局**
浮动技术允许元素浮动到另外一个元素的左侧或右侧，而不是默认的一个堆叠另一个。float 的主要用途是布置出多个列并且浮动文字以环绕图片。float 属性最初只用于在成块的文本内浮动图像，但是现在它已成为在网页上创建多列布局的最常用工具之一.
float 属性有四个可能的值：
- left — 将元素浮动到左侧。
- right — 将元素浮动到右侧。
- none — 默认值, 不浮动。
- inherit — 继承父元素的浮动属性。
**3)定位布局**
定位技术(position)允许我们将一个元素从它在页面的原始位置准确地移动到另外一个位置。
position属性有四个可能的值：
- static 是每个元素默认的属性——它表示“将元素放在文档布局流的默认位置——没有什么特殊的地方”。
- relative 允许我们相对元素在正常的文档流中的位置移动它——包括将两个元素叠放在页面上。这对于微调和精准设计(design pinpointing)非常有用。
- absolute 将元素完全从页面的正常布局流中移出，类似将它单独放在一个图层中
- fixed 与绝对定位非常类似，除了它是将一个元素相对浏览器视口固定，而不是相对另外一个元素。
- sticky
**4)弹性盒模型布局**
比如：在一行中创建几个盒子，占用相同数量的可用空间，不管有多少个，并且如果它们有内边距，外边距等就应用它。
**5)css表格布局**
HTML表格对于显示表格数据是很好的，但是很多年前——在浏览器中支持基本的CSS之前——web开发人员过去也常常使用表格来完成整个网页布局——将它们的页眉、页脚、不同的列等等放在不同的表行和列中。这在当时是有效的，但它有很多问题——表布局是不灵活的，非常重的标记，难以调试和语义上的错误（比如，屏幕阅读器用户在导航表布局方面有问题）。
CSS表格的存在是为了让您能够像表格一样布局元素，而不需要上面描述的任何问题
常用的属性为
- display: table-row;
- display: table-cell;
- display: table-caption;
- caption-side: bottom;
在线查看布局效果https://mdn.github.io/learning-area/css/styling-boxes/box-model-recap/css-tables-example.html
**6)网格布局**
CSS Grid Layout is a two-dimensional layout system for the web.CSS网格，它在浏览器中还没有得到广泛的支持
- display: grid; //让该元素内的元素按照表格布局
- grid-template-columns: 2fr 1fr 1fr;
- grid-column-gap;//控制列间距
- grid-row-gap;//控制行间距
- grid-gap: 20px;//控制行列间距
**7)默认布局**
即浏览器对html默认的解析规则,也叫不布局,布局技术会覆盖默认的布局行为.比如一个ul无序列表的li元素会一个占一行的显示。
### 2、vue双向绑定原理
### 3、https执行过程，抓包工具原理
**https执行过程**
1、服务端收到客户端请求后将公钥传回客户端
2、然后客户端验证公钥是否可信（预装来自公正机构的根证书来验证）
3、如果公钥可信，客户端会生成一个密码，用服务端公钥加密后返回服务端
4、服务端接收到由自己公钥加密的密码后，进行解密，然后两端用对称加密的方式传输
5、之后每次客户端发送请求都会生成新的对称加密的密码
**抓包原理**
1、基于以上抓包工具只有一种方式帮助抓包
2、抓包工具让客户端安装自己的证书，也就是它们伪装成一个https的服务端，当客户端项目标网站发送请求时，https请求先访问到了抓包工具，
3、之后抓包工具使用自己的公钥和私钥与目标网站再建立一个https的通信，于是抓包工具就变成了消息的中转站实现抓包
### 4、拷贝函数
```
function clone(obj) {
    let newObj = undefined;
    if (typeof newObj === null || typeof newobj !== 'object') {
        return obj
    }
    if (obj.constructor === Date) {
        newObj = new Date(obj)
        return newObj
    }
    newObj = new obj.constructor()
    for (let attr in Object.getOwnPropertyDescriptors(obj)) {
        newObj[attr] = clone(obj[attr])
    }
    return newObj
}
```
### 5、伪数组转为数组的方法
- Array.from(arrayLike)
- [].slice.call(arrayLike)
- [...arrayLike]
### 6、如何比较两个颜色是否相似
1、如果颜色是用16进制表示的，用parseInt('oxaa')转化为10进制;如果是rgb表示的，用正则提取出数字
2、Math.sqrt( (r1-r2) *(r1-r2) +(g1-g2)*(g1-g2)+(b1-b2)*(b1-b2) )进行比较， 距离近则相似
3、当然可以用Math.hypot( r1-r2, g1-g2, b1-b2) 来简化上述运算
### 7、函数节流与防抖
函数防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。当一个动作连续触发，则只执行最后一次。
限制一个函数在一定时间内执行的次数。
函数防抖的应用场景
- 搜索框搜索输入。只需用户最后一次输入完，再发送请求
- 手机号、邮箱验证输入检测
- 窗口大小Resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。
函数节流的应用场景
- 滚动加载，加载更多或滚到底部监听
- 搜索框，搜索联想功能
- 高频点击提交，表单重复提交
### 8、什么是XSS、csrf?如何攻击？如何防御?
CSRF的防范一般这几种:
- 验证码,用户体验虽然不好,,但是很多场合下可以防范大多数攻击
- 验证 HTTP Referer 字段,判断请求来源
- token加密解密,这种是目前很常用的手段了,
### 9、事件
事件三个阶段：
- 捕获阶段
- 目标阶段
- 冒泡阶段
事件大类：
- 标准事件
- 非标准事件(比如beforescriptexecute脚本执行前、afterscriptexecute脚本执行后)
- Mozilla特定事件(afterscriptexecute复选框状态改变事件)
### 10、什么是无头浏览器
无头浏览器(Headless Browser)是没有图形用户界面(GUI)的web浏览器，通常是通过编程或命令行界面来控制的。
我们日常使用浏览器的步骤为：启动浏览器、打开一个网页、进行交互。而无头浏览器指的是我们使用脚本来执行以上过程的浏览器，能模拟真实的浏览器使用场景。
应用场景：
- 对网页进行截图保存为图片或 pdf
- 抓取单页应用(SPA)执行并渲染(解决传统 HTTP 爬虫抓取单页应用难以处理异步请求的问题)
- 自动化测试
- 做表单的自动提交、UI的自动化测试、模拟键盘输入等
- 用浏览器自带的一些调试工具和性能分析工具帮助我们分析问题
参考文章 https://juejin.im/post/59e5a86c51882578bf185dba
### 11、V8下的垃圾回收机制
V8采用了一种分代回收的策略，将内存分为两个生代：**新生代**和**老生代**。新生代的对象为存活时间较短的对象，老生代中的对象为存活时间较长或常驻内存的对象。分别对新生代和老生代使用不同的垃圾回收算法来提升垃圾回收的效率。对象起初都会被分配到新生代，当新生代中的对象满足某些条件时，会被移动到老生代晋升。
新生代区会被划分为两个区域，from区和to区。处于使用状态的空间称为From空间，处于闲置状态的空间称为To空间，当我们分配对象时，先是在From空间中进行分配。当开始进行垃圾回收算法时，会检查From空间中的存活对象，这些存活对象将会被复制到To空间中，而非活跃对象占用的空间将会被释放。完成复制后，From空间和To空间的角色发生对换。
老生代所保存的对象大多数是生存周期很长的甚至是常驻内存的对象，而且老生代占用的内存较多。
老生代的垃圾回收算法
- Mark-Sweep(标记清除)
标记清除分为标记和清除两个阶段。在标记阶段需要遍历堆中的所有对象，并标记那些活着的对象，然后进入清除阶段。在清除阶段，只清除没有被标记的对象。由于标记清除只清除死亡对象，而死亡对象在老生代中占用的比例很小，所以效率较高
标记清除有一个问题就是进行一次标记清除后，内存空间往往是不连续的，会出现很多的内存碎片。如果后续需要分配一个需要内存空间较多的对象时，如果所有的内存碎片都不够用，将会使得V8无法完成这次分配，提前触发垃圾回收。
- Mark-Compact(标记整理)
标记整理正是为了解决标记清除所带来的内存碎片的问题。标记整理在标记清除的基础进行修改，将其的清除阶段变为紧缩阶段。在整理的过程中，将活着的对象向内存区的一段移动，移动完成后直接清理掉边界外的内存。紧缩过程涉及对象的移动，所以效率并不是太好，但是能保证不会生成内存碎片。
### 12、线性顺序存储结构和链式存储结构有什么区别？以及优缺点
**区别**
- 链表存储结构的内存地址不一定是连续的，但顺序存储结构的内存地址一定是连续的
- 链式存储适用于在较频繁地插入、删除、更新元素；而顺序存储结构适用于频繁查询
**优缺点**
- 空间上：顺序比链式节约空间
- 存储操作上：顺序支持随机存取，方便操作。
- 插入和删除上：链式的要比顺序的方便
### 13、执行 JS 代码时产生的执行上下文
执行上下文是当前 JavaScript 代码被解析和执行时所在环境的抽象概念。
当执行 JS 代码时，会产生三种执行上下文
- 全局执行上下文
- 函数执行上下文
- eval 执行上下文
每个执行上下文中都有三个重要的属性
1)变量对象(VO) 包含变量、函数声明和函数的形参
2)作用域链(词法作用域)
3)this指向

### 14、为什么0.1+0.2！=0.3
因为 JS 采用 IEEE 754 双精度版本（64位），并且只要采用 IEEE 754 的语言都有该问题。
计算机表示十进制是采用二进制表示的,0.1和0.2在计算机中都是无法精确表示的，都会有无限循环，
六十四位中符号位占一位，整数位占十一位，其余五十二位都为小数位。因为 0.1 和 0.2 都是无限循环的二进制了，所以在小数位末尾处需要判断是否进位（就和十进制的四舍五入一样）。
### 15、立即执行函数在定义阶段就执行了吗
IIFE（ 立即调用函数表达式）是一个在定义时就会立即执行的  JavaScript 函数。
### 16、理解以下代码的输出结果
```
var name = 'world';
(function () {
    console.log(name) //undefined
    if (typeof name === 'undefined') {
        var name = 'Jack' //此处的name被重新声明，if语句不管是否成立都会进行预解释
        console.log('hello ' + name)
    } else {
        console.log('hello' + name)
    }
}())//hello Jack

var fo = 1;
(function foo() {
    console.log(fo) //1
    foo = 10
    console.log(foo)//[Function: foo]
}()) 
```
### 17、什么是Service Worker?如何使用?
Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。它们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。他们还允许访问推送通知和后台同步API。
目前该技术通常用来做缓存文件，提高首屏速度，可以试着来实现这个功能。Service Workers 要求必须在 HTTPS 下才能运行。
如果注册成功，service worker 就在 ServiceWorkerGlobalScope 环境中运行； 这是一个特殊类型的 woker 上下文运行环境，与主运行线程（执行脚本）相独立，同时也没有访问 DOM 的能力。
### 18、项目中如何进行 Webpack 优化?
分离第三方库(依赖),比如引入dll
引入多进程编译,比如happypack
提取公共的依赖模块,比如commonChunkPlugin
资源混淆和压缩:比如UglifyJS
分离样式这些,减小bundle chunk的大小,比如ExtractTextPlugin
GZIP 压缩,在打包的时候对资源对齐压缩,只要部署的服务器能解析即可..减少请求的大小
还有按需加载这些,一般主流的框架都有对应的模块懒加载方式.
至于tree shaking目前webpack3/4已经默认集成


### 19、generator实现原理
### 20、什么是IFC?IFC的作用是什么？
http://www.ayqy.net/doc/css2-1/visuren.html 

https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context

https://dondevi.github.io/css-visual-formatting-model-zh.html
### 21、什么是跨域，如何解决跨域问题
由于浏览器存在同源策略，请求的 Url 地址的协议、主机名、端口号必须完全相同，否则会产生跨域，同源策略的限制下 cookie 、loclstorage、dom、ajax、IndexDB 等都不允许跨域、form 表单不受同源策略限制
解决方法：
**jsonp**
缺点：只能使用get请求，不安全，容易引发 xss 攻击
**cors**
- Access-Control-Allow-Origin
- Access-Control-Allow-Methods 处理复杂请求的头
- Access-Control-Allow-Headers 想要获取 ajax 的头信息，需设置响应头
- Access-Control-Allow-Credentials 允许发送 cookie 凭证的响应头
**postMessage**
调用方式：window.postMessage(message, targetOrigin)
- message：发送的数据
- targetOrigin：发送的窗口的域
在对应的页面中用 message 事件接收，事件对象中有 data、origin、source 三个重要信息
- data：接收到的数据
- origin：接收到数据源的域（数据来自哪个域）
- source：接收到数据源的窗口对象（数据来自哪个窗口对象）
**window.name**
**location.hash**
**WebSocket**
**nginx**
WebSocket 没有跨域限制
https://www.pandashen.com/2018/06/11/20180611010638/

### 22、cookie，localStorage，sessionStorage，indexDB之间的区别和使用场景
### 23、在浏览器输入地址，回车后发生了什么
1. 用户输入URL地址
2. 浏览器解析URL解析出主机名
3. 浏览器将主机名转换成服务器ip地址（浏览器先查找本地DNS缓存列表 没有的话 再向浏览器默认的DNS服务器发送查询请求 同时缓存）
4. 浏览器将端口号从URL中解析出来
5. 浏览器建立一条与目标Web服务器的TCP连接（三次握手）
6. 浏览器向服务器发送一条HTTP请求报文
7. 服务器向浏览器返回一条HTTP响应报文
8. 关闭连接 浏览器解析文档
9. 如果文档中有资源 重复6 7 8 动作 直至资源全部加载完毕
**渲染的基本流程**
1. HTML解析出DOM Tree
2. CSS解析出Style Rules
3. 将二者关联生成Render Tree
4. Layout 根据Render Tree计算每个节点的信息
5. Painting 根据计算好的信息绘制整个页面
### 24、谈谈你对前端资源下载性能优化的经验和思考?
https://juejin.im/post/5d00820b5188255ee806a1c7#heading-0
客户端着手
压缩代码(JS/CSS),压缩图片
合并一些小图片(css sprite)
若是打包的代码尽可能切割成多个 chunk,减少单一 chunk过大
静态文件采用 cdn 引入
HTTP的缓存头使用的合理
减小第三方库的依赖
对于代码应该考虑性能来编写,比如使用requestAnimationFrame绘制动画,尽可能减少页面重绘(DOM 改变)
渐进升级,引入preload这些预加载资源
看情况用service worker来缓存资源(比如移动端打算搞 PWA)

服务端着手
带宽,域名解析, 多域名解析等
页面做服务端渲染,减小对浏览器的依赖(不用客户端解析)
渐进升级,比如引入 HTTP2(多路复用,头部压缩这些可以明显加快加载速度)

### 25、IP协议属于哪一层？主要功能是干什么的？
IP协议对应于OSI标准模型的网络层
### 26、js中new到底做了什么
1、创建新对象obj
2、将新对象的原型链连接到构造函数的原型上。
3、执行构造函数，将this指向新对象obj，也就是给obj添加私有属性和方法。
4、判断构造函数是否有引用类型的返回值，有就返回，没有就返回新创建的对象obj。
### 27、移动端适配有哪些方案？各有什么优缺点？
https://www.w3cplus.com/css/vw-for-layout.html
https://mp.weixin.qq.com/s/y2kzv5S2TvkMwgwZPbSyKA
https://mp.weixin.qq.com/s/DFOrEUsVqmujHW7tADsH0g
https://mp.weixin.qq.com/s/N2vRHKOE9WH_TAtwBaiX_Q
https://mp.weixin.qq.com/s/ALXtRYIsaFM4FPEj3zwKqQ
https://github.com/geeknull/rem-moka
### 28、继承方式
**原型链继承**
子类的原型是父类的一个实例，SubType.prototype = new SuperType();
缺点：
- 多个实例对引用类型的操作会被篡改。
**构造函数继承(call继承)**
在子类的构造函数里调用父类构造函数，SuperType.call(this)
缺点：
- 只能继承父类的实例属性和方法，不能继承原型属性/方法
- 无法实现复用，每个子类都有父类实例函数的副本，影响性能
**组合继承**
组合上述两种方法就是组合继承。用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承。
缺点：
- 在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。
**原型式继承**
类似第一种，这种继承是加了一个中间的空的构造函数。第一种是直接去new父类
缺点：
- 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
- 无法传递参数
**寄生继承**
核心：在原型式继承的基础上，增强对象，返回构造函数
```
function createAnother(original){
  var clone = object(original); // 通过调用 object() 函数创建一个新对象
  clone.sayHi = function(){  // 以某种方式来增强对象
    alert("hi");
  };
  return clone; // 返回这个对象
}
```
函数的主要作用是为构造函数新增属性和方法，以**增强函数**
缺点（同原型式继承）
**寄生组合式继承**
```
function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型
}

// 父类初始化实例属性和原型属性
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
  SuperType.call(this, name);
  this.age = age;
}

// 将父类原型指向子类
inheritPrototype(SubType, SuperType);

// 新增子类原型属性
SubType.prototype.sayAge = function(){
  alert(this.age);
}

var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);

instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance1.colors.push("3"); // ["red", "blue", "green", "3"]
```
这是最成熟的方法，也是现在库实现的方法
**混入方式继承多个对象**
```
function MyClass() {
     SuperClass.call(this);
     OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
     // do something
};
```
### 29、
https://blog.csdn.net/qq_35546040/article/details/80284079

### 30、居中布局
**行内元素居中**
```
text-align:center
```
**div居中**
使用flex
```
justify-content:center;align-item:center
```
使用transform:
```
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
```
使用margin-top -一半的高度
```
  width: 300px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -50px;
```
使用绝对布局`absolute`和`margin:auto`
```
  position: absolute;
  width: 300px;
  height: 200px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
```
### 31、CSS3特性 `vh`和`vw`
- `vh` 相对于视窗的高度，视窗高度是100vh
- `vw` 相对于视窗的宽度，视窗宽度是100vw
* 这里视窗指的是**浏览器内部的可视区域大小**，即`window.innerWidth/window.innerHeight`大小，不包含任务栏标题栏以及底部工具栏的浏览器区域大小。
### 32、响应式
```
class Dep {

  // 初始化
  constructor () {          
    this.subscribers = new Set()
  }

  // 订阅update函数列表
  depend () {
    if (activeUpdate) {     
      this.subscribers.add(activeUpdate)
    }
  }

  // 所有update函数重新运行
  notify () {              
    this.subscribers.forEach(sub => sub())
  }
}

function observe (obj) {

  // 迭代对象的所有属性
  // 并使用Object.defineProperty()转换成getter/setters
  Object.keys(obj).forEach(key => {
    let internalValue = obj[key]

    // 每个属性分配一个Dep实例
    const dep = new Dep()

    Object.defineProperty(obj, key, {
    
      // getter负责注册订阅者
      get () {
        dep.depend()
        return internalValue
      },

      // setter负责通知改变
      set (newVal) {
        const changed = internalValue !== newVal
        internalValue = newVal
        
        // 触发后重新计算
        if (changed) {
          dep.notify()
        }
      }
    })
  })
  return obj
}

let activeUpdate = null

function autorun (update) {

  // 包裹update函数到"wrappedUpdate"函数中，
  // "wrappedUpdate"函数执行时注册和注销自身
  const wrappedUpdate = () => {
    activeUpdate = wrappedUpdate
    update()
    activeUpdate = null
  }
  wrappedUpdate()
}
```
```
const state = {
  count: 0
}

observe(state)

autorun(() => {
  console.log(state.count)
})
// 输出 count is: 0

state.count++
// 输出 count is: 1
```

### 33、commonJS和ESmoudle区别
- CommonJs导出的是变量的一份拷贝，ES6 Module导出的是变量的绑定（引用）
- CommonJs是动态语法可以写在判断里，ES6 Module静态语法只能写在顶层
- CommonJs的 this 是当前模块，ES6 Module的 this 是 undefined
https://segmentfault.com/a/1190000017878394#articleHeader6
### 34、http状态吗
- 100 只有请求头
- 200 请求已成功
- 206 请求头须携带Range字段，响应携带Content-Range字段。断点续传
- 301 永久重定向
- 302 临时重定向
- 304 缓存
- 305 被请求的资源必须通过指定的代理才能被访问
- 400 请求参数有误，服务器无法理解请求
- 403 无权限访问
- 404 资源找不到
- 409 请求的资源冲突
- 410 资源永久删除
- 500 服务器错误

### 35、浏览器event loop，node环境event loop
浏览器环境下，先执行同步代码，然后执行微任务，然后执行任务队列的宏任务，然后微任务，每执行完一个宏任务就去执行一次微任务；
node环境下，从当前任务队列切换到下一个任务队列时，就会去执行一次微任务。
Node 的 Event loop 分为6个阶段，它们会按照顺序反复运行
┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<──connections───     │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
**timer**
timers 阶段会执行 setTimeout 和 setInterval
**I/O**
**idle, prepare**
idle, prepare 阶段内部实现
**poll**
poll 阶段很重要，这一阶段中，系统会做两件事情
1、执行到点的定时器
2、执行 poll 队列中的事件
并且当 poll 中没有定时器的情况下，会发现以下两件事情
1、如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者系统限制
2、如果 poll 队列为空，会有两件事发生
  1)、如果有 setImmediate 需要执行，poll 阶段会停止并且进入到 check 阶段执行 setImmediate
  2)、如果没有 setImmediate 需要执行，会等待回调被加入到队列中并立即执行回调
**check**
check 阶段执行 setImmediate
**close callbacks**
close callbacks 阶段执行 close 事件
在 Node 中，有些情况下的定时器执行顺序是随机的
```
setTimeout(() => {
    console.log('setTimeout');
}, 0);
setImmediate(() => {
    console.log('setImmediate');
})
// 这里可能会输出 setTimeout，setImmediate
// 可能也会相反的输出，这取决于性能
// 因为可能进入 event loop 用了不到 1 毫秒，这时候会执行 setImmediate
// 否则会执行 setTimeout
```
这种情况下，执行顺序是相同的
```
var fs = require('fs')

fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0);
    setImmediate(() => {
        console.log('immediate');
    });
});
// 因为 readFile 的回调在 poll 中执行
// 发现有 setImmediate ，所以会立即跳到 check 阶段执行回调
// 再去 timer 阶段执行 setTimeout
// 所以以上输出一定是 setImmediate，setTimeout
```
上面介绍的都是 macrotask 的执行情况，microtask 会在以上每个阶段完成后立即执行
```
setTimeout(()=>{
    console.log('timer1')

    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)

setTimeout(()=>{
    console.log('timer2')

    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)

// 以上代码在浏览器和 node 中打印情况是不同的
// 浏览器中打印 timer1, promise1, timer2, promise2
// node 中打印 timer1, timer2, promise1, promise2
```
Node 中的 process.nextTick 会先于其他 microtask 执行
```
setTimeout(() => {
  console.log("timer1");

  Promise.resolve().then(function() {
    console.log("promise1");
  });
}, 0);

process.nextTick(() => {
  console.log("nextTick");
});
// nextTick, timer1, promise1
```
微任务包括：process.nextTick ，promise ，Object.observe ，MutationObserver
宏任务包括：script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering
属于微任务（microtask）的事件有以下几种：

* Promise.then
* MutationObserver
* Object.observe
* process.nextTick

属于宏任务（macrotask）的事件有以下几种：

* setTimeout
* setInterval
* setImmediate
* MessageChannel
* requestAnimationFrame
* I/O
* UI交互事件

### 36、http1.0\http1.1\http2.0区别
https://juejin.im/post/5d032b77e51d45777a126183
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/232
**http1.0**  
- connection:close
- Request Method:GET, POST 和 HEAD方法
- status code:302
**http1.1**
原字段值发生了改变
- connection:keep-alive
- Request Method:OPTIONS, PUT, DELETE, TRACE 和 CONNECT
- status code: 303 307 409 410
- cache-control:max-age,no-cache,no-store,must-revalidate,public,private
在HTTP1.1中新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除,302是http1.0的协议状态码，在http1.1版本的时候为了细化302状态码又出来了两个303和307。
新增字段
- 增加Host字段、支持断点传输等（Range头，206） HTTP1.0是没有host域的，HTTP1.1才支持这个参数
新的功能
- HTTP 1.1支持只发送header信息(不带任何body信息)，如果服务器认为客户端有权限请求服务器，则返回100，否则返回401
****http2.0****
- 所有的HTTP2.0通信都在一个TCP连接上完成，这个连接可以承载任意数量的双向数据流
- 每个数据流以消息的形式发送，而消息由一或多个帧组成。这些帧可以乱序发送，然后再根据每个帧头部的流标识符（stream id）重新组装。HTTP/2 采用二进制格式传输数据，而非 HTTP 1.x 的文本格式，二进制协议解析起来更高效
- 多路复用（连接共享）可能会导致关键请求被阻塞。HTTP2.0里每个数据流都可以设置优先级和依赖，优先级高的数据流会被服务器优先处理和返回给客户端，数据流还可以依赖其他的子数据流。同一个连接并发处理多个请求.当然HTTP1.1也可以多建立几个TCP连接，来支持处理更多并发的请求，但是创建TCP连接本身也是有开销的。 
- HTTP2.0实现了真正的并行传输，它能够在一个TCP上进行任意数量HTTP请求。而这个强大的功能则是基于“二进制分帧”的特性。
- 头部压缩  HTTP1.1不支持header数据的压缩，HTTP2.0使用HPACK算法对header的数据进行压缩
- 服务器推送
同域名下所有通信都在单个连接上完成。
单个连接可以承载任意数量的双向数据流。
数据流以消息的形式发送，而消息又由一个或多个帧组成，多个帧之间可以乱序发送，因为根据帧首部的流标识可以重新组装

http1.0中，浏览器的每次请求都需要与服务器建立一个TCP连接，服务器处理完成后立即断开TCP连接（无连接），服务器不跟踪每个客户端也不记录过去的请求（无状态）。HTTP/1.0中默认使用Connection: close
在HTTP/1.1中已经默认使用Connection: keep-alive，避免了连接建立和释放的开销，但服务器必须按照客户端请求的先后顺序依次回送相应的结果，以保证客户端能够区分出每次请求的响应内容。通过Content-Length字段来判断当前请求的数据是否已经全部接收。不允许同时存在两个并行的响应。

**多头服务二进制** 多路复用、头部压缩、服务器推送、二进制分帧

在 HTTP/1 中，每次请求都会建立一次HTTP连接，也就是我们常说的3次握手4次挥手，这个过程在一次请求过程中占用了相当长的时间，即使开启了 Keep-Alive ，解决了多次连接的问题，但是依然有两个效率上的问题：

第一个：串行的文件传输。当请求a文件时，b文件只能等待，等待a连接到服务器、服务器处理文件、服务器返回文件，这三个步骤。我们假设这三步用时都是1秒，那么a文件用时为3秒，b文件传输完成用时为6秒，依此类推。（注：此项计算有一个前提条件，就是浏览器和服务器是单通道传输）
第二个：连接数过多。我们假设Apache设置了最大并发数为300，因为浏览器限制，浏览器发起的最大请求数为6，也就是服务器能承载的最高并发为50，当第51个人访问时，就需要等待前面某个请求处理完成。
HTTP/2的多路复用就是为了解决上述的两个性能问题。
在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。
帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。
多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。

### 37、
定理1：设a，b为两个二进制数，则a+b = (a^b) + (a&b)<<1。
证明：a^b是不考虑进位时加法结果。当二进制位同时为1时，才有进位，因此 (a&b)<<1是进位产生的值，称为进位补偿。将两者相加便是完整加法结果。
### 38、哈希函数处理冲突的方法
1、开放定址法（再散列法），线性探测再散列、平方探测再散列
2、链地址法
3、再哈希法
哈希法又称散列法、杂凑法以及关键字地址计算法等，相应的表称为哈希表。这种方法的基本思想是：首先在元素的关键字k和元素的存储位置p之间建立一个对应关系f，使得p=f(k)，f称为哈希函数。创建哈希表时，把关键字为k的元素直接存入地址为f(k)的单元；以后当查找关键字为k的元素时，再利用哈希函数计算出该元素的存储位置p=f(k)，从而达到按关键字直接存取元素的目的。
当关键字集合很大时，关键字值不同的元素可能会映象到哈希表的同一地址上，即 k1≠k2 ，但 H（k1）=H（k2），这种现象称为冲突，此时称k1和k2为同义词。实际中，冲突是不可避免的，只能通过改哈希函数的性能来减少冲突。
哈希法主要包括以下两方面的内容：
 1）如何构造哈希函数
 2）如何处理冲突。

### 39、写出5种css隐藏元素的办法
- 1.opacity: 0;
- 2.visibility: hidden;
- 3.display: none;
- 4.position: absolute;
    top: -9999px;
    left: -9999px;
- 5.clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px);

### 40、请写出你常用的10个linux命令并说明作用
- mkdir
- touch
- pwd
- ls -l
- cd
- cat
- cp
- rm -rf
- exit
- tail
- less
### 41、请写出你常用的5个git命令并说明作用
- git status
- git add .
- git commit -m""
- git push origin master
- git branch
- git checkout
- git reset
- git log
- git reflog
- git diff
### 42、介绍CDN
CDN的全称是 Content Delivery Network，即内容分发网络。CDN 是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN 的关键技术主要有内容存储和分发技术。
**CDN优势**
CDN 节点解决了跨运营商和跨地域访问的问题，访问延时大大降低；
大部分请求在 CDN 边缘节点完成，CDN 起到了分流作用，减轻了源站的负载。
把静态资源和主页面置于不同的域名下，就可以完美地避免请求中携带不必要的 Cookie。

### 43、HTTP 与 HTTPS 的区别
协议
HTTP运行在 TCP 之上，明文传输，客户端与服务器端都无法验证对方的身份
HTTP身披 SSL( Secure Socket Layer )外壳的 HTTP，运行于 SSL 上，SSL 运行于 TCP 之上， 是添加了加密和认证机制的 HTTP。

端口
HTTP 80
HTTPS 443

资源消耗
HTTP 较少
HTTPS 由于加解密处理，会消耗更多的 CPU 和内存资源

开销
HTTP 无需证书
HTTPS 需要证书，而证书一般需要向认证机构购买

加密机制
HTTP 无
HTTPS 共享密钥加密和公开密钥加密并用的混合加密机制

安全性
HTTP 弱
HTTPS 由于加密机制，安全性强

### 44、流量控制
所谓流量控制就是让发送速率不要过快，让接收方来得及接收。利用滑动窗口机制就可以实施流量控制。原理这就是运用TCP报文段中的窗口大小字段来控制，发送方的发送窗口不可以大于接收方发回的窗口大小。考虑一种特殊的情况，就是接收方若没有缓存足够使用，就会发送零窗口大小的报文，此时发送放将发送窗口设置为0，停止发送数据。之后接收方有足够的缓存，发送了非零窗口大小的报文，但是这个报文在中途丢失的，那么发送方的发送窗口就一直为零导致死锁。解决这个问题，TCP为每一个连接设置一个持续计时器（persistence timer）。只要TCP的一方收到对方的零窗口通知，就启动该计时器，周期性的发送一个零窗口探测报文段。对方就在确认这个报文的时候给出现在的窗口大小


### 45、DNS
**使用 DNS Prefetching**
https://zhuanlan.zhihu.com/p/28305778
http://www.ruanyifeng.com/blog/2016/06/dns.html
```
<link rel="dns-prefetch" href="www.baidu.com">
```
a标签的href都会自动去启用DNS Prefetching,但是a标签的默认启动在HTTPS不起作用，需要增加meta标签强制开启
```
<meta http-equiv="x-dns-prefetch-control" content="on">
```
DNS查找过程：
浏览器搜索自身的DNS缓存：
首先浏览器会去搜索自身的DNS缓存，看缓存有没有过期，过期的话缓存的解析就结束了（chrome缓存的时间只有一分钟，查看chrome的缓存可打开：chrome://net-internals/#dns ）。
搜索操作系统自身的DNS缓存：
如果浏览器没有找到缓存或者缓存过期失效，浏览器就会搜索操作系统自身的缓存，没有找到或者失效，解析结束（操作系统的缓存：window系统是一天，mac系统严格根据DNS协议中的TTL）。
读取本地的hosts文件：
若操作系统的缓存也没有找到或失效，浏览器就会去读取本地的hosts文件（Hosts文件也可以建立域名到IP地址的绑定关系，可以通过编辑Hosts文件来达到名称解析的目的。 例如，我们需要屏蔽某个域名时，就可以将其地址指向一个不存在IP地址，以达到屏蔽的效果）。
浏览器发起一个DNS的系统调用：
hosts中没有找到对应的配置项的话，浏览器发起一个DNS的调用（向本地主控DNS服务，一般来说是你的运营商提供的）。


### 46、TCP三次握手，四次挥手
6个控制位（URG\ACK\FIN\PSH\SYN\RST）TCP的连接、传输、断开都受这6个控制位的指挥
窗口值 是用来在TCP传输中进行流量控制的。16位窗口大小
三次握手的目的是同步连接双方的序列号和确认号，并交换TCP窗口大小信息
三次握手：
1、建立连接，客户端发送连接请求，发送SYN报文，将seq设置为0.然后，客户端进入SYN_SEND状态，等待服务器的确认。
2、服务器收到客户端的SYN报文段。需要对这个SYN报文段进行确认，发送ACK报文，将ack设置为1，同时发送syn，将seq设置为0。服务器进入SYN_RECV状态。
3、客户端收到服务器的ACK和SYN报文段，发送ACK报文段，此时，双方进入ESTABLISHED状态，完成TCP三次握手
四次挥手：
1、客户端发送FIN报文，进入FIN_WAIT1状态，表示客户端没有数据传输了，请求断开连接。
2、服务器收到客户端的FIN报文段后，向客户端发送ACK报文段，服务器进入CLOSE_WAIT状态，客户端收到ACK后进入FIN_WAIT2状态。
3、如果没有数据需要传输了，服务器发送FIN报文，进入LAST_ACK状态。
4、客户端收到服务器的FIN报文段，向服务器发送ACK报文段，进入TIME_WAIT状态，服务器收到ACK后，关闭连接。客户端等待一定时间后没有收到回复，关闭连接。

### 47、js隐式类型转换：
1、转为字符串规则
1)null------>"null"
2)undefined------>"undefined"
3)true------>"true"
4)false------>"false"
5)数字类型------>转为数字的字符串形式，比如：1------>"1"  1e21------>"1e+21"
6)数组------>将数组中的数据按照逗号连接起来，空数组转为空字符串，数组中的null、undefined会被当做空字符串处理
7)对象------>转为字符串相当于直接使用Object.prototype.toString(),返回"[object Object]"
2、转为数字规则：
1)null------>0
2)undefined------>NaN
3)字符串------>如果是数字类型的字符串那就转为对应的数字；空字符串转为0；其他转为NaN
4)true------>1
5)false------>0
6)数组------>先转为原始类型，也就是toPrimitive，然后按照以上规则处理
7)对象------>同数组
3、转为布尔值
1)null------>false
2)undefined------>false
3)""------>false
4)NaN------>false
5)0------>false
其他均为true
4、转为原始类型(toPrimitive)
toPrimitive指的是对象类型转为原始类型的操作
当对象类型转为原始类型时，它会查找对象的valueOf方法，如果valueOf方法返回原始类型的值，那toPrimitive的结果就是这个值；
如果valueOf不存在或者返回的值不是原始类型的值，就会尝试调用对象的toString方法，然后使用toString的结果作为toPrimitive的结果。
1)Number([])------>0
2)Number([10])------>10
5、布尔和其他类型的相等比较
只要布尔参与比较，该布尔值会被转化为数字类型
6、数字类型和字符串类型的相等比较
当数字类型和字符串类型相比较时，字符串会转为数字类型
纯数字形式的字符串会转为对应的数字，空字符串转为0，其他为NaN
7、对象类型和原始类型的相等比较
当对象类型和原始类型发生比较时，对象类型会按照toPrimitive规则转化为原始类型。
'[object Object]'=={}
'1,2,3'=[1,2,3]
[null]==0
[undefined]==0
[]==0
null==undefined
null只和null相等，和undefined宽松相等，除这两个值外，和其他任何值都不相等
undefined只和undefined相等，和null宽松相等，除这两个值外，和其他任何值都不相等
null==undefined //true
null==false  //false
undefined==false  //false
8、几道题
[]==![] //true
[]==0  //true
['0']==false  //true
[]==false  //true
[null]==0  //true
9、发生转换的几种情况
1)if
2)数学运算
3)三元运算符
4)取反操作
5)比较运算

6个控制位（URG\ACK\FIN\PSH\SYN\RST）TCP的连接、传输、断开都受这6个控制位的指挥
窗口值 是用来在TCP传输中进行流量控制的。16位窗口大小
三次握手的目的是同步连接双方的序列号和确认号，并交换TCP窗口大小信息
三次握手：
1、建立连接，客户端发送连接请求，发送SYN报文，将seq设置为0.然后，客户端进入SYN_SEND状态，等待服务器的确认。
2、服务器收到客户端的SYN报文段。需要对这个SYN报文段进行确认，发送ACK报文，将ack设置为1，同时发送syn，将seq设置为0。服务器进入SYN_RECV状态。
3、客户端收到服务器的ACK和SYN报文段，发送ACK报文段，此时，双方进入ESTABLISHED状态，完成TCP三次握手
四次挥手：
1、客户端发送FIN报文，进入FIN_WAIT1状态，表示客户端没有数据传输了，请求断开连接。
2、服务器收到客户端的FIN报文段后，向客户端发送ACK报文段，服务器进入CLOSE_WAIT状态，客户端收到ACK后进入FIN_WAIT2状态。
3、如果没有数据需要传输了，服务器发送FIN报文，进入LAST_ACK状态。
4、客户端收到服务器的FIN报文段，向服务器发送ACK报文段，进入TIME_WAIT状态，服务器收到ACK后，关闭连接。客户端等待一定时间后没有收到回复，关闭连接。

linux
1.ls – List  
ls会列举出当前工作目录的内容（文件或文件夹）
2.mkdir – Make Directory    
mkdir 用于新建一个新目录    
3.pwd – Print Working Directory     
pwd显示当前工作目录
4.cd – Change Directory
对于当前在终端运行的会中中，cd 将给定的文件夹（或目录）设置成当前工作目录。
5.rmdir – Remove Directory
rmdir 删除给定的目录。
6.rm – Remove
rm 会删除给定的文件或文件夹，可以使用rm -r 递归删除文件夹
7.cp – Copy
cp 命令对文件或文件夹进行复制，可以使用cp -r 选项来递归复制文件夹。
8.mv – MoVe
mv 命令对文件或文件夹进行移动，如果文件或文件夹存在于当前工作目录，还可以对文件或文件夹进行重命名。
9.cat – concatenate and print files
cat 用于在标准输出（监控器或屏幕）上查看文件内容
10.tail – print TAIL (from last) >
tail 默认在标准输出上显示给定文件的最后10行内容，可以使用tail -n N 指定在标准输出上显示文件的最后N行内容。
11.less – print LESS
less 按页或按窗口打印文件内容。在查看包含大量文本数据的大文件时是非常有用和高效的。你可以使用Ctrl+F向前翻页，Ctrl+B向后翻页。
12.grep
grep "" 在给定的文件中搜寻指定的字符串。grep -i "" 在搜寻时会忽略字符串的大小写，而grep -r "" 则会在当前工作目录的文件中递归搜寻指定的字符串。
13.Find
这个命令会在给定位置搜寻与条件匹配的文件。你可以使用find -name 的-name选项来进行区分大小写的搜寻，find -iname 来进行不区分大小写的搜寻。
find <folder-to-search> -iname <file-name>
14.tar
tar命令能创建、查看和提取tar压缩文件。tar -cvf <archive-name.tar> 是创建对应压缩文件，tar -tvf <archive-to-view.tar> 来查看对应压缩文件，tar -xvf <archive-to-extract.tar>来提取对应压缩文件。
15.gzip
gzip 命令创建和提取gzip压缩文件，还可以用gzip -d 来提取压缩文件。
16.unzip
unzip <archive-to-extract.zip>对gzip文档进行解压。在解压之前，可以使用unzip -l <archive-to-extract.zip>命令查看文件内容。
17.help
--help会在终端列出所有可用的命令,可以使用任何命令的-h或-help选项来查看该命令的具体用法。
18.whatis – What is this command
whatis 会用单行来描述给定的命令。
19.man – Manual
man 会为给定的命令显示一个手册页面。
20.exit
exit用于结束当前的终端会话。
21.ping
ping 通过发送数据包ping远程主机(服务器)，常用与检测网络连接和服务器状态。
22.who – Who Is logged in
who能列出当前登录的用户名。
23.su – Switch User
su 用于切换不同的用户。即使没有使用密码，超级用户也能切换到其它用户。
24.uname
uname会显示出关于系统的重要信息，如内核名称、主机名、内核版本、处理机类型等等，使用uname -a可以查看所有信息。
25.free – Free memory
free会显示出系统的空闲内存、已经占用内存、可利用的交换内存等信息，free -m将结果中的单位转换成KB，而free –g则转换成GB。
26.df – Disk space Free
df查看文件系统中磁盘的使用情况–硬盘已用和可用的存储空间以及其它存储设备。你可以使用df -h将结果以人类可读的方式显示。
27.ps – ProcesseS
ps显示系统的运行进程。
28.Top – TOP processes
top命令会默认按照CPU的占用情况，显示占用量较大的进程,可以使用top -u 查看某个用户的CPU使用排名情况。
29.shutdown
shutdown用于关闭计算机，而shutdown -r用于重启计算机。



xss
1、URL参数注入
通过HTML转义，可以防止xss攻击
escapeHTML()
2、对于连接跳转，href、src属性等的内容要进行检验，禁止以javascript:开头
3、后台直出页面时，如果要内联JSON，JSON中如果有字符串</script>


根据xss来源，xss攻击分为三类：
1、存储型
常见于带有用户保存数据的网站功能，如：论坛发帖、评论商品、用户私信
2、反射型
反射型xss漏洞常见于通过url传递参数的功能，如：网站搜索、跳转等
3、DOM型


### 严格模式：
	
| 案例      |    非严格模式 | 严格模式  |
| :-------- | --------:| :--: |
| 查找一个未定义的变量时，如：b=1  | 会在全局创建该变量 |  报错   |
|eval|会修改此法作用域|无法修改所在的作用域，有自己的词法作用域|
|全局下，单独调用一个函数，函数的this问题|指向window|undefined|
|对象的属性不可写时，如果赋值|赋值失败，不报错|报错，TypeError|
|Object.preventExtensions()|失败，不报错|报错|



### 能够修改词法作用域的方法
- 1、eval
- 2、setTimeout
- 3、setInterval
- 4、new Function()
- 5、with

**观察以下代码**
```javascript
foo(); // 1
function foo() {
    console.log(1);
}
var foo = function () {
    console.log(2);
}
foo() //2
```

```javascript
function foo() {
    console.log(a); // 2  如果是词法作用域的话结果是2；如果是动态作用域的话是3
}
function bar() {
    var a = 3;
    foo();
}
var a = 2;
bar();
```
```javascript
function Foo() {
    getName = function () { alert(1) }
    return this
}
Foo.getName = function () { alert(2) }
Foo.prototype.getName = function () { alert(3) }
var getName = function () { alert(4) }
function getName() { alert(5) }
Foo.getName()//2
getName()//4
Foo().getName()//1
getName()//1
new Foo.getName();//2
new Foo().getName()//3
new new Foo().getName()//3
```
### catch 分句具有块作用域，因此它可以在 ES6 之前的环境中作为块作用域的替代方案。

### 硬绑定和软绑定
硬绑定这种方式可以把 this 强制绑定到指定的对象（除了使用 new
时），防止函数调用应用默认绑定规则。问题在于，硬绑定会大大降低函数的灵活性，使
用硬绑定之后就无法使用隐式绑定或者显式绑定来修改 this 。
如果可以给默认绑定指定一个全局对象和 undefined 以外的值，那就可以实现和硬绑定相
同的效果，同时保留隐式绑定或者显式绑定修改 this 的能力。
可以通过一种被称为**软绑定**的方法来实现我们想要的效果：
```javascript
if (!Function.prototype.softBind) {
    Function.prototype.softBind = function (obj) {
        var fn = this;
        // 捕获所有 curried 参数
        var curried = [].slice.call(arguments, 1);
        var bound = function () {
            return fn.apply(
                (!this || this === (window || global)) ?
                    obj : this,
                curried.concat.apply(curried, arguments)
            );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    };
}
```
测试一下以上软绑定函数：
```javascript
function foo() {
    console.log("name: " + this.name);
}
var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };
var fooOBJ = foo.softBind(obj);
fooOBJ(); // name: obj
obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2 <---- 看！！！
fooOBJ.call(obj3); // name: obj3 <---- 看！
setTimeout(obj2.foo, 10);
// name: obj <---- 应用了软绑定
```

### Object的几个方法
```javascript
Object.preventExtensions()//禁止一个对象添加新属性并且保留已有属性

Object.seal()
//Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用
//Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false

Object.freeze()
//Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用
// Object.seal(..) 并把所有“数据访问”属性标记为 writable:false ，这样就无法修改它们
// 的值

Object.getOwnPropertyNames()

```
### 发生隐式类型转换的情况
1、+ 运算符
2、if 语句
3、三元运算符
4、比较运算符
5、!!
6、==
{}+[] //0  {}被当成一个代码块处理了。
[]+{} //[object Object]
 a + "" 会对 a 调用 valueOf() 方法，然后通过 ToString 抽象
操作将返回值转换为字符串。而 String(a) 则是直接调用 ToString()
```javascript
var a = {
valueOf: function() { return 42; },
toString: function() { return 4; }
};
a + ""; // "42"
String( a ); // "4"
```
**转换为布尔值的情况**
(1)  if (..) 语句中的条件判断表达式。
(2)  for ( .. ; .. ; .. ) 语句中的条件判断表达式（第二个）。
(3)  while (..) 和 do..while(..) 循环中的条件判断表达式。
(4)  ? : 中的条件判断表达式。
(5) 逻辑运算符 || （逻辑或）和 && （逻辑与）左边的操作数（作为条件判断表达式）。

#### 0.1+0.2 !=0.3
计算机进行数字运算时采用的是二进制的，也就是数字运算时先将数字转换为二进制。
0.1、0.2在转换为二进制时会出现无限循环，但是计算机不会用无限内存去存储这个无限循环数字，所以会进行取舍操作（取舍操作和遵循的标准有关，JS遵循IEEE标准，也就是说遵循这个标准的语言都会有这个问题），所以0.1、0.2在转换为二进制后就已经丢失了精度，相加的结果也就不是0.3了。
**十进制小数转化为二进制方法：**
将小数每次乘以2，如果结果没有整数，那么就得到一个0，如果结果有整数，那么得到一个1，然后去掉整数，继续乘以2.
0.1转为二进制：
0.1 * 2 = 0.2  0
0.2 * 2 = 0.4  0
0.4 * 2 = 0.8  0
0.8 * 2 = 1.6  1
0.6 * 2 = 1.2  1
0.2 * 2 = 0.4  0
0.4 * 2 = 0.8  0
0.8 * 2 = 1.6  1
0.6 * 2 = 1.2  1
结果为00011001100110011...

### 深拷贝与浅拷贝的区别，如何实现
对象浅拷贝原生提供的方法：...运算符，Object.assign(target[,obj1,obj2...])
数组浅拷贝原生提供的方法：slice
对象深拷贝原生提供的方法：JSON.parse(JSON.stringify()) 无法拷贝函数、symbol、循环引用的话会报错

### Promise缺点
1、单一值。resolve、reject只能传递一个参数，如果想传递多个参数只能封装成对象或数组
2、Promise的catch不能捕获任意情况的错误(比如 then 里面的setTimout内手动抛出一个Error)
3、Promise的then返回Promise.reject()会中断链式调用
```javascript
new Promise((resolve,reject) => {
    resolve(3,5)
}).then((a,b) => {
    console.log('a-->',a)//3
    console.log('b-->',b)//undefined
})
```
2、无法取消Promise

#### 执行上下文
执行上下文包含：
1、确定this
2、词法环境（包含let、const声明的变量）
3、变量环境
在 ES6 中，词法 环境和变量环境的区别在于,前者用于存储**函数声明和变量（ let 和 const ）绑定，而后者仅用于存储变量(var)**绑定。
```javascript
ExecutionContext = {  
  ThisBinding = <this value>,     // 确定this 
  LexicalEnvironment = { ... },   // 词法环境
  VariableEnvironment = { ... },  // 变量环境
}
```
变量提升的原因：在创建阶段，函数声明存储在环境中，而变量会被设置为 undefined（在 var 的情况下）或保持未初始化（在 let 和 const 的情况下）。所以这就是为什么可以在声明之前访问 var 定义的变量（尽管是 undefined ），但如果在声明之前访问 let 和 const 定义的变量就会提示引用错误的原因。这就是所谓的变量提升。


```javascript
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x) // undefined
console.log(b.x) // { n: 2 }
https://segmentfault.com/a/1190000004224719
```
1、优先级。.的优先级高于=，所以先执行a.x，堆内存中的{n: 1}就会变成{n: 1, x: undefined}，改变之后相应的b.x也变化了，因为指向的是同一个对象。
2、赋值操作是从右到左，所以先执行a = {n: 2}，a的引用就被改变了，然后这个返回值又赋值给了a.x，需要注意的是这时候a.x是第一步中的{n: 1, x: undefined}那个对象，其实就是b.x，相当于b.x = {n: 2}
### 闭包
https://juejin.im/post/5d064ab851882510715e37ad
闭包是指有权访问另一个函数作用域中的变量的函数，闭包使得函数可以继续访问定义时的词法作用域
**闭包的作用**
1、能够访问函数定义时所在的词法作用域(阻止其被回收)
2、私有化变量
3、创建模块
4、模拟块级作用域
### 异步加载 js 脚本的方法有哪些
script标签中增加 async(html5) 或者 defer(html4) 属性,脚本就会异步加载。

**defer 和 async 的区别在于**：
defer 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），在window.onload 之前执行；
async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。
如果有多个 defer 脚本，会按照它们在页面出现的顺序加载
多个 async 脚本不能保证加载顺序
### http的请求,响应报文是什么样的
- 请求行
- 请求头部
- 空行
- 请求体
-------
- 响应行
- 响应头
- 空行
- 响应体
### PUT和POST都是给服务器发送新增资源，有什么区别
PUT 和POST方法的区别是,PUT方法是幂等的：连续调用一次或者多次的效果相同（无副作用），而POST方法是非幂等的。
除此之外还有一个区别，通常情况下，PUT的URI指向是具体单一资源，而POST可以指向资源集合。
### PUT和PATCH都是给服务器发送修改资源，有什么区别
PUT和PATCH都是更新资源，而PATCH用来对已知资源进行局部更新。
### one practice
```javascript
function add(a) {
    function sum(b) { // 使用闭包
    	a = a + b; // 累加
    	return sum;
    }
    sum.toString = function() { // 重写toString()方法
        return a;
    }
    return sum; // 返回一个函数
}

add(1); // 1
add(1)(2);  // 3
add(1)(2)(3)； // 6
add(1)(2)(3)(4)； // 10 
```
### JS中常见的4种内存泄漏问题
1、全局变量
2、setInterval
3、脱离dom的引用（字典中保留了对dom元素的引用）
4、闭包

### HTTP VS HTTPS
HTTP端口号为80；HTTPS443
http缺点：消息泄漏、消息篡改、消息伪造
https如何解决以上问题：
1、消息泄漏：采用非对称加密建立安全通道，传输密文和协商密钥（对称加密的密钥）。
对称加密算法：RES\DES\RC4
非对称加密：RSA
2、消息篡改:采用散列函数计算签名，MD5\SHA\SHA256...
3、消息伪造：采用数字证书验证身份。
**数字证书机构业务流程**
- 服务器的运营人员向CA提交公钥、组织信息、个人信息等并申请认证。
- CA通过线上线下等多种手段验证信息。
- 信息审核通过，CA下发认证文件--证书。证书包含如下信息：1、公钥2、组织信息3、个人信息、4、CA信息5、签名。1234是明文的，5是对他们的签名，采用私钥进行签名。
- 客户端请求服务的，服务的返回证书文件。
- 客户端通过签名验证证书信息是否合法。
- 客户端通过内置信任证书验证服务器返回的证书是否在有效期等信息。

### 正则
普通字符
元字符^ $ \ |
带反斜杠的元字符\b  \d  \s  \w
.匹配换行符之外的任意单个字符
量词：
? 0-1
+ 1-多
* 0-多
{n}
{n,}
{n,m}
贪婪模式：在既定规则下匹配尽可能多的文本。切换到非贪婪模式，只需要在量词后面加一个问号。默认是贪婪模式。
字符组：方括号被称为字符组
字符组的特点：
1、表示一个区间，最终只能匹配一个字符
2、字符组中元字符不需要转义
3、^在字符组中表示取反
4、-在字符组中表示连字符
正则内捕获：\1 \2 \3 对应前面圆括号的内容，这种捕获的引用也叫反向引用
正则外捕获：RegExp.$1，如果有多个正则引用，只保留最后一个。replace(/(\d)+/,$1)
捕获命名：在圆括号最前面加上`?<key>`,引用时`\k<key>`,key可以是其他字母。
取消捕获：在圆括号最前面加上`?:`,就表示只需要这个整体，不需要它的引用。
修饰符：
g
i
y
s
u
### performance
performance.timing 包括了和页面相关的时间，如：dns解析时间、建立tcp所消耗的时间、文档加载时间、http请求到响应所花费的时间等等 https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming#%E5%B1%9E%E6%80%A7
performance.navigation 包括了如何到达该页面的信息，如：当前页面是通过点击链接，书签和表单提交，或者脚本操作，或者在url中直接输入地址，type值为0；点击刷新页面按钮或者通过Location.reload()方法显示的页面，type值为1；页面通过历史记录和前进后退访问时。type值为2；任何其他方式，type值为255
前端监控:
1、监控页面相关时间，performance.timing
2、监控ajax请求  函数劫持，重写open、send方法
3、监控页面请求资源数量 new PerformanceObserver();;;performance.getEntriesByType('resource')
4、错误监控 window.onerror=function(a,b,c,d,error){...}



--------------------------------------------------------------------------
### vue
vue模板编译分为3个阶段：
1、将模板解析成AST
2、优化AST
3、将AST生成代码字符串
将模板解析成AST：html解析器+文本解析器+过滤器解析器
html解析器原理是while循环里，不停的去截取字符串，根据字符串的类型做不同的处理。类型有：开始标签、文本标签、结束标签、注释标签、DOCTYPE标签等等
优化AST：1、标记静态节点2、标记静态根节点
将AST生成代码字符串：拼接字符串，变成函数调用形式。

### HTML5语义化

语义化的优点有:
1、代码结构清晰，易于阅读，利于开发和维护
2、方便其他设备解析（如屏幕阅读器）根据语义渲染网页。
3、有利于搜索引擎优化（SEO），搜索引擎爬虫会根据不同的标签来赋予不同的权重
语义化标签主要有：
title header nav article h1-h6 aside section main detail mark
解决不支持h5方法：1、网站配置多套模板，根据user-agent来确定具体使用哪套2、三方库解决html5shiv
### ES6
字符串：
1、模板字符串
2、startWith
3、endWith
4、padStart
5、padEnd
函数:
1、剩余参数
2、参数默认值
3、箭头函数
对象：
1、属性可以用变量
2、属性值可以是_proto_
3、可以通过super关键字获取到父属性
4、setPrototypeOf getPrototypeOf
数组：
1、
2、
3、
4、
类：

### encodeURI、decodeURI、encodeURIComponent、decodeURIComponent
1、保留字符：; : / ? @ & = + $ , (10个)
2、非转义字符：字母(a-z A-Z) 数字(0-9) uri标识符(-_.!~*'())
3、#
4、其他字符
encodeURI：4
encodeURIComponent：1 3 4
decodeURI：4
decodeURIComponent：1 2 3 4

### box-sizing
- border-box (content + padding + border = 盒子实际大小)
- content-box (content =盒子实际大小)
- padding-box(只有 Firefox 标准实现了,目前50+的版本已经废除)

```
.clearfix:after{
  clear:both;
  content:'';
  display:block;
}
```
### transition animate
transition一般用来做过渡的, 没时间轴的概念,animate则是做动效,有时间轴的概念(帧可控),可以重复触发和有中间状态;
@keyframes:name duration timing-function delay 
### 样式权重的优先级
!important-->行内样式-->id-->class-->tag

element.appendChild()
element.removeChild()
nextSibling
nextElementSibling
previousSibling
previousElementSibling
setAttribute()
getAttribute()
removeAttribute()
 
###  SPDY 
谷歌推行一种协议,可以算是HTTP2的前身,有以下优点：
压缩数据(HEADER)
多路复用
优先级(可以给请求设置优先级)

### 一道题
```javascript
(function(){
 var  x = c =  b = {a:1}
})()

console.log(x.a); // error , x is not defined
console.log(c,b) // {a: 1} {a: 1}
//---------------------------------------------------------------------------------------
var count = 0;

console.log(typeof count === "number"); // true

console.log(!!typeof count === "number"); // false

//---------------------------------------------------------------------------------------
var test='abc345efgabcab'
test.replace(/\d/g,'[$&]');  // "abc[3][4][5]efgabcab"

// 若是有分组则按照$1, $2, $3的形式进行引用，而 $& 则表示的是整个正则表达式匹配的内容。
```

### MySQL索引类型:
普通索引: 就普通的类型
唯一索引: 代表索引的值唯一不重复(允许有空值),相对于上面多了个UNIQUE
主键索引:(创建表的跟随创建,唯一索引，不允许有空值)
组合索引(就是将多个字段都建立到一个索引)

###  MVVM 和 MVC 的差异? 听说过 MVP?
[MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)
[浅析前端开发中的 MVC/MVP/MVVM 模式](https://juejin.im/post/593021272f301e0058273468)


### web浏览器最大并发请求数量限制
Chrome的并发请求为 6 个

### ES5\ES6除了写法不一样，还有哪些区别
1、class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量
2、class 声明内部会启用严格模式。
3、class 的所有方法（包括静态方法和实例方法）都是不可枚举的
4、class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。
5、必须使用 new 调用 class

### ES5\ES6在继承方面的区别
ES5 和 ES6 子类 this 生成顺序不同。ES5 的继承先生成了子类实例，再调用父类的构造函数修饰子类实例，ES6 的继承先生成父类实例，再调用子类的构造函数修饰父类实例。这个差别使得 ES6 可以继承内置对象。
```javascript
function MyES5Array() {
  Array.call(this, arguments);
}

// it's useless
const arrayES5 = new MyES5Array(3); // arrayES5: MyES5Array {}

class MyES6Array extends Array {}

// it's ok
const arrayES6 = new MyES6Array(3); // arrayES6: MyES6Array(3) []
```

### let、const声明的全局变量
用 let 和 const 声明的全局变量并没有在全局对象中，只是一个块级作用域（Script）中
```javascript
let aa = 1;
const bb = 2;

console.log(window.aa); // undefined
console.log(window.bb); // undefined
```
[参考](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/30)


### npm安装模块的机制
https://www.bbsmax.com/A/qVdemmnEdP/
https://www.bbsmax.com/A/pRdB2AR1dn/
1. npm 模块安装机制：
发出npm install命令
查询node_modules目录之中是否已经存在指定模块
若存在，不再重新安装
若不存在
  npm 向 registry 查询模块压缩包的网址
  下载压缩包，存放在根目录下的.npm目录里
  解压压缩包到当前项目的node_modules目录
2、npm原理：
1）执行工程自身 preinstall
2）确定首层依赖模块
3）获取模块
4）模块扁平化（dedupe）
5）安装模块
6）执行工程自身生命周期
npm3下的模块安装机制：
npm3和npm2的不同主要体现在二级模块的安装上：
npm3会"尽量"把逻辑上某个层级的模块在物理结构上"全部"放在项目的第一层级里，具体我概括为以下三种情况：
1.在安装某个二级模块时，若发现第一层级还没有相同名称的模块，便把这第二层级的模块放在第一层级
2.在安装某个二级模块时，若发现第一层级有相同名称，相同版本的模块，便直接复用那个模块
3.在安装某个二级模块时，若发现第一层级有相同名称，但版本不同的模块，便只能嵌套在自身的父模块下方
在npm2中，依赖树的逻辑结构和它的物理结构相同
在npm3中，依赖树的逻辑结构和它的物理结构可能不同
利用npm dedupe去除冗余模块：
npm dedupe做了什么？它能够把凡是能够去除的冗余的二级依赖模块，“重定向”到名称／版本相同的一级模块

### vue-router/vuex
**vue-router**
1、编写一个类，类上定义静态属性install，调用install方法可以获得Vue构造函数。
2、通过Vue.mixin({beforeCreate})，可以将router实例注入到每个组件实例中。
3、通过Vue.component方法定义router-link、router-view组件。
4、类中监听hashchange事件或者popstate事件，做出相应动作。

**vuex**
1、通过install方法参数拿到Vue，然后调用Vue.mixin()可以将store实例注入到每个组件中。
2、拿到state，通过new Vue()实现响应式。
3、将modules中的getters、mutations、actions扁平化到根实例上；state按照嵌套关系打到实例上。



### git命令
git config --global user.name 
git config --global user.email
git init
git add readme.txt
git commit -m""
git staus
git diff readme.txt
git log
git log --graph --pretty=oneline --abbrev-commit
git log --pretty=oneline
git reset --hard HEAD^
git reset --hard HEAD~100
git reset --hard commitID
git reflog
git diff HEAD -- readme.txt
git checkout -- readme.txt
git reset HEAD readme.txt
git rm readme.txt
ssh-keygen -t rsa -C"youremail@example.com"

git remote add origin git@github.com:Mwangzhi/learngi.git
git remote -v
git push -u origin master
git clone
git push origin dev

git branch
git branch dev
git checkout dev
git checkout -b dev
git branch -d dev
git branch -D dev
git merge dev
git merge dev --no-ff

git stash
git stash apply
git stash pop
git stash list
git stash apply stash@{0}
git cherry-pick commitID

git pull
git branch --set-upstream-to=origin/dev dev

git tag v1.0
git tag
git tag -a 'tagname' -m 'balabala'
git tag -d v1.0
git push origin <tagename>
git push origin --tags
git push origin :refs/tags/<tagename>


### 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/87
https://mp.weixin.qq.com/s/v6R2w26qZkEilXY0mPUBCw?utm_source=tuicool&amp;utm_medium=referral
- 没有跨域问题，一般这种上报数据，代码要写通用的；（排除ajax）
- 不会阻塞页面加载，影响用户的体验，只要new Image对象就好了；（排除JS/CSS文件资源方式上报）
- 触发 GET 请求之后不需要获取和处理数据、服务器也不需要发送数据
- 相比 XMLHttpRequest 对象发送 GET 请求，性能上更好
- GIF的最低合法体积最小（最小的BMP文件需要74个字节，PNG需要67个字节，而合法的GIF，只需要43个字节）
### sql
https://github.com/v-DavidTang/StudyNotes/blob/master/SQL/sql_study_notes.md
select * from students where score>=80 and gender='M';

select * from students where score>=80 or gender='F';

select * from students where not class_id=2;
select * from students where class_id<>2;

select * from students where (score<80 or score>90) and gender='M';

select id,name,score from students;

select id ,name,score points from students where gender='M' order by score;

select id,name,score,gender from students where gender='M' order by score desc limit 3 offset 0

select COUNT(*) FROM students WHERE gender='M';

SELECT AVG(score) average FROM students WHERE gender = 'M';

SELECT CEILING(COUNT(*) / 3) FROM students;

SELECT COUNT(*) num,class_id FROM students GROUP BY class_id;

select s.id, s.name,s.class_id,c.name class_name,s.gender,s.score
from students s
inner join classes c
on s.class_id=c.id;


1、条件运算按照NOT、AND、OR的优先级进行，即NOT优先级最高，其次是AND，最后是OR。加上括号可以改变优先级
2、LIKE 关键字。WHERE name LIKE '%ab%'.   %表示任意字符
3、投影查询。SELECT id, score, name FROM students;不查出所有列，查指定列。
   列别名：SELECT id, score points, name FROM students;
   使用SELECT *表示查询表的所有列，使用SELECT 列1, 列2, 列3则可以仅返回指定列，这种操作称为投影。
4、DESC---->倒序 ASC--->升序
5、如果有WHERE子句，那么ORDER BY子句要放到WHERE子句后面
6、SQL记录集的索引从0开始
7、使用LIMIT <M> OFFSET <N>分页时，随着N越来越大，查询效率也会越来越低.
   在MySQL中，LIMIT 15 OFFSET 30还可以简写成LIMIT 30, 15。
8、对于统计总数、平均数这类计算，SQL提供了专门的聚合函数，使用聚合函数进行查询，就是聚合查询
9、COUNT AVG SUM MAX MIN
   如果聚合查询的WHERE条件没有匹配到任何行，COUNT()会返回0，而SUM()、AVG()、MAX()和MIN()会返回NULL
10、聚合查询的列中，只能放入分组的列.GROUP BY
   可以使用多个列进行分组,例如，统计各班的男生和女生人数
   SELECT class_id, gender, COUNT(*) num FROM students GROUP BY class_id, gender; 
11、多表查询。
    给表设置别名的语法是FROM <表名1> <别名1>, <表名2> <别名2>
    多表查询时，要使用表名.列名这样的方式来引用列和设置别名
12、连接查询
    注意INNER JOIN查询的写法是：
    先确定主表，仍然使用FROM <表1>的语法；
    再确定需要连接的表，使用INNER JOIN <表2>的语法；
    然后确定连接条件，使用ON <条件...>，这里的条件是s.class_id = c.id，表示students表的class_id列与classes表的id列相同的行需要连接；
    可选：加上WHERE子句、ORDER BY等子句。
    INNER JOIN只返回同时存在于两张表的行数据，由于students表的class_id包含1，2，3，classes表的id包含1，2，3，4，所以，INNER JOIN根据条件s.class_id = c.id返回的结果集仅包含1，2，3。
    RIGHT OUTER JOIN返回右表都存在的行。如果某一行仅在右表存在，那么结果集就会以NULL填充剩下的字段。
    LEFT OUTER JOIN则返回左表都存在的行。如果我们给students表增加一行，并添加class_id=5，由于classes表并不存在id=5的行，所以，LEFT OUTER JOIN的结果会增加一行，对应的class_name是NULL：
13、插入语句
    INSERT INTO <表名> (字段1, 字段2, ...) VALUES (值1, 值2, ...);插入一条
    INSERT INTO <表名> (字段1, 字段2, ...) VALUES (值1, 值2, ...),(值1, 值2, ...),(值1, 值2, ...),(值1, 值2, ...);插入多条
14、更新语句
    UPDATE <表名> SET 字段1=值1, 字段2=值2, ... WHERE ...;
    UPDATE语句可以没有WHERE条件，代表整个表更新。当where条件不成立时也默认代表整个表
15、删除语句
    DELETE FROM <表名> WHERE ...;
    DELETE语句可以没有WHERE条件，代表整个表删除。当where条件不成立时也默认代表整个表
16、show databases
17、create database test
18、drop database test
19、use test
20、show tables
21、对于Node.js程序，访问MySQL也是通过网络发送SQL命令给MySQL服务器。这个访问MySQL服务器的软件包通常称为MySQL驱动程序。不同的编程语言需要实现自己的驱动，MySQL官方提供了Java、.Net、Python、Node.js、C++和C的驱动程序，官方的Node.js驱动目前仅支持5.7以上版本.
22、
23、
24、
25、
26、
27、
28、
29、


### cluster
工作进程由 child_process.fork() 方法创建，因此它们可以使用 IPC 和父进程通信，从而使各进程交替处理连接服务。
虽然 cluster 模块主要用于网络相关的情况，但同样可以用于其他需要工作进程的情况。
### 进程间的通信方式
https://www.cnblogs.com/clement-jiao/p/10350613.html
工作进程由 child_process.fork() 方法创建，因此它们可以使用 IPC 和父进程通信,
进程间通信主要包括： 管道，系统IPC ( 包括消息队列，信号量，共享存储 )，SOCKET.
管道:
        1) 普通管道 PIPE：通常有种限制，一是半双工，只能单向传输；二是只能在父子进程间使用。
        2) 流管道  s_pipe：去除了第一种限制，可以双向传输。
        3) 命名管道 name_pipe：去除了第二种限制，可以在许多并不相关的进程之间进行通讯。

### 介绍下 HTTPS 中间人攻击
中间人攻击过程如下：
  1、服务器向客户端发送公钥。
  2、攻击者截获公钥，保留在自己手上。
  3、然后攻击者自己生成一个【伪造的】公钥，发给客户端。
  4、客户端收到伪造的公钥后，生成加密hash值发给服务器。
  5、攻击者获得加密hash值，用自己的私钥解密获得真秘钥。
  6、同时生成假的加密hash值，发给服务器。
  7、服务器用私钥解密获得假秘钥。
  8、服务器用加秘钥加密传输信息
防范方法：
服务端在发送浏览器的公钥中加入CA证书，浏览器可以验证CA证书的有效性
### 介绍下前端加密的常见场景和方法
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/150
1、密码传输
使用 Base64 / Unicode+1 等方式加密成非明文，后端解开之后再存它的 MD5/MD6 。
直接使用 MD5/MD6 之类的方式取 Hash ，让后端存 Hash 的 Hash 。
2、数据包加密
全面采用 HTTPS
3、展示成果加密（小说网站、求职网站）
### 下面代码打印什么
```javascript
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
```
### 不常见的API
1、URLSearchParams
```javascript
let q=new URLSearchParams('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33').get('elective')
console.log(q)//800,700
```
2、setTimeout(a,b,c)
```javascript

```
### 一道题
```javascript
var name = 'Tom';
(function () {
    if (typeof name == 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();//Goodbye Jack
```
```javascript
var name = 'Tom';
(function () {
    if (typeof name == 'undefined') {
        name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();//Hello Tom
```
### vue 如何优化首页的加载速度？vue 首页白屏是什么问题引起的？如何解决呢？
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/234
### 两段代码执行时间
```javascript
for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 1000; j++) {
        for (let k = 0; k < 10000; k++) {
        }
    }
}
```
```javascript
for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < 1000; j++) {
        for (let k = 0; k < 100; k++) {

        }
    }
}
```
第一段执行时间少于第二段。根据i、j、k 判断次数来确定。
1、i会循环100次，判断i<100 100次
j会循环100 * 1000次，判断j<100 100 * 1000次
k会循环100 * 1000 * 10000次，判断k<100 100 * 1000 * 10000次

2、i会循环10000次，判断i<100 10000次
j会循环10000 * 1000次，判断j<100 10000 * 1000次
k会循环100 * 1000 * 10000次， 判断k<100 100 * 1000 * 10000次

虽然判断k<100的次数都是一样的 但是前面两种判断就不一样了，由此可以看见时间长短。
**相同循环次数，外层越大，越影响性能**
### setTimeout
```javascript
var timeoutID = scope.setTimeout(function[, delay, param1, param2, ...]);
var timeoutID = scope.setTimeout(function[, delay]); 
var timeoutID = scope.setTimeout(code[, delay]);
```
### dsd
### dsd
### dsd
### dsd
### dsd
### dsd






### project
1、express原理，应用到项目中
2、依赖反转



### principle
express
koa中间件
promise
axios
stream
next函数：依次执行一个函数队列


















