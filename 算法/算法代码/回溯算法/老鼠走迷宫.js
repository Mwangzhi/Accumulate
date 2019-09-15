
/* 
写一个老鼠走迷宫算法`rat_in_maze(maze)`返回路径，再写一个函数`print`打印迷宫和走的过程，打印老鼠走的路径。
*/
const maze = [
  [0,1,0,0,0,0],
  [0,1,0,1,1,0],
  [0,0,0,1,0,1],
  [1,1,0,0,0,1],
  [0,0,0,1,1,1],
  [2,1,0,0,0,0]
]
print( rat_in_maze(maze) )
/* 
上述程序执行结果为:

x 1 0 0 0 0
x 1 0 1 1 0
x x x 1 0 1
1 1 x 0 0 1
x x x 1 1 1
x 1 0 0 0 0
 */

//答案：
/**
 * @param {*} maze //地图
 * @param {*} pos  //当前位置
 * @param {*} path //开始位置到当前位置走过的点
 * @param {*} transverse  //遍历过的节点
 */
function rat_in_maze(
    maze,
    pos = [0, 0],
    path = [[...pos]],
    transverse = []
) {
    const [x, y] = pos
    // 如果找到终点
    if (maze[x][y] === 2) {
        return path
    }
    // 记录走过当前位置
    transverse[x * maze.length + y] = 1
    // 找到可能的选择
    const choices = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]
        // 过滤掉墙和已经遍历的地方
        .filter(([x, y]) => {
            return x >= 0 && y >= 0 && x < maze.length &&
                y < maze[0].length
                && (maze[x][y] !== 1) &&
                !transverse[x * maze.length + y]
        })

    // 对每个选择，继续递归，寻找路径
    for (let [x, y] of choices) {
        const p = rat_in_maze(maze, [x, y], path.concat([[x, y]]), transverse)
        if (p) return p
    }

}

function print(maze, path) {
    maze.forEach((row, i) => {
        console.log(row.map((v, j) => {
            if (path.find(([x, y]) => (x === i && y === j))) {
                return 'x'
            }
            return v
        }).join(' ')
        )
    })
}

const maze = [
    [0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 1],
    [1, 1, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 1],
    [2, 1, 0, 0, 0, 0]
]
print(maze, rat_in_maze(maze))



/*
给定一个包含非负整数的m*n网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
说明：每次只能向下或者向右移动异步。
例如：输入：
[
    [1,3,1],
    [1,5,1],
    [4,2,1]
]
输出：7
解释：因为路径1-->3-->1-->1-->1的总和最小
*/
let arr = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
]
function sum_min(arr) {
    let res = []
    function _sum_min(arr, pos = [0, 0], path = [[...pos]]) {
        const [x, y] = pos;
        if (x === arr.length - 1 && y === arr[0].length - 1) {
            return path;
        }
        const choices = [
            [x + 1, y],
            [x, y + 1]
        ].filter(([x, y]) => {
            return x >= 0 &&
                y >= 0 &&
                x < arr.length &&
                y < arr[0].length
        });
        for (let [x, y] of choices) {
            const p = _sum_min(arr, [x, y], path.concat([[x, y]]));
            if (p) {
                res.push(p)
                return
            }
        }
    }
    _sum_min(arr)
    res = res.map((path) => {
        return path.map(point => {
            return arr[point[0]][point[1]]
        })
    }).map(res => {
        return res.reduce((x, y) => x + y)
    }).sort((a, b) => a - b)[0]
    return res;
}
console.log(sum_min(arr))