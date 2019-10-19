

/* 

二叉查找树（BST）具备什么特性呢？
1.左子树上所有结点的值均小于或等于它的根结点的值。
2.右子树上所有结点的值均大于或等于它的根结点的值。
3.左、右子树也分别为二叉排序树。

二叉查找树在查找所需数字所用的次数等于二叉查找树的高度

二叉查找树在多次插入新节点时有可能会发生一种情况：二叉查找树会不平衡。
红黑树就是解决这种问题的。
*/



// 左节点的值小于父节点，右节点的值大于父节点的值

function BinaryTree() {
    function Node(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
    let root = null
    let insertNode = function (node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode
            } else {
                insertNode(node.left, newNode)
            }
        } else {
            if (node.right === null) {
                node.right = newNode
            } else {
                insertNode(node.right, newNode)
            }
        }
    }
    this.insert = function (key) {
        let newNode = new Node(key)
        if (root === null) {
            root = newNode
        } else {
            insertNode(root, newNode)
        }
    }
    let inOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback)
            callback(node.key)
            inOrderTraverseNode(node.right, callback)
        }
    }
    let preOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            callback(node.key)
            preOrderTraverseNode(node.left, callback)
            preOrderTraverseNode(node.right, callback)
        }
    }
    let postOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left, callback)
            postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }
    let minNode = function (node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left
            }
            return node.key
        }
    }
    let maxNode = function (node) {
        if (node) {
            while (node && node.right !== null) {
                node = node.right
            }
            return node.key
        }
    }
    let searchNode = function (node, key) {
        if (node === null) {
            return false
        }
        if (key < node.key) {
            return searchNode(node.left, key)
        } else if (key > node.key) {
            return searchNode(node.right, key)
        } else {
            return true
        }
    }
    let removeNode = function (node, key) {
        if (node === null) {
            return null
        }
        if (key < node.key) {
            node.left = removeNode(node.left, key)
            return node
        } else if (key > node.key) {
            node.right = removeNode(node.right, key)
            return node
        } else {
            if (node.left === null && node.right === null) {
                node = null
                return node
            }
            if (node.left === null) {
                node = node.right
                return node
            } else if (node.right === null) {
                node = node.left
                return node
            }
            let aux = findMinNode(node.right)
            node.key = aux.key
            node.right = removeNode(node.right, aux.key)
        }
    }
    let findMinNode = function (node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left
            }
            return node
        }
        return null
    }
    //中序遍历输出的节点顺序为从小到大
    this.inOrderTraverse = function (callback) {
        inOrderTraverseNode(root, callback)
    }
    //前序遍历用来复制一颗二叉树，复杂度为O(n);重新构造一颗二叉树的复杂度是O(nlgn)
    this.preOrderTraverse = function (callback) {
        preOrderTraverseNode(root, callback)
    }
    //后续遍历应用于遍历文件夹1 4 7 6 3 13 14 10 8
    this.postOrderTraverse = function (callback) {
        postOrderTraverseNode(root, callback)
    }
    //查找最小节点
    this.min = function () {
        return minNode(root)
    }
    this.max = function () {
        return maxNode(root)
    }
    this.search = function (key) {
        return searchNode(root, key)
    }
    this.remove = function (root, key) {
        removeNode(root,key)
    }
}
let nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]
let binaryTree = new BinaryTree()
nodes.forEach(key => binaryTree.insert(key))
let callback = key => console.log(key)
// binaryTree.inOrderTraverse(callback)
// binaryTree.preOrderTraverse(callback)
// binaryTree.postOrderTraverse(callback)
// console.log(binaryTree.min())
// console.log(binaryTree.max())
// console.log(binaryTree.search(7))
// binaryTree.remove(7)
