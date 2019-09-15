/* 
创建型：4   工厂建造单原
工厂模式
建造者模式
单例模式
原型模式

结构型模式：7  饰适外代桥组享
装饰器模式
适配器模式
外观模式
代理模式
桥接模式
组合模式
享元模式

行为型：11    策模迭，观察者的职责、命令就是将访问者、中介者的状态解释到备忘录上
策略模式
模板方法模式
迭代器模式
观察者模式
职责链模式
命令模式
中介者模式
访问者模式
状态模式
解释器模式
备忘录模式
*/
//----------------------------merge_sort---------------------------------
function merge(A, p, q, r) {
    let A1 = A.slice(p, q)
    let A2 = A.slice(q, r)
    A1.push(Number.MAX_SAFE_INTEGER)
    A2.push(Number.MAX_SAFE_INTEGER)
    for (let k = p, i = 0, j = 0; k < r; k++) {
        A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++]
    }
}
function merge_sort(A, p = 0, r = A.length) {
    if (r - p < 2) return
    const q = Math.ceil((p + r) / 2)
    merge_sort(A, p, q)
    merge_sort(A, q, r)
    merge(A, p, q, r)
}
//-------------------------insert_sort--------------------------------------
function insert_sort(A) {
    for (let j = 1; j < A.length; j++) {
        const key = A[j]
        let i = j - 1
        while (i >= 0 && A[i] > key) {
            A[i + 1] = A[i]
            i--
        }
        A[i + 1] = key
    }
}
function bucket_sort(A, k, S) {
    const buckets = Array.from({ length: k }, () => [])
    for (let i = 0; i < A.length; i++) {
        const index = ~~(A[i] / S)
        buckets[index].push(A[i])
    }
    for (let i = 0; i < buckets.length; i++) {
        insert_sort(buckets[i])
    }
    return [].concat(...buckets)
}
//---------------------qsort----------------------------------------
function swap(A, i, j) {
    [A[i], A[j]] = [A[j], A[i]]
}
function partition(A, lo, hi) {
    const pivot = A[hi - 1]
    let i = lo, j = hi - 1
    while (i !== j) {
        if (A[i] <= pivot) {
            i++
        } else {
            swap(A, i, --j)
        }
    }
    swap(A, j, hi - 1)
    return j
}
function qsort(A, lo = 0, hi = A.length) {
    if (hi - lo <= 1) return
    const p = partition(A, lo, hi)
    qsort(A, lo, p)
    qsort(A, p + 1, hi)
}
//---------------------counting_sort----------------------------------------
function counting_sort(A) {
    const max = Math.max(...A)
    const B = Array(max + 1).fill(0)
    const C = Array(A.length)
    A.forEach((_, i) => B[A[i]]++)
    for (let i = 1; i < B.length; i++) {
        B[i] = B[i - 1] + B[i]
    }
    for (let i = 0; i < A.length; i++) {
        const p = B[A[i]] - 1
        B[A[i]]--
        C[p] = A[i]
    }
    return C
}

//---------------------radix_sort----------------------------------------
function radix_sort(A) {
    const max = Math.max(...A)
    const buckets = Array.from({ length: 10 }, () => [])
    let m = 1
    while (m < max) {
        A.forEach(number => {
            const digit = ~~(number % (m * 10) / m)
            buckets[digit].push(number)
        })
        let j = 0
        buckets.forEach(bucket => {
            while (bucket.length > 0) {
                A[j++] = bucket.shift()
            }
        })
        m *= 10
    }
}


//---------------------bsearch----------------------------------------
function bsearch(A, x) {
    let l = 0,
        r = A.length - 1,
        guess
    while (l <= r) {
        guess = Math.floor((l + r) / 2)
        if (A[guess] === x) return guess
        if (A[guess] > x) {
            if (guess === 0 || A[guess - 1] < x) {
                return guess
            }
            r = guess - 1
        } else {
            if (guess === A.length - 1 || A[guess - 1]) {
                return guess + 1
            }
            l = guess + 1
        }
    }
}


