
class Plant {
    constructor(name) {
        this.name = name
    }
    grow() {
        console.log('growing~~~~~~')
    }
}

class Apple extends Plant {
    constructor(name) {
        super(name)
        this.taste = '甜'
    }

}
class Orange extends Plant {
    constructor(name) {
        super(name)
        this.taste = '酸'
    }
}
class Factory {
    static create(name) {
        switch (name) {
            case 'apple':
                return new Apple('苹果')
                break
            case 'orange':
                return new Orange('橘子')
                break
        }
    }
}

let apple = Factory.create('apple')
let orange = Factory.create('orange')
console.log(apple)
console.log(orange)




//场景
class jQuery {
    constructor(selector) {
        let elements = Array.from(document.querySelector(selector))
        let length = elements ? elements.length : 0
        for (let i = 0; i < length; i++) {
            this[i] = elements[i]
        }
        this.length = length
    }
    html() { }
}
window.$ = function (selector) {
    return new jQuery(selector)
}

class Vnode {
    constructor(tag, attrs, children) {
        this.tag = tag
        this.attrs = attrs
        this.children = children
    }
}
React.createElement = function (tag, attrs, children) {
    return new Vnode(tag, attrs, children)
}

