

/* 
命令模式是最简单和优雅的模式之一，命令模式中的命令（command）指的是一个执行某些
特定事情的指令。
命令模式最常见的应用场景是：有时候需要向某些对象发送请求，但是并不知道请求的接收
者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，使得请求发
送者和请求接收者能够消除彼此之间的耦合关系

命令其实即使具体干活的函数，它通常会被包装一层，包装后的命令对外提供执行接口、撤销接口等。


*/


//bindClick方法是将命令与接收者关联起来
var bindClick = function (button, func) {
    button.onclick = func;
};
//一条命令
var MenuBar = {
    refresh: function () {
        console.log('刷新菜单界面');
    }
};
//又一条命令
var SubMenu = {
    add: function () {
        console.log('增加子菜单');
    },
    del: function () {
        console.log('删除子菜单');
    }
};
//请求的发送者和接收者关联起来
bindClick(button1, MenuBar.refresh);

//================================================================================================================
// 在传统面向对象语言中，会将命令包装成类，对外提供统一接口。
// MenuBar被RefreshMenuBarCommand包装过了
var setCommand = function (button, func) {
    button.onclick = function () {
        func();
    }
};
var MenuBar = {
    refresh: function () {
        console.log('刷新菜单界面');
    }
};
var RefreshMenuBarCommand = function (receiver) {
    return function () {
        receiver.refresh();
    }
};
var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(button1, refreshMenuBarCommand);

//================================================================================================================
// 撤销是命令模式里一个非常有用的功能
// 命令队列，维护一个队列，里面存放执行过的命令，这样就能实现撤销或者重做的功能。