//---------------------flat----------------------------------------
function flat(arr) {
    return [].concat(...arr.map(x => Array.isArray(x) ? flat(x) : x))
}

//---------------------reverse----------------------------------------
function reverse(A) {
    return A.length ? reverse(A.slice(1)).concat(A[0]) : A
}
function reverse1(A) {
    const [f, ...tail] = A
    return [...(tail.length ? reverse(tail) : []), f]
}

//---------------------is_prime----------------------------------------
function is_prime(num) {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false
    }
    return num !== 1
}

//---------------------curry----------------------------------------
function curry(func) {
    const g = (...allArgs) => allArgs.length >= func.length ?
        func(...allArgs) : (...args) => g(...allArgs, ...args)
    return g
}

//---------------------sort 0 1 2----------------------------------------
function swap(A, i, j) {
    [A[i], A[j]] = [A[j], A[i]]
}


function sort(A) {
    let lo = 0,
        hi = A.length - 1,
        mid = 0
    while (mid <= hi) {
        switch (A[mid]) {
            case 0:
                swap(A, lo++, mid)
                break
            case 1:
                mid++
                break
            case 2:
                swap(A, hi--, mid)
                break
        }
    }
}
//---------------------bit_count----------------------------------------
function bit_count(n) {
    let c = 0
    while (n >>= 1) {
        c += n & 1
    }
    return c
}

function sc(s) {
    return [...s].filter(c => s.includes(c.toUpperCase()) && s.includes(c.toLowerCase())).join()
}

function sort(A) {
    const freq = {}
    A.forEach(x => freq[x] === undefined
        ? freq[x] = 1 : freq[x]++)
    return A.sort((a, b) => freq[b] - freq[a] || a - b)
}


function radix_sort(A) {
    const maxLength = Math.max(...A.map(word => word.length))
    const buckets = Array.from({ length: 27 }, () => [])
    for (let i = maxLength - 1; i >= 0; i--) {
        A.forEach(word => {
            const index = word[i] ? word[i].toUpperCase().charCodeAt(0) - 65 : 0
            buckets[index].push(word)
        })
        console.log(buckets.map(x => [...x]))
        let j = 0
        buckets.forEach(bucket => {
            while (bucket.length > 0) {
                A[j++] = bucket.shift()
            }
        })
    }
    return A
}
console.log(radix_sort(['god', 'apple', 'alice', 'bob', 'boy', 'google']))

let obj = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: '',
                    minChunks: 2,
                    minSize: 0
                },
                vendor: {
                    test: '',
                    chunks: '',
                    name: ''
                }
            }
        }
    }
}


//-------------------------------------------------------------
function sum_subset(S, N, path = []) {
    const head = S.slice(0, S.length - 1)
    const tail = S[S.length - 1]
    console.log(path)
    if (N === 0) {
        return [path]
    }
    if (head.length === 0) {
        return []
    }
    let r = []
    r = r.concat(sum_subset(head, N, path))
    r = r.concat(sum_subset(head, N - tail, path.concat(tail)))
    return r
}
// console.log(sum_subset([1,3,8,5,2],8))

function sum_subset(S, N) {
    let r = []
    function allSub(S, decisions = []) {
        if (decisions.length === S.length) {
            decisions = decisions.map((flag, index) => flag ? S[index] : null).filter(i => i !== null)
            if (decisions.reduce((s, c) => s + c, 0) === N) {
                r.push(decisions)
            }
            return;
        }
        allSub(S, decisions.concat(true))
        allSub(S, decisions.concat(false))
    }
    allSub(S)
    return r;
}
// console.log(sum_subset([1,3,8,5,2],8))


