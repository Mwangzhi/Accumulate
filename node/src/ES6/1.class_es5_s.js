/**class Parent {
    constructor(name) {
        this.name = name;
    }
    static eat() { console.log('eat') }
    say() { console.log('say') }
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