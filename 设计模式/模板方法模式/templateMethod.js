

/* 
一种基于继承的设计模式——模板方法（Template Method）模式
模板方法模式是一种严重依赖抽象类的设计模式
模板方法模式是基于继承的一种设计模式，父类封装了子类的算法框架和方法的执行顺序，
子类继承父类之后，父类通知子类执行这些方法，好莱坞原则很好地诠释了这种设计技巧，
即高层组件调用底层组件。
*/

//我们把泡茶和冲咖啡这两件事情的公共部分抽离，编写一个抽象类
let Beverage = function () { };
Beverage.prototype.boilWater = function () { console.log('把水煮沸'); }
Beverage.prototype.brew = function () { };//空方法，因该由子类重写
Beverage.prototype.pourInCup = function () { };//空方法，因该由子类重写
Beverage.prototype.addCondiments = function () { };//空方法，因该由子类重写
Beverage.prototype.init = function () {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
}

//编写一个咖啡类
let Coffee = function () { };
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function () {
    console.log('用沸水冲泡咖啡');
}
Coffee.prototype.pourInCup = function () {
    console.log('把咖啡倒进杯子');
}
Coffee.prototype.addCondiments = function () {
    console.log('加糖和牛奶');
}

let coffee = new Coffee();
coffee.init();