function sum_subset(S, N) {
    let r = []
    function allSub(S, decisions = []) {
        if (decisions.map(i => S[i]).reduce((s, c) => s + c, 0) === N) {
            r.push(decisions.map(i => S[i]))
        }
        const start = decisions.length > 0 ? decisions[decisions.length - 1] : -1
        for (let i = start + 1; i < S.length; i++) {
            allSub(S, decisions.concat(i))
        }
    }
    allSub(S)
    return r
}
// console.log(sum_subset([1,3,8,5,2],8))




/* 
    创建一个双向链表，打印、插入、合并
*/
class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    //打印链表
    print() {
        let p = this.head
        const r = []
        while (p) {
            r.push(p)
            p = p.next
        }
        r.push('NULL')
        console.log(r.join('<->'))
    }
    //插入一个键为{key}的元素到链表头部
    insert(key) {
        const node = new ListNode(key)
        if (this.head) {
            this.head.prev = node
            node.next = this.head
        } else {
            this.tail = node
        }
        this.head = node
    }
    //将list合并到链表末尾
    merge(list) {
        this.tail.next = list.head
        this.tail = list.tail
        list.head.prev = this.tail
    }
}
class ListNode {
    constructor(key) {
        this.prev = null
        this.next = null
        this.key = key
    }
}





/*
    创建一个最大堆，包含排序方法extract
 */
function swap(A, i, j) {
    const t = A[i]
    A[i] = A[j]
    A[j] = t
}
class MaxHeap {
    constructor(data) {
        this.list = data
        this.heapSize = data.length
        this.build()
    }
    build() {
        let i = Math.floor(this.heapSize / 2) - 1
        while (i >= 0) {
            this.max_heapify(i)
        }
    }
    extract() {
        if (this.heapSize === 0) return null
        const item = this.list[0]
        swap(this.list, 0, this.heapSize - 1)
        this.heapSize--
        this.max_heapify(0)
        return item
    }
    max_heapify(i) {
        const leftIndex = 2 * i + 1
        const rightIndex = 2 * i + 2
        let maxIndex = i
        if (leftIndex < this.heapSize && this.list[leftIndex] >
            this.list[maxIndex]) {
            maxIndex = leftIndex
        }
        if (rightIndex < this.heapSize && this.list[rightIndex] >
            this.list[maxIndex]) {
            maxIndex = rightIndex
        }
        if (i !== maxIndex) {
            swap(this.list, maxIndex, i)
            this.max_heapify(maxIndex)
        }
    }
}
//用堆解决问题
//用堆实现一个排序算法`heap_sort(A)`，对数组A进行排序
function heap_sort(A) {
    const heap = new MaxHeap(A)
    console.log(heap.list)
    while (heap.heapSize > 0) {
        A[heap.heapSize - 1] = heap.extract()
    }
}
//用堆实现求一个数组前k大值的函数`maxk(A, k)`
function maxk(A, k) {
    const heap = new MaxHeap(A)
    const r = []
    while (k-- > 0) {
        r.push(heap.extract())
    }
    return r
}




/* 
    栈，入栈、出栈
*/
class Stack {
    constructor(max = 1000) {
        this.max = max
        this.sp = -1
        this.data = Array(max)
        this.size = 0
    }
    push(item) {
        if (this.sp === this.max - 1) {
            throw 'Stack Overflow'
        }
        this.data[++this.sp] = item
        this.size++
    }
    pop() {
        if (this.sp === -1) {
            throw 'Stack Underflow'
        }
        this.size--
        return this.data[this.sp--]
    }
}


//用栈解决问题
//写一个函数`match(str)`，判断一个字符串中的小括号是否匹配。
function match(str) {
    const stack = new Stack()
    for (let c of str) {
        if (c === '(') {
            stack.push('(')
        } else {
            if (stack.pop() !== '(') {
                return false
            }
        }
    }
    return stack.size === 0
}


function allSub(S, decisions = []) {
    if (decisions.length === S.length) {
        //sub
    }
    allSub(S, decisions.push(true))
    allSub(S, decisions.push(false))
}

