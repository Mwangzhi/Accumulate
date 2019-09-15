
/* 
给定正整数集合A，求和为m的n个数字，找到一组即可
比如：
A=[1,2,3,4,5]
n=2
m=6
返回：[1,5]或[2,4]
*/

//解法1
function sumN(A, n, m, i = 0, decisions = []) {
    if (m === 0) {
        return decisions;
    }
    if (i === A.length || n === 0) {
        return null;
    }
    return sumN(A, n - 1, m - A[i], i + 1, decisions.concat(A[i]))
        || sumN(A, n, m, i + 1, decisions)
}
//解法2
function sumN(A, n, m) {
    //最终结果
    let r = null;
    //决策
    const decisions = [];
    function inner(i = 0, n, m) {
        //如果已经有结果，终止递归
        if (r) { return };
        //如果m=0，找到一个解
        if (m === 0) {
            r = decisions.slice();
            return;
        }
        //没有找到解的情况
        if (i === A.length || n === 0) {
            return;
        }
        decisions.push(A[i]);
        inner(i + 1, n - 1, m - A[i]);
        decisions.pop(A[i]);
        inner(i + 1, n, m);
    }
    inner(0, n, m);
    return r;
}
console.log(sumN([1, 2, 3, 4, 5], 2, 6))


//================================================================================

/* 
(今日头条面试题简版）写一个函数`sum_subset(S,N)`：一个集合S里面都是正整数，求和为N的所有非空子集。

比如{1,3,8,5,2} N=10 那么有{8, 2}, {3,5,2}

*/
//解法1
function sum_subset(S, N, path = []) {
    const head = S.slice(0, S.length - 1)
    const tail = S[S.length - 1]
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


//解法2
/* 
下面这种解法叫做动态规划，本质上和上面的解法类似。但是超出了递归知识的范围，提供给有能力学习的同学。 如果发现太难可以跳过去，后面会有专门讲动态规划的课程。

上述递归方法有一个问题，就是sum_subset中间其实有若干可以复用的更小的步骤，但是被重复计算了。因此，可以构造一种不基于递归的方法。

设置一个二维数组 dp[i][j]代表S中前i项中存在和为j的子集的可能性，可能为1，不可能为1。

那么对于{1,3,8,5,2} N=10 ，会形成这样一个表格（左边表头代表i，上边表头代表j)

第一步：初始化
如下图：和为0的时候，总是存在子集（空集）和为0，因此dp[i][0] = 1
```
   0  1  2  3  4  5  6  7  8  9  10
0  1  0  0  0  0  0  0  0  0  0   0
1  1
2  1
3  1
4  1
5  1
```

第二步：继续填表

- 对于任意d[i][j]，如果j<S[i-1]，那么说明S[i]不影响最终结果，那么dp[i][j] = dp[i-1][j]
- 如果j >= S[i-1]，分成两种情况(两种情况成立任意一种，那么dp[i][j] = 1
  1. 解包含S[i] -> dp[i][j] = dp[i-1][j-S[i-1]]
  2. 解不包含S[i] -> d[i][j] = dp[i-1][j]

按照上述逻辑从第二行开始填表，直到结束（左边多增加了一列，是集合的数字，这样看起来比较方便）

```
      0  1  2  3  4  5  6  7  8  9  10
   0  1  0  0  0  0  0  0  0  0  0  0
1  1  1  1  0  0  0  0  0  0  0  0  0
3  2  1  1  0  1  1  0  0  0  0  0  0
8  3  1  1  0  1  1  0  0  0  1  1  0
5  4  1  1  0  1  1  1  1  0  1  1  0
2  5  1  1  1  1  1  1  1  1  1  1  1
```


第三步：构造递归解

- 第10列第5行有个1，那么2在结果集合中，记为{2}
- 第8列第3、4行各有1个1，那么{2,8}和{2,5}在结果集合中。
- {2,8}和为10，不需要再递归。 {2,5}需要继续递归。
- 第3行有4个1，但是只有3和{2,5}合并和为10，其他都不满足条件。


*/
function sum_subset_dp(S, N) {
    const dp = Array.from({ length: S.length + 1 }, () => Array(N + 1).fill(0))
    for (let i = 0; i < S.length + 1; i++) {
        dp[i][0] = 1
    }

    for (let i = 1; i < S.length + 1; i++) {
        for (let j = 1; j < N + 1; j++) {
            if (j >= S[i - 1]) {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - S[i - 1]]
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }
    return dp
}


function read_result_recursive(S, N, dp, path = []) {
    if (N === 0) { return [path] }
    if (N < 0) { return [] }

    let r = []
    for (let i = 1; i < S.length + 1; i++) {
        if (dp[i][N] && path.indexOf(S[i - 1]) === -1) {
            r = r.concat(read_result_recursive(S, N - S[i - 1], dp, path.concat(S[i - 1])))
        }
    }
    return r

}

const S = [1, 3, 8, 5, 2]
const N = 10
const dp = sum_subset_dp(S, N)
console.log(read_result_recursive(S, N, dp))



















