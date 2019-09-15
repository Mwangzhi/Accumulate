//第一次优化
function merge(A, p, q, r) {
    let A1 = A.slice(p, q);
    let A2 = A.slice(q, r);
    A1.push(Number.MAX_SAFE_INTEGER);
    A2.push(Number.MAX_SAFE_INTEGER);
    for (let k = p, i = 0, j = 0; k < r; k++) {
        A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++]
    }
}
function merge_sort(A, p = 0, r = A.length) {
    for (let i = 1; i < A.length; i += i) {
        const step = i * 2;
        for (let start = 0; start < A.length; start += step) {
            const end = Math.min(start + step, A.length)
            if (end - start) {
                const mid = start + i;
                merge(A, start, mid, end)
            }
        }
    }
}
let A = [5, 4, 3, 2, 1]
merge_sort(A)
console.log(A)



//第二次优化
function merge_sort(A, p = 0, r = A.length) {
    const p2 = floor_power_of2(A.length)
    const scale = A.length / p2
    for (let i = 1; i < p2; i += i) {
        for (let m = 0; m < p2; m += i * 2) {
            const start = Math.floor(m * scale)
            const mid = Math.floor((m + i) * scale)
            const end = Math.floor((m + i * 2) * scale)
            merge(A, start, mid, end)
        }
    }
}



//第三次优化
function merge_sort(A, p = 0, r = A.length) {
    const p2 = floor_power_of2(A.length)
    const scale = A.length / p2
    for (let i = 1; i < p2; i += i) {
        for (let m = 0; m < p2; m += i * 2) {
            const start = Math.floor(m * scale)
            const mid = Math.floor((m + i) * scale)
            const end = Math.floor((m + i * 2) * scale)
            if (A[end - 1] < A[start]) {
                rotate(A, mid - start, start, end)
            } else {
                merge(A, start, mid, end)
            }
        }
    }
}





//第四次优化
const L = 16;
function merge_sort(A, p = 0, r = A.length) {
    const p2 = floor_power_of2(A.length)
    const scale = A.length / p2

    for (let i = 0; i < p2; i += L) {
        start = Math.floor(i * scale)
        end = Math.floor(start + L * sccale)
        insertion_sort(A, start, end)
    }

    for (let i = L; i < p2; i += i) {
        for (let m = 0; m < p2; m += i * 2) {
            const start = Math.floor(m * scale)
            const mid = Math.floor((m + i) * scale)
            const end = Math.floor((m + i * 2) * scale)
            if (A[end - 1] < A[start]) {
                rotate(A, mid - start, start, end)
            } else {
                merge(A, start, mid, end)
            }
        }
    }
}








