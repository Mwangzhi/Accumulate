

### 求集合的所有子集
**第一种**
```js
function allSub(S, decisions = []) {
    if (decisions.length === S.length) {
        console.log(decisions.map((flag,index)=>flag?S[index]:null).filter(i=>i!==null))  //这里拿到子集
        return;
    }
    allSub(S, decisions.concat(true))
    allSub(S, decisions.concat(false))
}
```
**第二种**
```js
function allSub(S, decisions = []) {
    console.log(decisions.map(i=>S[i]))//这里拿到子集
    const start = decisions.length > 0 ? decisions[decisions.length - 1] : -1
    for (let i = start + 1; i < S.length; i++) {
        allSub(S, decisions.concat(i))
    }
}
```
**一个集合S里面都是正整数，求和为N的所有非空子集**
```javascript
function sum_subset(S,N, path = []) {
  const head = S.slice(0, S.length - 1)
  const tail = S[S.length - 1]
  if(N === 0) {
    return [path]
  }
  if(head.length === 0) {
    return []
  }
  let r = []
  r = r.concat( sum_subset(head, N, path) )
  r = r.concat( sum_subset(head, N-tail, path.concat(tail)) )
  return r
}
```

### 组合问题
```js
function combination(S, k) {
    if (k === 0 || S.length === k) {
        return [S.slice(0,k)]
    }
    let [first, ...others] = S
    let r = []
    r = r.concat(combination(others, k - 1).map(c=>[first,...c]))
    r = r.concat(combination(others, k))
    return r
}
```
**9月20日题**
### 全排列函数
**第一种**
```js
function permutation1(str, select = []) {
  if (select.length === str.length) {
    return select.map(i => str[i]).join('')
  }
  let r = []
  for (let i = 0; i < str.length; i++) {
    if (select.indexOf(i) === -1) {
      r = r.concat(permutation1(str, select.concat(i)))
    }
  }
  return r
}
```
**第二种**
```js
function permutation2(str, select = [], left = [...str]) {
  if (left.length === 0) {
    return select.join('')
  }
  return [].concat(...left.map((c, i) => permutation2(
    str,
    select.concat(c),
    left.slice(0, i).concat(left.slice(i + 1))
  )))
}
```
### 数组与坐标
**当数组为一维数组时**
> 通过数组下标和要建立的坐标系的横向长度，建立一个坐标系。然后操作坐标系,左上角坐标为[0,0]
```js
/**
 * 
 * @param {当前值在数组中的下标} i 
 * @param {数组划分为坐标系时横向的个数} N 
 */
function xy(i, N){
    return [Math.floor(i / N), i % N]
}

/* 
[
    1,2,3,
    4,5,6,
    7,8,9,
    0,2,5
]
*/
console.log(xy(1,3))//2的坐标[ 0, 1 ]
console.log(xy(5,3))//6的坐标[ 1, 2 ]
console.log(xy(9,3))//0的坐标[ 3, 0 ]
```
**当数组为二维数组时**
> 直接用坐标就可以了，左上角坐标为[0,0]
```js
[
    [ 1,2,3,]
    [ 4,5,6,]
    [ 7,8,9,]
    [ 0,2,5 ]
]
```
### 求两个数的最大公约数
> 可以利用欧几里得迭代法，12和8的最大公约数等于12-8和8的最大公约数。

> 如果a>b,a/b存在最大公约数c。那么a=p*c, b=q*c。 

> 那么a-b=c*(p-q)，因此a-b和b也存在最大公约数c。
```js
function gcd(a, b) {
    if (a === b) return a
    if (a > b) return gcd(a - b, b)
    return gcd(a,b-a)
}
```












### 其他
#### 1、**Math.floor(3.2) === ~~(3.2)**
```js
Math.floor(3.2) === ~~(3.2)
```
#### 2、**数字a乘以数字b，当b等于2的n次方时，可以简写成a<<n**
```js
2 * 8 === 2 << 3
```
#### 3、**取数字**
给定一个数字如123，分别取出1、2、3.(基数排序)
```js
let m = 1
let max=123
while (m < max) {
    const digit = ~~(max % (m * 10) / m)
    console.log(digit)
    m *= 10
}
//3
//2
//1
```
#### 4、**判断一个数是否是某个整数的平方**
```js
// 答案1
function isSquare(n) {
  return Math.sqrt(n) % 1 === 0
}

// 答案2
function isSquare(n) {
  return Number.isInteger(Math.sqrt(n)
}

// 答案3
function isSquare(n){
  const s = Math.sqrt(n)
  return s === (s | 0)
  // return s === ( ~~s )
}
```
#### 5、**反转一个数组**
```js
function reverse(A){
  for(let i = 0; i < (A.length / 2); i++){
    const t = A[i]
    A[i] = A[A.length - i - 1]
    A[A.length - i - 1] = t
  }
}

function reverse(A){
  return A.length  ? 
    reverse( A.slice(1) ).concat(A[0]) : A
}

function reverse(A){
  const [f, ...tail] = A
  return [...(tail.length ? reverse(tail) : []), f]
}

// 尾递归
function reverse(A, i = 0){
  if(i < A.length / 2) {
    const t = A[i]
    A[i] = A[A.length - i - 1]
    A[A.length - i - 1] = t
    return reverse(A, i+1)
  }
}
```
#### 6、**判断一个数是否是素数**
```js
function is_prime(num) {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false
    }
    return num !== 1
}
```
#### 7、等差数列公式
`和=(首项+末项)×项数÷2 `
`末项=首项+(项数-1)×公差 `
`项数＝（末项－首项）÷公差+1 `


