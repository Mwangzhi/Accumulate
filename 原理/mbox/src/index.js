

import { observable, autorun } from './mobx'






class Person {
    @observable name = 'wangzhi';
    @observable age = '29';
    get allName() {
        return this.name + '-' + this.age
    }
}
let p = new Person();
autorun(() => {
    console.log(p.allName)
})
p.name = 'wz'

















//原型方法修饰
// class Person{
//     @say
//     say() {
//         console.log('哈哈')
//     }
// }
// function say(target, key, descriptor) {
//     let oldSay = descriptor.value;
//     descriptor.value = function () {
//         console.log('start say');
//         oldSay();
//         console.log('end say')
//     }
// }
// let p = new Person();
// p.say()










// //属性修饰
// class Circle{
//     @readonly PI = 3.14;
// }
// //修饰属性的时候，target指代原型，key指代本身，descriptor指代属性描述符
// function readonly(target,key,descriptor) {
//     descriptor.writable = false;
//     return descriptor
// }






// //类装饰
// @add
// class My {

// }
// //修饰类的时候，target指代的是类本身
// function add(target) {
//     target.flag = 'ok'
// }
// console.log(My.flag)






// let o = observable([])

// autorun(() => {
//     console.log(o.length)
// })

// o.push(30)





