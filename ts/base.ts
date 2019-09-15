
let a: number = 1;
let b: boolean = true;
let c: string | number = 1;

interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}


let fibonacci: number[] = [1, 1, 2, 3, 5];
let fib: Array<number> = [1, 1, 2, 3, 5];

interface NumberArray {
    [index: number]: number;
}
let fib2: NumberArray = [1, 1, 2, 3, 5];


function sum(x: number, y: number): number {
    return x + y;
}

let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
}


interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    return source.search(subString) !== -1;
}

function buildName(firstName: string, lastName?: string): void {

}

//函数重载
function reverse(x: string): string;
function reverse(x: number): number;
function reverse(x: string | number): string | number {
    return
}

//类型断言
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
        }
    }
    
    declare var jQuery: (string) => any;
    
    //声明文件
///<reference path="./jQuery.d.ts">


                // npm install @types/jQuery --save-dev


                //类型别名
                type Name = string;
                type NameResolver = () => string;
function getName(n: NameResolver): Name {
    return
                }
                
                //字符串字面量
                type EventName = 'click' | 'scroll' | 'mlusemove';
function handleEvent(ele: Element, event: EventName) {

                }

                //元组
                let xcatLiu: [string, number] = ['Xcat liu', 25];
                let xcatliu: [string, number];
                xcatliu[0] = 'Xcat Liu';//单个赋值正确。同时赋值时，必须全部赋值
                xcatliu[1] = 1;//越界访问或者添加元素，元素是已经存在类型的联合类型
                
                
                //枚举
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat };
                console.log(Days['Sun'] === 0);
                console.log(Days[0] === 'Sun');
enum Days2 {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat };//手动赋值，未赋值的接最后一个赋值的
enum Color {Red, Green, Blue = "blue".length };//Blue为计算所得项,如果紧接在计算所得项后面的是未手动赋值的项，那么
                //它就会因为无法获得初始值而报错
                
                //常熟枚举
const enum Directions {
                    Up,
                Down,
                Left,
                Right
            }//不能包含计算成员
            
            
            //外部枚举  外部枚举与声明语句一样，常出现在声明文件中
declare enum Directions1 {
                    Up,
                Down,
                Left,
                Right
            }
            
            
            //类
class Animal {
                    public name;
                private age;
                protected location;
    public constructor(name) {
                    this.name = name;
                }
            }
            
            //抽象类
abstract class Animal2 {
                    public name;
    public constructor(name) {
                    this.name = name;
                }
                public abstract sayHi();//抽象方法
            }
class Animal3 {
                    name: string;
    constructor(name: string) {
                    this.name = name;
                }
    sayHi(): string {
        return `My name is ${this.name}`
            }
        }
        
        //用接口来约束类
interface Alarm {
                    alert();
                }
interface Light {
                    lightOn();
                lightOff();
            }
class Door {

                }
                class SecurityDoor extends Door implements Alarm {
                    alert() {
                console.log('SecurityDoor alert')
            }
        }
class Car implements Alarm, Light {//一个类继承多个接口
                    alert() { }
    lightOn() {}
                lightOff() {}
                }
                //接口与接口之间可以是继承关系
interface LightableAlarm extends Alarm {
                    lightOn();
                lightOff();
            }
            
            //接口也可以继承类
class Point {
                    x: number;
                y: number;
            }
interface Point3d extends Point {
                    z: number;
            }
            
            
interface Counter {
                    (start: number): string;
                interval: number;
                reset(): void;
            }
function getCounter(): Counter {
                    let counter = <Counter>function (start: number) {};
                    counter.interval = 123;
    counter.reset = function () {};
                    return counter;
                }
                
                
                //泛型
function createArray<T>(length: number, value: T): Array<T> {
                        let result: T[] = [];
                        return result;
                    }
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
                    }
                    //泛型约束
interface Lengthwise {
                            length: number;
                    }
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    return arg;
                        }
                        //多个类型参数之间也可以互相约束
function copyFields<T extends U, U>(target: T, source: U): T {
    return target;
                        }
                        //泛型接口
interface createArrayFunc {
                                <T>(length: number, value: T): Array<T>
                                    }
                                    //此时在使用泛型接口的时候，需要定义泛型的类型
interface createArrayFunc1<T> {
                                        (length: number, value: T): Array<T>
}



                                        //泛型类
                                        class GenericNumber<T>{
                                            zeroValue: T;
                                            add: (x: T, y: T) => T;
                                        }
                                        
                                        //泛型参数的默认类型
function createArray6<T = string>(length: number, value: T): Array<T> {
                                                let result: T[] = [];
                                                return result
                                            }
                                            
