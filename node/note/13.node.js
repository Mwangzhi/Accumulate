/**
 浏览器：
 宏任务：setTimeout 、setImmediate(只有IE有)、 MessageChannel
 微任务：promise.then 、MutationObserver(不兼容，IE11支持)

先会执行栈中的内容，栈中内容执行后执行微任务，微任务清空后再执行宏任务，宏任务会在栈中执行，不停的循环，event loop

node的主线程是单线程的
同步和异步指代的是被调用方法
阻塞和非阻塞针对的是调用者

 MessageChannel用法：
     console.log(123);
    let channel = new MessageChannel();
    let port1 = channel.port1;
    let port2 = channel.port2;
    // 异步代码 vue 就是宏任务
    port1.postMessage('hello');
    port2.onmessage = function (e) {
      console.log(e.data);
    }
    console.log(456);

 //MutationObserver用法：
    let observe = new MutationObserver(function () {
      console.log('dom全部塞进去了');
    });
    // 也是一个微任务
    observe.observe(div, { childList: true });
    for (let i = 0; i < 100; i++) {
      let p = document.createElement('p');
      div.appendChild(p);
    }
    console.log(1);
    let img = document.createElement('p');
    div.appendChild(img);
 */