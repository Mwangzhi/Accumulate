function Animal(type) {
    this.type = type
}
Animal.prototype.say = function say() {
    console.log('say')
}


function mockNew() {
    let Constructor = [].shift.call(arguments)
    let obj = {}
    obj.__proto__ = Constructor.prototype
    let r = Constructor.apply(obj, arguments)
    return r instanceof Object ? r : obj
}
let animal = mockNew(Animal, '哺乳类')
animal.say()






function create() {
    // 1、创建一个空的对象
    var obj = new Object(),
        // 2、获得构造函数，同时删除 arguments 中第一个参数
        Con = [].shift.call(arguments);
    // 3、链接到原型，obj 可以访问构造函数原型中的属性
    Object.setPrototypeOf(obj, Con.prototype);
    // 4、绑定 this 实现继承，obj 可以访问到构造函数中的属性
    var ret = Con.apply(obj, arguments);
    // 5、优先返回构造函数返回的对象
    return ret instanceof Object ? ret : obj;
};