#### 8、等比数列公式


#### 9、数组的交集、并集和补集
```
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])

//并集
let union = new Set([...a, ...b])

//交集
let intersect = new Set([...a].filter(x => b.has(x)))

//差集
let difference = new Set([...a].filter(x => !b.has(x)))
```
#### 10、得到一个序列
**第一种**
```
[...Array(number).keys()]  // Array(number).keys()得到一个迭代器
```
**第二种**
```
Array.from({ length: 10 }, (_, i) => i)
```
#### 11、位运算
##### 左移符号**<<**可以看成是a * (2 ^ b)
```
10<<2
//a=10,b=2 带入公式10*(2^2)得到40
```
##### 右移符号**>>**可以看成是a / (2 ^ b),除不尽的话自动向下取整
右移很好用，比如可以用在二分算法中取中间值
```
10>>2
//a=10,b=2 带入公式10/(2^2)得到2
```
##### 按位与
每一位都为 1，结果才为 1
```
8 & 7 // -> 0
// 1000 & 0111 -> 0000 -> 0
```
##### 按位或
其中一位为 1，结果就是 1
```
8 | 7 // -> 15
// 1000 | 0111 -> 1111 -> 15
```
##### 按位异或
每一位都不同，结果才为 1
```
8 ^ 7 // -> 15
8 ^ 8 // -> 0
// 1000 ^ 0111 -> 1111 -> 15
// 1000 ^ 1000 -> 0000 -> 0
```
##### 两个数不使用四则运算得出和
这道题中可以按位异或，因为按位异或就是不进位加法，8 ^ 8 = 0 如果进位了，就是 16 了，所以我们只需要将两个数进行异或操作，然后进位。那么也就是说两个二进制都是 1 的位置，左边应该有一个进位 1，所以可以得出以下公式 a + b = (a ^ b) + ((a & b) << 1) ，然后通过迭代的方式模拟加法
```
function sum(a, b) {
    if (a == 0) return b
    if (b == 0) return a
    let newA = a ^ b
    let newB = (a & b) << 1
    return sum(newA, newB)
}
```
#### 判断回文字符串
```
function h(str) {
    return str.length === 0 || 1 ? true : (str[0] === str[str.length - 1] ? h(str.slice(1, -1)) : false)
}

console.log(h('chromemorhc'))
console.log(h('chrommorhc'))
```
### 进制转换
parseInt(string, radix)
  radix 为介于2-36之间的数。
parseInt的更多用法:
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt
**十进制转二进制**
```javascript
let num=8;
num.toString(2)
```
**二进制转十进制**
```javascript
let num='111';//这是二进制树，调用parseInt时不需要在前缀'0b'
parseInt(num,2);
```

### 代码还可以这样写
#### 1、asdf
```javascript
let obj = { a: 1, b: 2 };
for (let key in obj) {
    if (!obj[key]) {
        obj[key] = 0;
    } else {
        obj[key] += 1;
    }
}
//-------------等价于------------------

let obj = { a: 1, b: 2 };
for (let key in obj) {
    obj[key] = (obj[key] || 0) + 1;
}
```
### 过滤数组
```javascript
const f = (A, B) => A.concat(' ', B).split(' ').filter((e, i, arr) => arr.indexOf(e) === arr.lastIndexOf(e))
console.log(f("this apple is sweet", "this apple is sour"));
```




### 数组
1、双指针
2、将数组划分区域
3、hashMap
4、求和
5、先排序
一些题：
https://leetcode.com/problems/missing-number/  数组中丢失的数字
### 数字操作
1、求一个数字是否是完全平方。(perfect square).二分查找 https://leetcode.com/problems/valid-perfect-square/submissions/
### 二叉树操作

### 链表操作
1、在头部前面再插入一个节点
### 队列、栈操作

### 字符串
1、利用assic码表，将字符转换为数字。