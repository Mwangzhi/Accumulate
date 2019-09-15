
/* 
题见图片
*/

//解法一
function f(x, y) {
    if (x > 0 && y > 0) {
        return f(x - 1, y) + f(x, y - 1);
    } else if (x > 0) {
        return f(x - 1, y);
    } else if (y > 0) {
        return f(x, y - 1);
    } else {
        return 1;
    }
}
console.log(f(4, 3))//35



//解法二
function f(x, y, dp = []) {
    if (!dp[y]) {
        dp[y] = [];
    }
    if (dp[y][x] !== undefined) {
        return dp[y][x];
    }
    if (x > 0 && y > 0) {
        dp[y][x] = f(x - 1, y, dp) + f(x, y - 1, dp);
    }
    else if (x > 0) {
        dp[y][x] = f(x - 1, y, dp);
    }
    else if (y > 0) {
        dp[y][x] = f(x, y - 1, dp);
    }
    else {
        dp[y][x] = 1;
    }
    return dp[y][x];
}
console.log(f(4, 3))//35




//解法三
function f(w, h) {
    const dp = [];
    for (let y = 0; y <= h; y++) {
        dp[y] = [];
        for (let x = 0; x <= w; x++) {
            if (x === 0 && y === 0) { dp[y][x] = 1 }
            else if (x === 0) { dp[y][x] = dp[y - 1][x] }
            else if (y === 0) { dp[y][x] = dp[y][x - 1] }
            else dp[y][x] = dp[y][x - 1] + dp[y - 1][x]
        }
    }
    return dp[h][w];
}
console.log(f(4, 3))//35