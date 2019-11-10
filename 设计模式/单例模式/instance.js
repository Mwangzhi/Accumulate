

class Window {
    constructor(name) {
        this.name = name
    }
    static getInstance(name) {
        if (!this.instance) {
            this.instance = new Window(name)
        }
        return this.instance
    }
}

let w1 = Window.getInstance()
let w2 = Window.getInstance()
console.log(w1 === w2)



//ES5单利模式
let window = function (name) {
    this.name = name
}
Window.prototype.getName = function () {
    console.log(this.name)
}
Window.prototype.getInstance = (function () {
    let window = null
    return function (name) {
        if (!window) {
            window = new Window(name)
        }
        return window
    }
})()



//透明单例
let Window = (function () {
    let window
    let Window = function (name) {
        if (window) {
            return window
        } else {
            this.name = name
            return window = this
        }
    }
    Window.prototype.getName = function () {
        console.log(this.name)
    }
    return Window
})()
let window1 = new Window('wz')
let window2 = new Window('wz')
console.log(window1 === window2)


//单例与构建分离
function Window(name) {
    this.name = name
}
Window.prototype.getName = function () {
    console.log(this.name)
}

let createSingle = (function () {
    let instance
    return function (name) {
        if (!instance) {
            instance = new Window(name)
        }
        return instance
    }
})()


//封装变化
function Window(name) {
    this.name = name
}
Window.prototype.getName = function () {
    console.log(this.name)
}


let createSingle = (function () {
    let instance
    return function () {
        if (!instance) {
            Constructor.apply(this, arguments)
            Object.setPrototypeOf(this, Constructor.prototype)
            instance = this
        }
        return instance
    }
})()

let CreateWindow = createSingle(Window)
let window1 = new CreateWindow('wz')
let window2 = new CreateWindow('wz')
window2.getName()
console.log(window1 === window2)
