function allSub(S, decisions) {
    //sub
    const start = decisions.length > 0 ? decisions[decisions.length - 1] : -1
    for (let i = start + 1; i < S.length; i++) {
        allSub(S, decisions.concat(i))
    }
}

function permutation(str, select = []) {
    if (select.length === str.length) {
        return select.map(i => str[i]).join('')
    }
    let r = []
    for (let i = 0; i < str.length; i++) {
        if (select.indexOf(i) === -1) {
            r = r.concat(permutation(str, select.concat(i)))
        }
    }
    return r
}

function permutation(str, select = [], left = [...str]) {
    if (left.length === 0) {
        return select.join('')
    }
    return [].concat(...left.map((c, i) => permutation(
        str,
        select.concat(c),
        left.slice(0, i).concat(left.slice(i + 1))
    )))
}

function xy(i, N) {
    return [Math.floor(i / N), i % N]
}

function xy(i, N) {
    return [~~(i / N), i % N]
}


let m = 1
let max = 123
while (m < max) {
    const digit = ~~(max % (m * 10) / m)
    m *= 10
}

function isSquare(n) {
    return Number.isInteger(Math.sqrt(n))
}


function reverse(A) {
    for (let i = 0; i < (A.length / 2); i++) {
        const t = A[i]
        A[i] = A[A.length - 1 - i]
        A[A.length - 1 - i] = t
    }
}
function reverse(A) {
    return A.length ? reverse(A.slice(1)).concat(A[0]) : A
}
function reverse(A) {
    const [first, ...tail] = A
    return [...(tail.length ? reverse(tail) : []), first]
}

function reverse(A, i = 0) {
    if (i < A.length / 2) {
        const t = A[i]
        A[i] = A[A.length - i - 1]
        A[A.length - i - 1] = t
        return reverse(A, i + 1)
    }
}

function is_prime(num) {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) { return false }
    }
    return num !== 1
}



function Promise(executor) {
    let self = this
    self.status = 'pending'
    self.value = undefined
    self.onResolvedCallbacks = []
    self.onRejectedCallbacks = []
    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject)
        }
        setTimeout(() => {
            if (self.status == 'pending') {
                self.value = value
                self.status = 'resolved'
                self.onResolvedCallbacks.forEach(item => item(value))
            }
        });
    }
    function reject(value) {
        setTimeout(() => {
            if (self.status == 'pending') {
                self.value = value
                self.status = 'rejected'
                self.onRejectedCallbacks.forEach(item => item(value))
            }
        });
    }
    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
    let self = this
    let promise2
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
        return value
    }
    onRejected = typeof onRejected === 'function' ? onRejected : function (value) {
        return value
    }
    if (self.status === 'resolved') {
        promise2 = new Promise(function (resolve, reject) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            });
        })
    }
    if (self.status === 'rejected') {
        promise2 = new Promise(function (resolve, reject) {
            setTimeout(() => {
                try {
                    let x = onRejected(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            });
        })
    }
    if (self.status === 'pending') {
        promise2 = new Promise(function (resolve, reject) {
            self.onResolvedCallbacks.push(function (value) {
                try {
                    let x = onFulfilled(value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
    return promise2
}
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('cycle reference'))
    }
    let then, called
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            then = x.then
            if (typeof then === 'function') {
                then.call(x, function (y) {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, function (r) {
                    if (called) return true
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}
Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        resolve(value)
    })
}
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let result = []
        let count = 0
        for (let i = 0; i < promises.length; i++) {
            promises[i].then((data) => {
                result[i] = data
                if (++count == promises.length) {
                    resolve(result)
                }
            }, function (err) {
                reject(err)
            })
        }
    })
}
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        }
    })
}
Promise.defer = Promise.deferred = function () {
    let defer = {}
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve
        defer.reject = reject
    })
    return defer
}




