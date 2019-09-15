// 利用generator构建
function* flattern(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            yield* flattern(arr[i])
        } else {
            yield arr[i]
        }
    }
}
console.log([...flattern([1, [2], [[3]], [[[[4]]]]])])


//普通解法
function flattern(arr) {
    return [].concat(...arr.map(x => Array.isArray(x) ? flattern(x) : x))
}
console.log([...flattern([1, [2], [[3]], [[[[4]]]]])])


function flatten(arr){
    let arrs = []
    let newArr = []
    while (arrs.length > 0) {
        let item = arrs.shift();
        if (Array.isArray(item)) {
            arrs.unshift(...item)
        } else {
            newArr.push(item)
        }
    }
    return newArr;
}