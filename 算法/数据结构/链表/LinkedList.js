
/* 


*/


function ListNode(key) {
    this.key = key
    this.next = null
}
class LinkedList {
    constructor() {
        this.head = null;
    }
    //插入
    insert(node) {
        if (this.head !== null) {
            node.next = this.head
        }
        this.head = node;
    }
    //查找
    find(node) {
        let p = this.head
        while (p.next && p !== node) {
            p = p.next
        }
        return p
    }
    //删除
    delete() { }
}




//-------------------------------------------反转单向链表
class Node {
    constructor(v) {
        this.next = null
        this.value = v
    }
}

// 构造一个链表
const a = new Node('a')
const b = new Node('b')
const c = new Node('c')
const d = new Node('d')
a.next = b
b.next = c
c.next = d

// 执行reverse函数
const x = reverse(a)
// x: d->c->b->a->null 

// 其他情况
reverse(null) // null
reverse(new Node('x')) // x -> null



//反转单向链表（非递归实现）
var reverseList = function (head) {
    // 判断下变量边界问题
    if (!head || !head.next) return head
    // 初始设置为空，因为第一个节点反转后就是尾部，尾部节点指向 null
    let pre = null
    let current = head
    let next
    // 判断当前节点是否为空
    // 不为空就先获取当前节点的下一节点
    // 然后把当前节点的 next 设为上一个节点
    // 然后把 current 设为下一个节点，pre 设为当前节点
    while (current) {
        next = current.next
        current.next = pre
        pre = current
        current = next
    }
    return pre
};
//反转单向链表（递归实现）
function reverse(node, res) {
    if (!node) return null
    if (node.next) {
        res = reverse(node.next, res)
        node.next.next = node
        node.next = null
        return res
    } else {
        res = node
        return res
    }
}

//-------------------------------------------检测链表是否有环
function has_cycle(node, hset = new Map()) {
    if (!node) return false
    if (hset.has(node)) {
        return true
    }
    hset.set(node, 1)
    return has_cycle(node.next, hset)
}

function has_cycle(node) {
    let fast = slow = node;
    while (fast !== null && slow !== null) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) return true
    }
    return false
}

//-------------------------------------------合并两个排序的链表
//leetcode   https://leetcode.com/problems/merge-two-sorted-lists/
class Node {
    constructor(v) {
        this.next = null
        this.value = v
    }
}
// p : 1 -> 3 -> 5 -> 7 -> null
// q : 2 -> 4 -> 6 -> 8 -> null
const r = merge(p, q)

// r : 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> null
// x : null
// y : null
merge(x, y) // null

// m : 1 -> null
// n : null
merge(m, n) // 1 -> null
//合并两个排序的链表
function merge(p, q) {
    let res = { next: '', value: null }, currentNode = res
    while (p !== null && q !== null) {
        if (p.value > q.value) {
            currentNode.next = q
            q = q.next
        } else {
            currentNode.next = p
            p = p.next
        }
        currentNode = currentNode.next
    }
    currentNode.next = p || q
    return res.next
}

//-------------------------------------------找到单向循环链表的入环点
//https://blog.csdn.net/yangruxi/article/details/80333000
function findLoopPort(head) {
    let slow = head
    let fast = head
    while (fast != null && fast.next != null) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast == slow) {
            break;
        }
    }
    if (fast == null || fast.next == null) {
        return null;
    }
    //如果链表有环，则将slow设置指向链表头，此时fast指向相遇点，然后同时开始移动，直到两个指针相遇
    slow = head;
    while (slow != fast) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
}


//================================链表去重复节点===============================================
// https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/submissions/
var deleteDuplicates = function (head) {
    // 新建一个节点，插入链表头部
    const p = new ListNode(-Infinity);
    p.next = head;
    let s = p;//慢指针
    let f = p.next;//快指针
    while (f) {
        if (!f.next || (f.val !== f.next.val)) {
            if (s.next === f) {
                s = f;
            } else {
                s.next = f.next;
            }
        }
        f = f.next;
    }
    return p.next;
};

//================================两个链表相交点 相交链表问题===============================================
/* 
// https://leetcode.com/problems/intersection-of-two-linked-lists/
LC:160
路程相等，速度相等，所以会相遇。
*/
function getIntersectionNode(headA, headB) {
    let pA = headA, pB = headB;
    while (pA != pB) {
        pA = pA ? pA.next : headB;
        pB = pB ? pB.next : headA;
    }
    return pA;
}



//================================分割链表===============================================
var splitListToParts = function (root, k) {
    /* 
    n--->总节点数
    d--->每段节点数
    k--->总段数
    r--->余数

    n = d * k;
    d = Math.floor(n/k);
    r = n % k

    LC:725 
    https://leetcode.com/problems/split-linked-list-in-parts/submissions/
    */
    let ret = [];
    let cur = root;
    let n = 0;
    while (cur) {
        cur = cur.next;
        n += 1;
    }
    d = Math.floor(n / k);
    r = n % k;
    cur = root;
    pre = null;
    for (let i = 0; i < k; i++) {
        ret.push(cur);
        let len = d;
        if (r > 0) {
            r--;
            len += 1;
        }
        for (let _ = 0; _ < len - 1; _++) {
            cur = cur.next;
        }
        if (cur) {
            pre = cur;
            cur = cur.next;
        }
        pre.next = null;
    }
    return ret;
};


//================================合并链表===============================================
/* 
数据1：12345
数据2：23456
数据3：345678
将每组的数据的第一个拿出来放入queue，图中框就是queue，queue中最小的出，然后再入队一个数据。
queue可以是数组，也可以是优先队列 priorityQueue
 ___
| 1 | 2 3 4 5 
| 2 | 3 4 5 6 
| 3 | 4 5 6 7 8
一一
LC: https://leetcode.com/problems/merge-k-sorted-lists/solution/
*/
var mergeKLists = function (lists) {
    function poll(arr, prediction) {
        if (arr.length === 0) return null;
        let min = prediction(arr[0]);
        let index = 0;
        for (let i = 1; i < arr.length; i++) {
            let tem = prediction(arr[i]);
            if (tem < min) {
                min = tem;
                index = i;
            }
        }
        return arr.splice(index, 1)[0];
    }
    let queue = [];
    for (let i = 0; i < lists.length; i++) {
        if (lists[i] !== null) {
            queue.push(lists[i]);
        }
    }
    let r = new ListNode();
    let p = r;
    while (queue.length > 0) {
        let item = poll(queue, x => x.val);
        p.next = new ListNode(item.val);
        p = p.next;
        if (item.next !== null) {
            queue.push(item.next);
        }
    }
    return r.next;
}