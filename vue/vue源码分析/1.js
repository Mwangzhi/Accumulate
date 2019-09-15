

function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        const j = i + Math.floor(Math.random() * (arr.length - i));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}

function lss(A) {
    let dpSum = A[0];
    let totalSum = A[0];
    for (let i = 1; i < A.length; i++) {
        dpSum = Math.max(A[i], dpSum + A[i]);
        totalSum = Math.max(totalSum, dpSum);
    }
    return totalSum;
}

function* subsets(S) {
    for (let i = 0; i < 1 << S.length; i++) {
        let s = [];
        for (let j = 0; j < S.length; j++) {
            const take = i & (1 << j);
            take && s.push(S[j])
        }
        yield s.join('')
    }
}

function clone(obj) {
    if (typeof obj === null || typeof obj !== 'object') {
        return obj
    }
    let newObj = null;
    if (obj.constructor === Date) {
        newObj = new Date(obj)
    } else if (obj.constructor === RegExp) {
        newObj = new RegExp(obj)
    } else {
        newObj = new obj.constructor();
    }
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj = clone(obj[key])
        }
    }
    return newObj;
}



function subsets(S, decisions = []) {
    if (decisions.length === S.length) {
        return
    }
    subsets(S, decisions.concat(true))
    subsets(S, decisions.concat(false))
}

function subsets(S, decisions = []) {
    if (1) {
        decisions.toLocaleString()
    }
    let start = decisions.length > 0 ? decisions[decisions.length - 1] : -1;
    for (let i = start + 1; i < S.length; i++) {
        subsets(S, decisions.concat(i))
    }
}

function fib(n) {
    return n > 2 ? fib(n - 1) + fib(n - 2) : 1
}
function fib(n) {
    let a = 1,
        b = 1;
    for (let i = 3; i <= n; i++) {
        [a, b] = [b, a + b]
    }
    return b;
}
function fib(n, a = 1, b = 1) {
    if (n <= 2) return b;
    return fib(n - 1, b, a + b);
}
function* fib() {
    let a = 1,
        b = 1;
    yield a;
    yield b;
    while (true) {
        let t = b;
        b = a + b;
        a = t;
        yield b;
    }
}
let it = fib();
let arr = Array.from({ length: 10 }, () => it.next()).map(item => item.value)
console.log(arr)


function flattern(arr) {
    return [].concat(...arr.map(item => Array.isArray(item) ? flattern(item) : item))
}

console.log(flattern([1, [2], [[3]]]))










