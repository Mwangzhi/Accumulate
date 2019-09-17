  
/*
二叉树的基本操作：
1、先、中、后遍历（递归以及非递归方式）
2、最大、最小深度
3、最近祖先节点
4、根-->叶子 路径上的和为某个数字
5、所有的左叶子节点值的和
6、反转二叉树（或者叫镜像二叉树）
7、按层级遍历一棵树
8、遍历所有的叶子节点
9、...
*/

class Node {
    constructor(val) {
        this.val = val
        this.left = this.right = null
    }
}
let node1 = new Node(1)
let node2 = new Node(2)
let node3 = new Node(3)
let node4 = new Node(4)
let node5 = new Node(5)
let node6 = new Node(6)
let node7 = new Node(7)

node1.left = node2
node1.right = node3
node2.left = node4
node2.right = node5
node3.left = node6
node3.right = node7
/* 
node1结构如下：
            1
          /   \
        2       3
       /  \    /  \
      4    5  6    7
   
   
 */
//-----------------------------递归版本实现二叉树先序、中序、后序遍历-----------------------------
//先序遍历
function preOrderNode(node) {
    if (node) {
        console.log(node.val)
        preOrderNode(node.left)
        preOrderNode(node.right)
    }
}
// preOrderNode(node1) //  1 2 4 5 3 6 7

//中序遍历
function inOrderNode(node) {
    if (node) {
        inOrderNode(node.left)
        console.log(node.val)
        inOrderNode(node.right)
    }
}
// inOrderNode(node1)//4 2 5 1 6 3 7

//后序遍历
function postOrderNode(node) {
    if (node) {
        postOrderNode(node.left)
        postOrderNode(node.right)
        console.log(node.val)
    }
}
// postOrderNode(node1) // 4 5 2 6 7 3 1


//-----------------------------非递归版本实现二叉树先序、中序、后序遍历-----------------------------
//先序遍历
function pre(root) {
    if (root) {
        let stack = [];
        // 先将根节点 push
        stack.push(root);
        // 判断栈中是否为空
        while (stack.length > 0) {
            // 弹出栈顶元素
            root = stack.pop();
            console.log(root.val);
            // 因为先序遍历是先左后右，栈是先进后出结构
            // 所以先 push 右边再 push 左边
            if (root.right) {
                stack.push(root.right);
            }
            if (root.left) {
                stack.push(root.left);
            }
        }
    }
}
// pre(node1)  //  1 2 4 5 3 6 7

//中序实现
function mid(root) {
    if (root) {
        let stack = [];
        // 中序遍历是先左再根最后右
        // 所以首先应该先把最左边节点遍历到底依次 push 进栈
        // 当左边没有节点时，就打印栈顶元素，然后寻找右节点
        // 对于最左边的叶节点来说，可以把它看成是两个 null 节点的父节点
        // 左边打印不出东西就把父节点拿出来打印，然后再看右节点
        while (stack.length > 0 || root) {
            if (root) {
                stack.push(root);
                root = root.left;
            } else {
                root = stack.pop();
                console.log(root.val);
                root = root.right;
            }
        }
    }
}
// mid(node1) //4 2 5 1 6 3 7

//后续遍历
function pos(root) {
    if (root) {
        let stack1 = [];
        let stack2 = [];
        // 后序遍历是先左再右最后根
        // 所以对于一个栈来说，应该先 push 根节点
        // 然后 push 右节点，最后 push 左节点
        stack1.push(root);
        while (stack1.length > 0) {
            root = stack1.pop();
            stack2.push(root);
            if (root.left) {
                stack1.push(root.left);
            }
            if (root.right) {
                stack1.push(root.right);
            }
        }
        while (stack2.length > 0) {
            console.log(stack2.pop().val);
        }
    }
}
// pos(node1)  // 4 5 2 6 7 3 1


//-----------------------------求树的最大深度-----------------------------
let maxDepth = function (root) {
    if (!root) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
//对于该递归函数可以这样理解：一旦没有找到节点就会返回 0，每弹出一次递归函数就会加一，树有三层就会得到3。
// console.log(maxDepth(node1))


//-----------------------------反转二叉树-----------------------------
function mirror(root){
        if(root == null){
            return
        }
        if(root.left == null && root.right == null){
            return
        }
        let temp = root.left;
        root.left = root.right;
        root.right = temp;
        mirror(root.left)
        mirror(root.right)
    }


//-----------------------------求二叉树的最近父节点-----------------------------

//  https://leetcode.com/articles/lowest-common-ancestor-of-a-binary-search-tree/

/* function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
let node6 = new TreeNode(6)
let node2 = new TreeNode(2)
let node8 = new TreeNode(8)
let node0 = new TreeNode(0)
let node4 = new TreeNode(4)
let node7 = new TreeNode(7)
let node9 = new TreeNode(9)
let node3 = new TreeNode(3)
let node5 = new TreeNode(5)
node6.left = node2;
node6.right = node8;
node2.left = node0;
node2.right = node4;
node8.left = node7;
node8.right = node9;
node4.left = node3;
node4.right = node5; */

//此种解法要求二叉树是做节点小于父节点，右节点大于等于父节点
//递归写法
var lowestCommonAncestor = function (root, p, q) {
    if (root.val > p.val && root.val > q.val) {
        return lowestCommonAncestor(root.left, p, q);
    } else if (root.val < p.val && root.val < q.val) {
        return lowestCommonAncestor(root.right, p, q);
    } else {
        return root;
    }
};
//非递归写法
function lowestCommonAncestor(root, p, q) {
    let pVal = p.val;
    let qVal = q.val;
    // Start from the root node of the tree
    let node = root;
    // Traverse the tree
    while (node != null) {
        let parentVal = node.val;
        if (pVal > parentVal && qVal > parentVal) {
            node = node.right;
        } else if (pVal < parentVal && qVal < parentVal) {
            node = node.left;
        } else {
            // We have found the split point, i.e. the LCA node.
            return node;
        }
    }
    return null;
}
console.log(lowestCommonAncestor(node6, node4, node7))
console.log(lowestCommonAncestor(node6, node2, node5))



class Node {
    constructor(val) {
        this.val = val
        this.left = this.right = null
    }
}
let node3 = new Node(3)
let node9 = new Node(9)
let node20 = new Node(20)
let node15 = new Node(15)
let node7 = new Node(7)
node3.left = node9;
node3.right = node20;
node20.left = node15;
node20.right = node7;


//-----------------------------按层级遍历二叉树-----------------------------

var levelOrder = function (root) {
    let res = [];
    function traverse(node, deep = 0) {
        if (!node) return;
        if (!res[deep]) {
            res[deep] = [node.val];
        } else {
            res[deep].push(node.val);
        }
        traverse(node.left, ++deep);
        traverse(node.right, deep);
    }
    traverse(root);
    return res;
};

console.log(levelOrder(node3))