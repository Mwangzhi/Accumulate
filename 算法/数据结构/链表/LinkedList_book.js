function LinkedList() {
    let Node = function (element) {
        this.element = element;
        this.next = null;
    }
    let length = 0;
    let head = null;
    this.append = function (element) {
        let node = new Node(element);
        let current; 
        if (head === null) {
            head = node;
        } else {
            current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        length++;
    }
    this.insert = function (position, element) {
        if (position >= 0 && position <= length) {
            let node = new Node(element);
            current = head,
                previous,
                index = 0;
            if (position === 0) {
                node.next = current;
                head = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            length++;
            return true;
        } else {
            return false;
        }
    }
    this.removeAt = function (position, element) {
        if (position > -1 && position < length) {
            let current = head,
                previous,
                index = 0;
            if (position === 0) {
                head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            length--;
            return current.element;
        } else {
            return null;
        }

    }
    this.remove = function (element) {
        let index = this.indexOf(element);
        return this.removeAt(index);
    }
    this.indexOf = function (element) {
        let current = head,
            index = -1;
        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }
    this.isEmpty = function () {
        return length === 0;
    }
    this.size = function () {
        return length;
    }
    this.getHead = function () {
        return head;
    }
    this.toString = function () {
        let current = head,
            string = '';
        while (current) {
            string += current.element + (current.next ? 'n' : '');
            current = current.next;
        }
        return string;
    }
    this.print = function () {
        let current = head;
        let r = [];
        while (current) {
            r.push(current);
            current = current.next;
        }
        r.push('NULL');
        console.log(r.join('<->'))
    }

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
    if (!p && !q) return null
    const tranverse = (node) => {
        let res = []
        while (node) {
            res.push(node.value)
            node = node.next
        }
        return res
    }
    let arr1 = tranverse(p).concat(Number.MAX_SAFE_INTEGER)
    let arr2 = tranverse(q).concat(Number.MAX_SAFE_INTEGER)
    let arr3 = []
    for (let i = 0, m = 0, n = 0; i < (arr1.length + arr2.length) - 2; i++) {
        arr3[i] = arr1[m] < arr2[n] ? arr1[m++] : arr2[n++]
    }
    let temNode = resNode = new Node(arr3[0])
    let point = 1
    while (point < arr3.length) {
        let n = new Node(arr3[point++])
        temNode.next = n
        temNode = temNode.next
    }
    return resNode
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