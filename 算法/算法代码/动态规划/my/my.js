/* 
动态规划的3个重要概念：最优子结构、边界、状态转移方程



*/



//===========================================爬楼梯=======================================================
/* 
有一座高度是10级台阶的楼梯，从下往上走，每跨一步只能向上1级或者2级台阶。要求用程序来求出一共有多少种走法。
比如，每次走1级台阶，一共走10步，这是其中一种走法。我们可以简写成 1,1,1,1,1,1,1,1,1,1。
*/

//普通递归实现 时间复杂度O(2^n)
function getClimbingWays(n) {
    if (n < 1) return 0
    if (n === 1) return 1
    if (n === 2) return 2
    return getClimbingWays(n - 1) + getClimbingWays(n - 2)
}
console.log(getClimbingWays(10))//89

//备忘录算法，时间复杂度、空间复杂度均为O(n)
function getClimbingWays(n) {
    let index = 0
    function _getClimbingWays(n, hashMap = {}) {
        index++
        if (n < 1) return 0
        if (n === 1) return 1
        if (n === 2) return 2
        if (hashMap[n + '' + index]) {
            return hashMap[n]
        } else {
            let value = getClimbingWays(n - 1, hashMap) + getClimbingWays(n - 2, hashMap)
            hashMap[value + '' + index] = value
            return value
        }
    }
    return _getClimbingWays(n)
}
console.log(getClimbingWays(10))



//动态规划算法 时间复杂度o(n),空间复杂度O(1)
/* 
台阶数 1    2       3       4       5       6       7       8       9       10
走法数 1    2       3       5       8       13      21      34      55      89
*/

function getClimbingWays(n) {
    if (n < 1) return 0
    if (n === 1) return 1
    if (n === 2) return 2
    let a = 1
    let b = 2
    for (let i = 3; i <= n; i++) {
        [a, b] = [b, a + b]
    }
    return b
}
console.log(getClimbingWays(10))


//===========================================挖金矿=======================================================
/* 
有一个国家发现了5座金矿，每座金矿的黄金储量不同，需要参与挖掘的工人数也不同。
参与挖矿工人的总数是10人。每座金矿要么全挖，要么不挖，不能派出一半人挖取一半金矿。
要求用程序求解出，要想得到尽可能多的黄金，应该选择挖取哪几座金矿？

金矿编号      黄金含量      所需工人
1               400         5
2               500         5
3               200         3
4               300         4
5               350         3
*/

//采用排列组合的思想
/* 
每一座金矿都有挖与不挖两种选择，如果有N座金矿，排列组合起来就有2^N种选择。
对所有可能性做遍历，排除那些使用工人数超过10的选择，在剩下的选择里找出获得金币数最多的选择
*/

function digGoden(N, W) {
    let goden = {
        0: 5,
        1: 5,
        2: 3,
        3: 4,
        4: 3,
    }
    let value = {
        0: 400,
        1: 500,
        2: 200,
        3: 300,
        4: 350
    }
    let res_final = Number.MIN_SAFE_INTEGER
    function _digGoden(N, W, select = []) {
        if (select.length === N) {
            let k = select.map((flag, i) => flag ? i : null).filter(item => item !== null)
            let people = k.map((value) => goden[+value]).reduce((s, c) => s + c, 0)
            if (people <= 10) {
                let res = k.map(c => value[c]).reduce((s, c) => s + c, 0)
                res_final = res > res_final ? res : res_final
                return
            } else { return }
        }
        _digGoden(N, W, select.concat(true))
        _digGoden(N, W, select.concat(false))
    }
    _digGoden(N, W)
    return res_final;
}
console.log(digGoden(5, 10))



//动态规划算法
//http://www.sohu.com/a/153858619_466939
/* 


*/
function digGoden(n, w, g, p) {
    let preResults = []
    let results = []
    for (let i = 0; i < w; i++) {
        if ((i + 1) < p[0]) {
            preResults[i] = 0
        } else {
            preResults[i] = g[0]
        }
    }
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < w; j++) {
            if ((j + 1) < p[i]) {
                results[j] = preResults[j]
            } else {
                let index = (j + 1) - p[i] - 1;
                index = index < 0 ? 0 : index;
                let v = preResults[index];
                results[j] = Math.max(preResults[j], v + g[i])
            }
        }
        preResults = results
        results = []
    }
    return preResults[w - 1]
}
console.log(digGoden(5, 10, [400, 500, 200, 300, 350], [5, 5, 3, 4, 3]))

//===========================================仍鸡蛋=======================================================
/* 
有2个鸡蛋，从100层楼上往下仍，以此来测试鸡蛋的硬度。比如鸡蛋在第9层没有摔碎，在第10层摔碎了，那么鸡蛋不会摔碎的临界点就是9层。
问：如何用最少的尝试次数，测试出鸡蛋不会摔碎的零界点？
*/

