
//最好最坏情况，时间复杂度都为O(nlgn)
/* 
总用时=拆分用时O(n)+合并用时O(nlgn)
树的高度为lgn


*/
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
    if (r - p < 2) { return }
    const q = Math.ceil((p + r) / 2);
    merge_sort(A, p, q);
    merge_sort(A, q, r);
    merge(A, p, q, r);
}
let A = [5, 4, 3, 2, 1]
merge_sort(A)
console.log(A)