

/* 
常用图算法:图的遍历、最小生成树、最短路径


1、有向图、无向图
2、带权图、无权图
3、边
4、顶点
5、邻接矩阵
6、邻接表
7、逆邻接表
8、十字链表
9、迪杰斯特拉算法：利用距离表求出顶点到其他顶点的最小路径。(带权图) O(n^2)
10、佛洛依德算法：利用动态规划思想填写邻接矩阵。(多源最短路径问题)

*/

// 佛洛依德算法
function floyd(matrix) {
    let INF = Number.MAX_SAFE_INTEGER;
    for (let k = 0; k < matrix.length; k++){
        for (let i = 0; i < matrix.length; i++){
            for (let j = 0; j < matrix.length; j++){
                if (matrix[i][k] == INF || matrix[k][j] == INF) {
                    continue;
                }
                matrix[i][j] = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j]);
            }
        }
    }
}