//二分法
/* 
从50层仍，鸡蛋如果摔碎了，再从1层开始，一层一层试。如果鸡蛋没有摔碎，再从75层仍，以此类推。最坏情况下，需要50次
*/


//平方根法
/* 
如何让第一枚鸡蛋和第二枚鸡蛋的尝试次数尽可能均衡呢？
很简单，做一个平方根运算，100的平方根是10
因此，我们尝试每10层仍一次，第一次从10层仍，第二次从20层仍，...

这样，最好情况在第10层碎掉，尝试次数为 1 + 9 = 10
最坏情况下在100层碎掉，尝试次数为 10 + 9 = 19

小优化：可以从15层开始仍，接下来25层，35层，最坏尝试次数为 9 + 9 = 18
*/


//解方程法
/* 
x:最优解下最坏情况下尝试次数为x，从第x层仍
x + ( x - 1 ) + ( x - 2 ) + ... + 1 = 100
(X+1)*X/2=100
X=14

*/

//===========================================过桥问题=======================================================



//===========================================sum_subset(S,N)=======================================================
/* 
写一个函数`sum_subset(S,N)`：一个集合S里面都是正整数，求和为N的所有非空子集。
比如{ 1, 3, 8, 5, 2} N = 10 那么有{ 8, 2}, { 3, 5, 2}
*/


// 递归解法
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



/* 
下面这种解法叫做动态规划，本质上和上面的解法类似
上述递归方法有一个问题，就是sum_subset中间其实有若干可以复用的更小的步骤，但是被重复计算了。因此，可以构造一种不基于递归的方法。
设置一个二维数组 dp[i][j]代表S中前i项中存在和为j的子集的可能性，可能为1，不可能为0。
那么对于{ 1, 3, 8, 5, 2} N = 10 ，会形成这样一个表格（左边表头代表i，上边表头代表j)

第一步：初始化
如下图：和为0的时候，总是存在子集（空集）和为0，因此dp[i][0] = 1

    0  1  2  3  4  5  6  7  8  9  10
-------------------------------------
0-  1  0  0  0  0  0  0  0  0  0   0
1-  1
2-  1
3-  1
4-  1
5-  1

第二步：继续填表
对于任意dp[i][j]，如果j < S[i - 1]，那么说明S[i]不影响最终结果，那么dp[i][j] = dp[i - 1][j]
如果j >= S[i - 1]，分成两种情况(两种情况成立任意一种，那么dp[i][j] = 1)
  1. 解包含S[i] -> dp[i][j] = dp[i - 1][j - S[i - 1]]
  2. 解不包含S[i] -> d[i][j] = dp[i - 1][j]
按照上述逻辑从第二行开始填表，直到结束（左边多增加了一列，是集合的数字，这样看起来比较方便）
       0  1  2  3  4  5  6  7  8  9  10
---------------------------------------
   0-  1  0  0  0  0  0  0  0  0  0  0
1  1-  1  1  0  0  0  0  0  0  0  0  0
3  2-  1  1  0  1  1  0  0  0  0  0  0
8  3-  1  1  0  1  1  0  0  0  1  1  0
5  4-  1  1  0  1  1  1  1  0  1  1  0
2  5-  1  1  1  1  1  1  1  1  1  1  1

第三步：构造递归解
题目要求的和为10，所以从第10列开始找。
第10列第5行有个1，那么2在结果集合中，记为{ 2}，和由10变为8.
第8列第3、4行各有1个1，那么{ 2, 8}和{ 2, 5}在结果集合中。
{ 2, 8}和为10，不需要再递归。 { 2, 5}需要继续递归。
第3行有4个1，但是只有3和{ 2, 5}合并和为10，其他都不满足条件。
*/
function sum_subset_dp(S, N) {
  const dp = Array.from({length : S.length + 1}, () => Array(N+1).fill(0) )
  for(let i = 0; i < S.length + 1; i++ ){
    dp[i][0] = 1
  }
  for(let i = 1; i < S.length + 1; i++) {
    for(let j = 1; j < N + 1; j++) {
      if( j >= S[i-1] )  {
        dp[i][j] = dp[i-1][j] || dp[i-1][j - S[i-1]]
      }else {
        dp[i][j] = dp[i-1][j]
      }
    }
  }
  return dp
}


function read_result_recursive(S, N, dp, path = []) {
  if( N === 0) { return [path] }
  if(N < 0) { return [] }

  let r = []
  for(let i = 1; i < S.length + 1; i++) {
    if( dp[i][N] && path.indexOf(S[i-1]) === -1 ) {
      r = r.concat( read_result_recursive(S, N-S[i-1], dp, path.concat(S[i-1])) )
    }
  }
  return r

}

