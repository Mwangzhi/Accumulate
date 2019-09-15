
//==================================第1道题 ============================================

/*

给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
说明：叶子节点是指没有字节的的节点
示例；
给定如下二叉树，以及目标和sum=22，

            5
           / \
          4   8
         /   /  \
        11  13   4
       /  \       \
      7    2       1
返回true，因为存在目标和为22的根节点到叶子节点的路径5-->4-->11-->2
*/

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
let node1 = new Node(5);
let node2 = new Node(4);
let node3 = new Node(8);
let node4 = new Node(11);
let node5 = new Node(13);
let node6 = new Node(4);
let node7 = new Node(7);
let node8 = new Node(2);
let node9 = new Node(1);
node1.left = node2;
node1.right = node3;
node2.left = node4;
node3.left = node5;
node3.right = node6;
node4.left = node7;
node4.right = node8;
node6.right = node9;

function sumOfpathEq0(tree, sum) {
    let res = [];
    function _sumOfpathEq0(tree, path = []) {
        if (!tree.left && !tree.right) return res.push(path.concat([tree.value]));
        path.push(tree.value);
        tree.left && _sumOfpathEq0(tree.left, path.concat([]))
        tree.right && _sumOfpathEq0(tree.right, path.concat([]))
    }
    _sumOfpathEq0(tree);
    return res.some((path) => path.reduce((pre, cur) => pre + cur) === sum);
}
console.log(sumOfpathEq0(node1, 21))




//==================================第2道题 判断两棵二叉树是否完全相同（包括值）============================================

/* 
给定两个二叉树，叶子节点值为基本数据类型，请编写一个函数来检验它们是否相同。
（说明：如果两个树在结构上相同，并且节点具有相同的值，则认为他们是相同的）
*/
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
// 第1棵树 node1
let node1 = new Node(3);
let node2 = new Node(9);
let node3 = new Node(20);
let node4 = new Node(null);
let node5 = new Node(null);
let node6 = new Node(15);
let node7 = new Node(7);
node1.left = node2;
node2.left = node4;
node2.right = node4;
node1.right = node3;
node3.left = node6;
node3.right = node7;

// 第2棵树 node11
let node11 = new Node(3);
let node22 = new Node(9);
let node33 = new Node(222);
let node44 = new Node(null);
let node55 = new Node(null);
let node66 = new Node(15);
let node77 = new Node(7);
node11.left = node22;
node22.left = node44;
node22.right = node44;
node11.right = node33;
node33.left = node66;
node33.right = node77;



/**
 * leetcode https://leetcode.com/problems/same-tree/solution/
 * 参数说明
 * @param {TreeNode} p 
 * @param {TreeNode} q 
 * Time O(N)
 * Space O(log(N))
 */
const isSameTree = function (p, q) {
    if (p == null && q == null) return true;
    if (q == null || p == null) return false;
    if (p.val != q.val) return false;
    return isSameTree(p.right, q.right) &&
        isSameTree(p.left, q.left);
}


//==================================第3道题 判断两棵二叉树是否结构相同（不包括值）============================================
function isSameTree(p, q) {
    if (p === null && q === null) {
        return true
    } else if (p === null || q === null) {
        return false
    } else {
        let a = isSameTree(p.left, q.left);
        let b = isSameTree(p.right, q.right);
        return a && b
    }
}


//==================================第4道题 判断两棵二叉树是否对称============================================
//https://blog.csdn.net/qq_40550018/article/details/83721209
function isMirror(t1, t2) {
    if (t1 == null && t2 == null) return true;
    if (t1 == null || t2 == null) return false;
    return t1.value == t2.value && isMirror(t1.right, t2.left) && isMirror(t1.left, t2.right)
}