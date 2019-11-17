


/* 
迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象
的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即
使不关心对象的内部构造，也可以按顺序访问其中的每个元素

迭代器可以分为内部迭代器和外部迭代器
外部迭代器必须显式地请求迭代下一个元素.外部迭代器增加了一些调用的复杂度，但相对也增强了迭代器的灵活性，我们可以手工控制
迭代的过程或者顺序。

外部迭代器虽然调用方式相对复杂，但它的适用面更广，也能满足更多变的需求。内部迭代
器和外部迭代器在实际生产中没有优劣之分，究竟使用哪个要根据需求场景而定。
*/


//实现一个迭代器
//each 函数属于内部迭代器， each 函数的内部已经定义好了迭代规则，它完
// 全接手整个迭代过程，外部只需要一次初始调用
function forEach(obj, cb) {
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            cb(i, obj[i], obj);
        }
    } else {
        for (key in obj) {
            cb(key, obj[key], obj);
        }
    }
}

//实现一个外部迭代器
function Iterator(obj) {
    let current = 0;
    let next = function () {
        current += 1;
    }
    let isDone = function () {
        return current >= obj.length;
    }
    let getCurrentItem = function () {
        return obj[current];
    }
    return {
        next,
        isDone,
        getCurrentItem
    }
}