const S = [1,3,8,5,2]
const N = 10
const dp = sum_subset_dp(S, N)
console.log( read_result_recursive(S, N, dp) )




//===========================================最长公共子序列（LCS）=======================================================

/* 
https://blog.csdn.net/qq_31881469/article/details/77892324
https://segmentfault.com/a/1190000012864957#articleHeader1
https://juejin.im/post/5b0c2583f265da08f50b4b33#heading-0


有两个母串
cnblogs
belong
比如序列bo, bg, lg在母串cnblogs与belong中都出现过并且出现顺序与母串保持一致，我们将其称为公共子序列。
最长公共子序列（Longest Common Subsequence,LCS），顾名思义，是指在所有的子序列中最长的那一个。
子串是要求更严格的一种子序列，要求在母串中连续地出现。
在上述例子的中，最长公共子序列为blog（cnblogs,belong），最长公共子串为lo（cnblogs, belong）。

*/

// 画出LCS表格
function LCS(str1, str2) {
    var m = str1.length
    var n = str2.length
    var dp = [new Array(n + 1).fill(0)] //第一行全是0
    for (var i = 1; i <= m; i++) { //一共有m+1行
        dp[i] = [0] //第一列全是0
        for (var j = 1; j <= n; j++) {//一共有n+1列
            if (str1[i - 1] === str2[j - 1]) {
                //注意这里，str1的第一个字符是在第二列中，因此要减1，str2同理
                dp[i][j] = dp[i - 1][j - 1] + 1 //对角＋1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    return dp;
}
//打印一个LCS
function printLCS(dp, str1, str2, i, j) {
    if (i == 0 || j == 0) {
        return "";
    }
    if (str1[i - 1] == str2[j - 1]) {
        return printLCS(dp, str1, str2, i - 1, j - 1) + str1[i - 1];
    } else {
        if (dp[i][j - 1] > dp[i - 1][j]) {
            return printLCS(dp, str1, str2, i, j - 1);
        } else {
            return printLCS(dp, str1, str2, i - 1, j);
        }
    }
}
//求所有LCS
function printAllLCS(dp, str1, str2, i, j) {
    if (i == 0 || j == 0) {
        return new Set([""])
    } else if (str1[i - 1] == str2[j - 1]) {
        var newSet = new Set()
        printAllLCS(dp, str1, str2, i - 1, j - 1).forEach(function (el) {
            newSet.add(el + str1[i - 1])
        })
        return newSet
    } else {
        var set = new Set()
        if (dp[i][j - 1] >= dp[i - 1][j]) {
            printAllLCS(dp, str1, str2, i, j - 1).forEach(function (el) {
                set.add(el)
            })
        }
        if (dp[i - 1][j] >= dp[i][j - 1]) {//必须用>=，不能简单一个else搞定
            printAllLCS(dp, str1, str2, i - 1, j).forEach(function (el) {
                set.add(el)
            })
        }
        return set
    }
}
let dp = LCS('abcdef', 'acdf');
console.log(printLCS(dp, 'abcdef', 'acdf', 6, 4))

// 递归求最长公共子序列长度
function LCS(str1, str2, a = str1.length - 1, b = str2.length - 1) {
    if (a == -1 || b == -1) {
        return 0
    }
    if (str1[a] == str2[b]) {
        return LCS(str1, str2, a - 1, b - 1) + 1;
    }
    if (str1[a] != str2[b]) {
        var x = LCS(str1, str2, a, b - 1)
        var y = LCS(str1, str2, a - 1, b)
        return x >= y ? x : y
    }
}
console.log(LCS('abcdef', 'acf'))



//===========================================最长公共子串(DP)=======================================================

/* 
https://segmentfault.com/a/1190000007963594


*/


function LCS(str1, str2) {
    var maxLen = 0;
    var index = 0;

    var arr = new Array();
    for (var i = 0; i <= str1.length + 1; i++) {
        arr[i] = new Array();
        for (var j = 0; j <= str2.length + 1; j++) {
            arr[i][j] = 0;
        }
    }

    for (var i = 0; i <= str1.length; i++) {
        for (var j = 0; j <= str2.length; j++) {
            if (i == 0 || j == 0) {
                arr[i][j] = 0
            } else {
                if (str1[i] == str2[j] && str1[i - 1] == str2[j - 1]) {
                    arr[i][j] = arr[i - 1][j - 1] + 1;
                } else {
                    arr[i][j] = 0;
                }
            }
            if (arr[i][j] > maxLen) {
                maxLen = arr[i][j];
                index = i;
            }
        }
    }

    var str = "";
    if (maxLen == 0) {
        return "";
    } else {
        for (var k = index - maxLen; k < maxLen; k++) {
            str += str1[k];
        }
        return str;
    }
}
var str1 = "abcdefg";
var str2 = "xyzabcd";
console.log(LCS(str1, str2))     // abcd



//===========================================01背包问题=======================================================

/* 
https://juejin.im/post/5affed3951882567161ad511

 0 1背包  完全背包  多重背包

 给定一个固定大小的背包，背包的容量为 capacity，有一组物品，存在对应的价值和重量，要求找出一个最佳的解决方案，
 使得装入背包的物品总重量不超过背包容量 capacity，
 而且总价值最大。本题中给出了3个物品，其价值和重量分别是 (3,2),(4,3),(5,4)。
 括号左边为价值，右边为重量，背包容量 capacity 为5。那么求出其搭配组合，使得背包内总价最大，且最大价值为多少？

*/



function knapSack(w, val, capacity, n) {
    var T = []
    for (let i = 0; i < n; i++) {
        T[i] = [];
        for (let j = 0; j <= capacity; j++) {
            if (j === 0) { //容量为0
                T[i][j] = 0;
                continue;
            }
            if (j < w[i]) { //容量小于物品重量，本行hold不住
                if (i === 0) {
                    T[i][j] = 0; // i = 0时，不存在i-1，所以T[i][j]取0

                } else {
                    T[i][j] = T[i - 1][j]; //容量小于物品重量，参照上一行

                }
                continue;
            }
            if (i === 0) {
                T[i][j] = val[i]; //第0行，不存在 i-1, 最多只能放这一行的那一个物品
            } else {
                T[i][j] = Math.max(val[i] + T[i - 1][j - w[i]], T[i - 1][j]);

            }
        }

    }
    findValue(w, val, capacity, n, T);
    return T;
}
//找到需要的物品
function findValue(w, val, capacity, n, T) {
    var i = n - 1, j = capacity;
    while (i > 0 && j > 0) {
        if (T[i][j] != T[i - 1][j]) {
            console.log('选择物品' + i + ',重量：' + w[i] + ',价值：' + values[i]);
            j = j - w[i];
            i--;
        } else {
            i--;  //如果相等，那么就到 i-1 行
        }
    }
    if (i == 0) {
        if (T[i][j] != 0) { //那么第一行的物品也可以取
            console.log('...............')
            console.log('选择物品' + i + ',重量：' + w[i] + ',价值：' + values[i]);

        }
    }
}
var values = [3, 4, 5],
    weights = [2, 3, 4],
    capacity = 5,
    n = values.length;

console.log(knapSack(weights, values, capacity, n));




//===========================================硬币找零问题=======================================================
/* 
https://juejin.im/post/5b0a8e0f51882538b2592963


给定4种面额的硬币1分，2分，5分，6分，如果要找11分的零钱，怎么做才能使得找的硬币数量总和最少。
*/


function minCoins(coins, total, n) {
    var T = [];
    for (let i = 0; i < n; i++) {
        T[i] = []
        for (let j = 0; j <= total; j++) {
            if (j == 0) {
                T[i][j] = 0;
                continue;
            }

            if (i == 0) {
                T[i][j] = j / coins[i]; //硬币找零一定要有个 最小面额1，否则会无解
            } else {
                if (j >= coins[i]) {
                    T[i][j] = Math.min(T[i - 1][j], 1 + T[i][j - coins[i]])

                } else {
                    T[i][j] = T[i - 1][j];
                }
            }

        }

    }
    findValue(coins, total, n, T);
    return T;
}

function findValue(coins, total, n, T) {
    var i = n - 1, j = total;
    while (i > 0 && j > 0) {
        if (T[i][j] != T[i - 1][j]) {
            //锁定位置,确定i,j值，开始找构成结果的硬币组合。 其实根据这种计算方法，只需要考虑最右边那一列，从下往上推。
            //console.log(T[i][j]);
            break
        } else {
            i--;
        }
    }
    var s = []; //存储组合结果
    while (i >= 0 && j > 0) {
        s.push(coins[i]);
        j = j - coins[i];
        if (j <= 0) {
            break; //计算结束，退出循环
        }
        //如果 i == 0,那么就在第 0 行一直循环计算，直到 j=0即可
        if (i > 0) {
            //console.log(i);
            while (T[i][j] == T[i - 1][j]) {
                i--;
                if (i == 0) {
                    break;
                }
            }
        }
    }
    console.log(s);
    //可以把数组s return 回去
}
var coins = [1, 2, 5, 6];
var total = 11
var n = coins.length

console.log(minCoins(coins, total, n));





















