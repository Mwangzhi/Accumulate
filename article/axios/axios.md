Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
## 1、axios的用法
### 1-1、第一种：
在发起[`delete`, `get`, `head`, `options`]请求时，可以这样使用：
```javascript
axios.get('/user',{
    headers,
    data
}).then(data=>{
    //do something
})
```
在发起[`post`, `put`, `patch`]请求时，可以这样使用：
```javascript
axios.post('/user',data,{
    headers,
}).then(data=>{
    //do something
})
```
这种方式发起请求，可以看到，`axios`被当作了一个对象，该对象上拥有许多方法，看起来就是这样子的：
```javascript
let axios = {
    delete() { },
    get() { },
    head() { },
    options() { },
    post() { },
    put() { },
    patch() { }
}
```

### 1-2、第二种：
发送所有类型请求时，都可以这样使用：
```javascript
axios('/user'，{
    method:'get',
    headers,
}).then(data=>{
    //do something
})
```
或者
```javascript
axios({
    url:'/user',
    method:'get',
    headers,
}).then(data=>{
    //do something
})
```
当然，`get`请求可以简化成这样：
```javascript
axios('/user').then(data=>{
    //do something
})
```
这种方式发起请求，可以看到，`axios`被当作了一个函数，看起来是这样子的：
```javascript
function axios(url,config) {
    //do something
}
```
## 2、axios是什么
### 2-1、axios既是对象又是方法
通过了解`axios`的用法，我们知道了，**axios既可以是一个对象，也可以是一个函数**，当作为对象时，它身上挂载了很多请求方法，比如：`get`、`post`、`head`等等；当作为函数时，它可以直接调用，传递配置参数，参数传递有两种形式，分别是`axios(url[,config])`、`axios(config)`。要做到这种效果，我们先来了解一下函数。
### 2-2、函数的3种角色：
Javascript中函数是很值得思考的东西，比如说，它有3种角色：
#### 2-2-1、第一种：普通函数
**函数就是一个普通函数**，这种角色在常见不过了，也是我们经常使用的，比如定义一个函数`foo`，然后调用它，可以是下面这样：
```javascript
//定义
function foo(){
    //do something
}
//调用
foo()
```
#### 2-2-2、第二种：构造函数
**函数也可以被当作一个构造函数**来使用，比如定义一个构造函数`Foo`，然后获取它的一个实例，可以是下面这样：
```javascript
//定义
function Foo(){
    //do something
}
//获取一个实例
let instance=new Foo()
```
#### 2-2-3、第三种：对象
敲黑板，划重点，**函数也可以被当作一个对象**，也就是说，我们可以将一个函数作为对象来使用，给它定义属性，获取它的属性值，此时和它的另外一个身份(函数)毫无关系。比如有一个函数`foo`，我们把它当成对象，给它定义属性，获取它的属性值：
```javascript
function foo(){
    //do something
}

//给foo定义一个属性，值为数字
foo.a=1;

//给foo定义一个属性，值为函数
foo.b=function(){};

//获取foo的属性a的值
console.log(foo.a)
```
了解了这些，我们来看下axios是如何做到多种使用方式的。
### 2-3、axios源码中是如何做到多种使用方式的
源码如下：
```javascript
function createInstance(defaultConfig) {
   //获取Axios的一个实例
  var context = new Axios(defaultConfig);
  //将Axios原型上的request方法的上下文(也就是this)绑定为刚创建的实例
  var instance = bind(Axios.prototype.request, context);
  //将Axios原型上的属性和方法扩展到instance上
  utils.extend(instance, Axios.prototype, context);
  //将创建的实例上的属性和方法扩展到instance上
  utils.extend(instance, context);
  //返回instance
   return instance;
}
//axios就是上面的instance
var axios = createInstance(defaults);

//...

module.exports = axios;
```
上面代码中，`Axios.prototype.request`是一个方法，用工具函数`bind`将它的上下文(this)绑定为Axios的实例，得到`instance`，也就是说`instance`是绑定`this`后的`request`方法,接下来就是围绕`instance`来搞事情了。
`instance`本身是一个函数，但是这里，将它作为一个对象来处理了，给它身上定义了一些属性和方法。

