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
// d.next = b

// function has_cycle(node, hset = new Map()) {
//     if (!node) return false
//     if (hset.has(node)) {
//         return true
//     }
//     hset.set(node, 1)
//     return has_cycle(node.next, hset)
// }
function has_cycle(node) {
    let fast = slow = node;
    while (fast !== null && slow !== null) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) return true
    }
    return false
}
console.log(has_cycle(a))

