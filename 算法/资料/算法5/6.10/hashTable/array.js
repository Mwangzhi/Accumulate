// V8 内部会用一个散列来处理arr
const arr = []
arr[100000] = 1
console.log(arr.length)


// V8 内部会用一个连续的数组来表示arr2
const arr2 = [1,2,3,4,5]
console.log(arr2.length)
