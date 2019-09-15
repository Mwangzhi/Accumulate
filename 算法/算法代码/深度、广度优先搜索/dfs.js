

function Node(key) {
    this.children = []
    this.key = key
}
//深度优先搜索
function dfs(node) {
    const stack = [node]
    while (stack.length > 0) {
        const first = stack.shift()
        console.log(first.key)//打印结果
        //将子节点压栈
        first.children.slice().reverse().forEach(
            child => stack.unshift(child)
        )
    }
}
const n1 = new Node('1')
const n2 = new Node('2')
const n3 = new Node('3')
const n4 = new Node('4')
const n5 = new Node('5')
const n6 = new Node('6')

n1.children.push(n2)
n1.children.push(n5)
n2.children.push(n3)
n2.children.push(n4)
n5.children.push(n6)


//递归具有天然的DFS结构，程序语言用栈实现递归
// function dfs(node) {
//     console.log(node.key)
//     node.children.forEach(dfs)
// }


console.log(dfs(n1))



//广度优先搜索
function bfs(node) {
    const queue = [node]
    while (queue.length > 0) {
        const first = queue.shift()
        console.log(first.key)//打印结果
        //将子节点入队
        first.children.forEach(
            child=>queue.push(child)
        )
    }
}