function EventEmitter() {
    this.events = {}
    this._maxListeners = 10
}
EventEmitter.prototype.setMaxListeners = function (maxListeners) {
    this._maxListeners = maxListeners
}
EventEmitter.prototype.listeners = function (event) {
    return this.events[event]
}
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (type, listener) {
    if (this.events[type]) {
        this.events[type].push(listener)
        if (this._maxListeners != 0 && this.events[type].length > this.maxListeners) {
            console.error('exceed')
        }
    } else {
        this.events[type] = [listener]
    }

}
EventEmitter.prototype.once = function (type, listener) {
    let wrapper = (...rest) => {
        listener.apply(this)
        this.removeListener(type, wrapper)
    }
    this.on(type, wrapper)
}
EventEmitter.prototype.removeListener = function (type, listener) {
    if (this.events[type]) {
        this.events[type] = this.events[type].filter(l => l != listener)
    }
}
EventEmitter.prototype.removeAllListeners = function (type) {
    delete this.events[type]
}
EventEmitter.prototype.emit = function (type, ...rest) {
    this.events[type] && this.events[type].forEach(listener => listener.apply(this, rest))
}
//-------------------------------------------------------------------------------------------------
const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '(': 0,
    ')': 0,
}
function poptill(stack, prediction) {
    let o = null
    let r = []
    while (o = stack.pop()) {
        if (!prediction(o)) {
            stack.push(o)
            break
        }
        r.push(o)
    }
    return r
}
function infix2postfix(list) {
    const opstack = []
    let r = []
    list.forEach(c => {
        if (/\+|-|\*|\//.test(c)) {
            const ops = poptill(opstack, op => precedence(op) >= precedence[c])
            r = r.concat(ops)
            opstack.push(c)
        } else if (c === '(') {
            opstack.push(c)
        } else if (c === ')') {
            const ops = poptill(opstack, op => op !== '(')
            opstack.pop()
            r = r.concat(ops)
        } else {
            r.push(c)
        }
    })
    opstack.reverse().forEach(x => r.push(x))
    return r
}
function evaluate(list) {
    list = list.reverse()
    const stack = []
    while (list.length > 0) {
        const c = list.pop()
        if (/(\+|-|\*|\/) /.test(c)) {
            const o1 = Number(stack.pop())
            const o2 = Number(stack.pop())
            switch (c) {
                case '+':
                    stack.push(o1 + o2)
                    break
                case '-':
                    stack.push(o1 - o2)
                    break
                case '*':
                    stack.push(o1 * o2)
                    break
                case '/':
                    stack.push(o1 / o2)
                    break
            }
        } else {
            stack.push(c)
        }
    }
    return stack[0]
}
function calc(str) {
    const list = str.match(/(\d+|\+|-|\*|\/|[()])/g)
    const postfixs = infix2postfix(list)
    return evaluate(postfixs)
}


function term_freq(doc) {
    let tf = {}
    let word = ''

    // 用于增加计数
    function inc(word) {
        if (!tf[word]) {
            tf[word] = 1
        } else {
            tf[word]++
        }
    }
    // 遍历一遍字符串，然后进行拆分
    for (let i = 0; i < doc.length; i++) {
        const v = doc.charCodeAt(i)
        if (v >= 65 && v <= 90) {
            word += doc[i].toLowerCase()
        }
        else if (v >= 97 && v <= 122) {
            word += doc[i]
        }
        else if (word) {
            console.log('word--->', word)
            inc(word)
            word = ''
        }
    }
    word && inc(word)
    return tf
}