将`Axios.prototype`上的属性和方法扩展到了`instance`上，`Axios.prototype`上有哪些属性和方法呢，源码如下：
```javascript
//定义request方法，该方法是重点，其他调用方式最终调用的都是这个方法
Axios.prototype.request = function request(config){/* ... */}
//在原型上批量定义方法，这些方法不接收请求体数据，比如get请求
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {/* ... */};
});
//在原型上批量定义方法，这些方法接收请求体数据，比如post请求
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  Axios.prototype[method] = function(url, data, config) {/* ... */};
});
```
上面代码中都是在Axios的原型上定义方法，首先定义`request`方法，其次批量定义[`delete`, `get`, `head`, `options`]方法，最后批量定义[`post`, `put`, `patch`]方法，也就是说给原型上定义的这些方法最后都会被扩展到`instance`上，我们就可以这样使用了：`axios.get()`、`axios.post()`等等。
其实，无论我们是将`axios`作为一个对象来调用`get`、`post`方法，还是将`axios`作为一个函数来调用，最终调用的都是原型上的`request`方法。
## 3、config的合并顺序
了解了`axios`是如何做到多种使用方式的，接下来看一下`axios`中的配置，也就是用户传入的配置项是如何走完整个流程的。
### 3-1、通过`axios.get()`等没有请求体方法传入的配置
当我们这样调用`axios`时：
```javascript
axios.get('/user',{headers,timeout,...})
```
`axios`源码内部会将我们传入的配置做一层处理，这层处理很简单，首先判断是否传递`config`，然后将`method`、`url`合并到`config`，最后调用`request`方法，并将处理后的配置传递给`request`。
源码如下：
```javascript
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});
```
### 3-2、通过`axios.post()`等有请求体方法传入的配置
当我们这样调用`axios`时：
```javascript
axios.post('/user',{name:'wz'},{headers,timeout,...})
```
`axios`内部的处理方式和上面调用`get`方式几乎相同，唯一不同的是多处理了一下请求体数据。源码如下：
```javascript
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data //处理请求体参数
    }));
  };
});
```
### 3-3、`Axios.prototype.request`方法中对配置做了什么
`axios.get()`、`axios.post`、`axios()`，无论是哪种调用方式，最终都会调用`request`方法，看一下关于`request`方法的源码：
```javascript
Axios.prototype.request = function request(config) {
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  //...

  //这里可以看出配置的优先顺序，从左至右依次增高
  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  //将请求方法变为小写
  config.method = config.method.toLowerCase();

  //...
};
```
`request`方法先对参数做一次判断，如果第一个参数类型为字符串，也就是我们是这样使用的，`axios('/user',{...})`，会将字符串放到一个新对象上的`url`属性上，然后和第二个参数做依次合并。接下来就是按照从小到大的权重合并多个配置。<br>
1. `defaults`是`axios`的默认配置，权重最低。<br>
2. `{method:'get'}`是设置默认请求方法。<br>
3. `this.defaults`,是新创建`axios`实例时传入的配置对象.`axios.create({...})`
4. `config`,调用`axios`时传递的参数，权重最高。<br>

到这里`axios`内部对`config`的处理就算完成了，接下来，`config`会被依次交给请求拦截器去处理，让我们看一下`axios`中的拦截器吧。
## 4、组织拦截器、转换器、适配器
先看一下这3种东西的关系，如下图：</br>
图图图图图图
<br>这是三者的流程关系，拦截器和转换器可以有多个，他们的职责不一样，请求拦截器的任务是处理请求配置；转换器是处理请求体数据；适配器的作用是根据环境来确定使用哪种请求方法，浏览器环境使用`XMLHttpRequest`，`node`环境使用`http(s).request()`方法；响应拦截器是处理响应数据。
### 4-1、拦截器
拦截器是一个函数，分为两种类型：**请求拦截器**和**响应拦截器**，请求拦截器的主要作用是，提供了一种机制，使得我们可以集中处理各种请求时传递的参数，就好比人们去乘坐地铁一样，不管你是从哪里来的，手里拿着什么东西，只要乘坐地铁都会经过安检，拦截器就好比这道安检一样，每个安检有各自的安检任务，第一个安检通过后，会转交到第二个安检，第三个，直到所有的安检都通过了，才能抵达候车区。<br>

