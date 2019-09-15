/** 
class Parent {
    constructor(name) {
        this.name = name;
    }
    static eat() { console.log('eat') }
    say() { console.log('say') }
}

class Child extends Parent {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
    static eat() { console.log('child_eat') }
    say() { console.log('child_say') }
}
*/
//对以上代码的编译结果

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    //子类继承父类的公有方法.每一个原型都有一个属性constructor，指向实例原型所属的类。所以需要重写constructor.
    subClass.prototype = Object.create(superClass && superClass.prototype,
        {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    //子类继承父类的静态方法   Array、Object、Date、RegExp、自定义类都是Function的实例，他们的原型是同一个。
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Parent = function () {
    function Parent(name) {
        _classCallCheck(this, Parent);
        this.name = name;
    }
    _createClass(Parent, [{
        key: 'say',
        value: function say() {
            console.log('say');
        }
    }], [{
        key: 'eat',
        value: function eat() {
            console.log('eat');
        }
    }]);
    return Parent;
}();

var Child = function (_Parent) {
    _inherits(Child, _Parent);
    function Child(name, age) {
        _classCallCheck(this, Child);
        //继承父类的私有方法
        var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name));
        _this.age = age;
        return _this;
    }
    _createClass(Child, [{
        key: 'say',
        value: function say() {
            console.log('child_say');
        }
    }], [{
        key: 'eat',
        value: function eat() {
            console.log('child_eat');
        }
    }]);
    return Child;
}(Parent);










