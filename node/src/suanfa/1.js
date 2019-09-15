//寻找数组中最大值
function find_max(arr) {
    let max = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < arr.length; i++) {
        max = (arr[i] > max ? arr[i] : max)
    }
    return max;
}
//插入排序
function insertion_sort(A) {
    for (let j = 1; j < A.length; j++) {
        const key = A[j];
        let i = j - 1;
        while (i >= 0 && A[i] > key) {
            A[i + 1] = A[i];
            i--;
        }
        A[i + 1] = key;
    }
}
//桶排序
function bucket_sort(A) {
    const buckets = [...Array(1000)].map(x => []);
    for (let i = 0; i < A.length; i++) {
        buckets[A[i]].push(A[i]);
    }
    let result = [];
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i].length > 0) {
            buckets[i].forEach(x => {
                result.push(x);
            })
        }
    }
    console.log(result)
    return result;
}
//随机打乱数组
function fisher_yates_shuffle(arr) {
    for (let i = 0; i < arr.length - 1; i++) { // 2N + 2
        // 从 [i, arr.length - 1] 中取一个整数
        // [i, N)
        const j = i + Math.floor(Math.random() * (arr.length - i));

        // c1 * N

        // c2 * N
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }

    // 2N + 2 + (c1+c2) * N = (c1+c2+2)*N + C3
    return arr
}
// 错误的shuffle方法
function shuffle_simple(arr) {
    return arr.sort((x, y) => Math.random() - .5)
}

function feb(n) {
    //O(2^n)
    return n > 2 ? feb(n - 1) + feb(n - 2) : 1
}

function feb(n) {
    // O(n)
    let a = 1
    let b = 1
    for (let i = 2; i < n; i++) {
        const t = b
        b = a + b
        a = t
    }
    return b
}


// 数组的展平(递归版)
function flattern(arr) {
    return [].concat(
        ...arr.map(x => Array.isArray(x) ? flattern(x) : x)
    )
}

// 使用Stack
function flattern_by_stack(arr) {
    const s = new Stack()
    arr.reverse().forEach(x => s.push(x))
    const r = []
    while (s.length) {
        const x = s.pop()
        if (Array.isArray(x)) {
            x.reverse().forEach(y => s.push(y))
        }
        else {
            r.push(x)
        }
    }
    return r
}

function* flattern(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            yield* flattern(arr[i])
        } else {
            yield arr[i]
        }
    }
}

function* flattern(arr) {
    let stack = arr.slice.reverse()
    while (stack.length) {
        const item = stack.pop()

        if (item.constructor === Array) {
            stack = stack.concat(item)
        } else {
            yield item
        }
    }
}
//散列函数，浮点数情况
function binary_value(val) {
    const farr = new Float32Array(1)
    farr[0] = val
    const intBytes = new Int8Array(farr.buffer)
    const view = new DataView(intBytes.buffer)
    return view.getUint32()
}
//散列函数，字符串情况
function h_str(str, M) {
    return [...str].reduce((hash, c) => {
        hash = (31 * hash + c.charCodeAt(0)) % M
        return hash
    }, 0)
}

//二分查找
function bsearch(A, x) {
    let min = 0,
        max = A.length,
        guess;
    while (min <= max) {
        guess = Math.floor((min + max) / 2);
        if (A[guess] === x) return guess;
        else if (A[guess] > x) {
            max = guess - 1
        } else {
            min = guess + 1
        }
    }
    return -1;
}

//最大子序列
var maxSubArray = function (nums) {
    let maxSum = nums[0];
    let dpCurrent = nums[0];
    for (let i = 1; i < nums.length; i++) {
        dpCurrent = Math.max(nums[i], nums[i] + dpCurrent);
        maxSum = Math.max(maxSum, dpCurrent);
    }
    return maxSum;
};

//归并排序
function merge(A, p, q, r) {
    let A1 = A.slice(p, q)
    let A2 = A.slice(q, r)
    A1.push(Number.MAX_SAFE_INTEGER)
    A2.push(Number.MAX_SAFE_INTEGER)
    for (let k = p, i = 0, j = 0; k < r; k++) {
        A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++]
    }
}

function merge_sort(A, p, r) {
    if (r - p < 2) return;
    const q = Math.ceil((p + r) / 2);
    merge_sort(A, p, q)
    merge_sort(A, q, r)
    merge(A, p, q, r);
}






