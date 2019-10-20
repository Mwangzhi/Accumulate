

/* 
leetcode:https://leetcode.com/problems/count-of-range-sum/submissions/


*/
//方法1
var countRangeSum = function (nums, lower, upper) {
    let counter = 0
    const sums = [0];
    for (let i = 0; i < nums.length; i++) {
        sums[i + 1] = sums[i] + nums[i];
    }
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j <= nums.length; j++) {
            const a = sums[j] - sums[i];
            if (a >= lower && a <= upper) {
                counter++
            }
        }
    }
    return counter;
};

//方法2
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countRangeSum = function (nums, lower, upper) {
    if (nums.length === 0) return 0;
    const sums = [nums[0]];
    for (let i = 1; i < nums.length; i++) {
        sums[i] = sums[i - 1] + nums[i];
    }
    function merge_sort(A, lo, hi) {
        if (hi - lo === 1) {
            return sums[lo] >= lower && sums[lo] <= upper ? 1 : 0;
        }
        const mid = Math.floor((lo + hi) / 2);
        let counter = merge_sort(A, lo, mid) + merge_sort(A, mid, hi);
        let m = mid, n = mid;
        for (let i = lo; i < mid; i++) {
            while (m !== hi && sums[m] - sums[i] < lower) { m++ }
            while (n !== hi && sums[n] - sums[i] <= upper) { n++ }
            counter += (n - m);
            //循环不变式：
            //[mid,m)不满足条件
            //(n,hi]不满足条件
            //[m,n]之间是满足条件的

            //lower<=sums[m]-sums[i]<=upper
            //lower+sums[i]<=sums[m]<=upper+sums[i]
            // for (let j = mid; j < hi; j++) {
            //     const sum = sums[j] - sum[i];
            //     if (sum >= lower && sum <= hi) {
            //         counter++
            //     }
            // }
        }
        const M = A.slice(lo, mid);
        const N = A.slice(mid, hi);
        M.push(Number.MAX_SAFE_INTEGER);
        N.push(Number.MAX_SAFE_INTEGER);
        for (let k = lo, i = 0, j = 0; k < hi; k++) {
            A[k] = M[i] < N[j] ? M[i++] : N[j++];
        }
        return counter;
    }
    return merge_sort(sums, 0, nums.length);
}