`axios`中关于拦截器的源码：
```javascript
function InterceptorManager() {
  //存放拦截器的容器
  this.handlers = [];
}

InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  //将用户传入的拦截器放入容器中，
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  //返回拦截器在容器中的位置，用于取消拦截器
  return this.handlers.length - 1;
};

InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    //通过拦截器在容器中的位置，删除指定的拦截器
    this.handlers[id] = null;
  }
};

InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);//将遍历到的每一个拦截器回传给外部
    }
  });
};
```
拦截器相关的源码不难理解，`InterceptorManager`构造函数原型上定义了拦截器的添加、删除、遍历3个方法。需要注意的是，每一个拦截器又分为两个方法，成功和失败，这是因为，`axios`是基于`promise`实现链式调用的，所以每一个拦截器的成功失败方法会分别传递给`promise`的`then`方法当中。对`promise`不太了解的，可以看[这里](https://juejin.im/post/5af8ee2bf265da0b8f62a757)<br>

响应拦截器的道理和请求拦截器一样，只不过响应拦截器拦截的是返回的数据，而请求拦截器拦截的是请求的配置。
接下来就走到转换器了。
### 4-2、转换器
转换器是一个函数，分为两种类型：请求数据转换器和响应数据转换器。请求转换器函数接受2个参数，分别为`data`,`headers`,主要是处理请求体和请求头的。响应数据转换器主要是处理响应数据的，比如将JSON数据转为普通数据。<br>
源码中默认的转换器：
```javascript
let defaults={
    //请求数据转化器
    transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, 'Content-Type');
        //判断请求体数据类型为以下任一一种的话，直接返回
        if (utils.isFormData(data) ||
            utils.isArrayBuffer(data) ||
            utils.isBuffer(data) ||
            utils.isStream(data) ||
            utils.isFile(data) ||
            utils.isBlob(data)
        ) {
            return data;
        }
        if (utils.isArrayBufferView(data)) {
            return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
            return data.toString();
        }
        if (utils.isObject(data)) {
            setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
            return JSON.stringify(data);
        }
        return data;
    }],
    //响应数据转换器
    transformResponse: [function transformResponse(data) {
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (e) { /* Ignore */ }
        }
        return data;
    }],
}
```
上面代码简单看看就可以了，大概知道拦截器在做什么事情，其实仔细思考可以发现，转化器做到事情在拦截器里同样能够做到，只不过为了职责单一，分工明确，将数据处理这部分工作单独放到转换器里来做了。<br>
接下来就到发送请求了，这部分工作是由适配器做的。
### 4-3、适配器
适配器会根据当前使用`axios`的环境来决定使用哪种工具去发送请求，当前环境是浏览器的话，就会使用`XMLHttpRequest`,是`node`的话，会使用`http(s).request()`。<br>
源码如下：
```javascript
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // 浏览器环境，使用 xhr 适配器
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined') {
    // node环境，使用 http 适配器
    adapter = require('./adapters/http');
  }
  return adapter;
}
```
`./adapters/xhr`文件里，除了对IE进行一些判断处理外，基本上就是发送AJAX那几个经典步骤了，如下：
```javascript
//获取 XMLHttpRequest 实例
let xhr = new new XMLHttpRequest();
//确定请求方法等参数
xhr.open(method,url,...);
//监听请求状态
xhr.onreadystatechange = function () {
    //...
}
//发送请求
xhr.send();
```
`./adapters/http`文件里，是使用`node`的包`http`、`https`来完成请求的。
### 4-4、如何链式调用拦截器、转换器、适配器
`axios`内部是如何组织拦截器、转换器、适配器呢，看一下源码：
```javascript
Axios.prototype.request = function request(config) {
  //chain里存放着所有的拦截器、转换器、适配器
  var chain = [dispatchRequest, undefined];
  //生成一个成功的promise，数据为经过一系列处理后的配置
  var promise = Promise.resolve(config);
  //this.interceptors.request存放着所有的请求拦截器
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    //将所有的请求拦截器依次放入chain容器中，这里使用的是unshift，
    //也就是说，请求拦截器被是从chain容器的头部开始，依次放入。
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  //this.interceptors.response存放着所有的响应拦截器
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    //将所有的响应拦截器依次放入chain容器中，这里使用的是push，
    //也就是说，响应拦截器被是从chain容器的尾部开始，依次放入。
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    //链式调用chain容器中的拦截器、转换器、适配器，注意这里使用的是
    //chain.shift()方法，就是说取的时候是从chain容器头部开始，知道尾部，线性顺序。
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};
```
## 5、dispatchRequest都做了什么


```javascript

```