function maxk(arr, k) {
    function swap(A, i, j) {
        const tmp = A[i]
        A[i] = A[j]
        A[j] = tmp
    }
    function divide(p, r) {
        const pivot = arr[r - 1]

        let i = p - 1
        for (let j = p; j < r - 1; j++) {
            if (arr[j] < pivot) {
                swap(arr, ++i, j)
            }
        }
        swap(arr, i + 1, r - 1)
        return i + 1
    }
    function inner(p, r, k) {
        while (p < r) {
            const q = divide(p, r)
            if (q === r - k) {
                return arr[q]
            }
            else if (q > r - k) {
                k -= (r - q)
                r = q
            }
            else {
                p = q + 1
            }
        }
    }
    return inner(0, arr.length, k)
}


function combinations(str) {
    // const arr = [...str]
    let N = 1 << str.length
    const s = new Set()
    for (let i = 1; i < N; i++) {
        let w = ''
        let j = 0
        while ((1 << j) <= i) {
            if (i & (1 << j)) {
                w += str[j]
            }
            j++
        }
        s.add(w)
    }
    return [...s]
}




function num_of_path(map, point) {
    const N = map[0].length
    const M = map.length
    let c = 0
    function _num_of_path_inner(transverse, x) {
        transverse[x[0] * N + x[1]] = true
        if (map[x[0]][x[1]] === 1) { return }
        if (map[x[0]][x[1]] === 2) {
            c++
            return
        }
        if (x[0] > 0 && map[x[0] - 1][x[1]] !== 1 && !transverse[(x[0] - 1) * N + x[1]]) {
            _num_of_path_inner(transverse.slice(), [x[0] - 1, x[1]])
        }
        if (x[0] < M - 1 && map[x[0] + 1][x[1]] !== 1 && !transverse[(x[0] + 1) * N + x[1]]) {
            _num_of_path_inner(transverse.slice(), [x[0] + 1, x[1]])
        }
        if (x[1] > 0 && map[x[0]][x[1] - 1] !== 1 && !transverse[x[0] * N + x[1] - 1]) {
            _num_of_path_inner(transverse.slice(), [x[0], x[1] - 1])
        }

        if (x[1] < N - 1 && map[x[0]][x[1] + 1] !== 1 && !transverse[x[0] * N + x[1] + 1]) {
            _num_of_path_inner(transverse.slice(), [x[0], x[1] + 1])
        }
    }
    _num_of_path_inner([], point)
    return c
}


function parse(str) {
    let k = 0
    function _parse_array_inner() {
        if (!str || str[k++] !== '(') {
            return null
        }
        let r = []//结果数组
        let last = ''//每次遍历到的当前项
        let has_token = false
        let state = 0//表示当前项是数字还是字符串
        function mk_token() {
            k++
            if (state > 2 || state === 1) {
                throw new Error('unexpected token', last)
            }
            if (last.length === 0) {
                return null
            }
            let v = null
            if (state === 0) {
                //这里表示的是，是数字也就是没有单引号
                v = Number(last)
                if (isNaN(v)) {
                    throw new Error('unexpected token', last)
                }

            } else {
                //这里表示的是，数字带引号的，原封不动的拷贝，
                //这样添加到数组后该项依然是字符串
                v = last
            }
            has_token = true
            last = ''
            state = 0
            return v
        }
        while (k !== str.length + 1) {
            const c = str[k]
            switch (c) {
                case '(': {
                    const result = _parse_array_inner()
                    if (result === null) { return null }
                    r.push(result)
                    break
                }
                case ')': {
                    const token = mk_token()
                    if (token !== null) {
                        r.push(token)
                    }
                    return r
                }
                case '':
                    if (state === 1 && last) {
                        return null
                    }
                    k++
                    break
                case ',': {
                    const token = mk_token()
                    if (token !== null) {
                        r.push(token)
                    }
                    break
                }
                case '\'':
                    state++
                    k++
                    break
                default:
                    k++
                    last += c
            }
        }
        return null
    }
    try {
        const result = _parse_array_inner()
        if (k !== str.length) {
            return null
        }
        return result
    } catch (e) {
        return null
    }
}

console.log(parse(`(1,(2,3),('4'),5)`))









