
//暴力解法
function fib(n) {
    //O(2^n)
    return n > 2 ? fib(n - 1) + fib(n - 2) : 1
}


//自底向上构造
function fib(n) {
    let a = 1, b = 1
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b]
    }
    return b
}
//与‘自底向上构造’方法等价，该方法是尾递归解法，可以转化成循环
function fib(n, a = 1, b = 1) {
    if (n <= 1) return b
    return fib(n - 1, b, a + b)
}


//利用尾递归优化快速排序
function qsort(A, lo, hi = A.length) {
    while (lo < hi) {
        const p = partition(A, lo, hi)
        qsort(A, lo, p)
        lo = p + 1
    }
}


//利用generator构造无穷斐波那契数列
function* fibonacci() {
    let a = 1, b = 1
    yield a;
    yield b;
    while (true) {
        let t = b
        b = a + b
        a = t
        yield b
    }
}
const it = fibonacci()
const fib10 = Array.from(Array(10), it.next, it).map(x => x.value)
console.log(fib10)

