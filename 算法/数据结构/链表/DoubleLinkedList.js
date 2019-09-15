
class ListNode {
    constructor(key) {
        this.prev = null
        this.next = null
        this.key = key
    }
}
class DoubleLinkedList {
    constructor() {
        // 指向链表开头
        this.head = null
        // 指向链表末尾
        this.tail = null
    }
    print() {
        let p = this.head
        const r = []
        while (p) {
            r.push(p)
            p = p.next
        }
        r.push('NULL')
        console.log(r.join('<->'))
    }
    insert(key) {
        const node = new ListNode(key)
        if (this.head) {
            this.head.prev = node
            node.next = this.head
        } else {
            this.tail = node
        }
        this.head = node
    }
    merge(list) {
        this.tail.next = list.head
        this.tail = list.tail
        list.head.prev = this.tail
    }
}


//找到一个链表的中心节点
function center(list) {
    let fast = list.head,  // 快指针，每次移动两个
        slow = list.head   // 慢指针，每次移动一个

    while (fast) {
        fast = fast.next
        fast && (fast = fast.next)
        fast && (fast = fast.next)
        fast && (slow = slow.next)
    }
    return slow
}


//查看一个链表是否有循环引用
function has_cycle(list, m = new WeakMap()) {
    let p = list.head
    while (p) {
        if (m[p]) { return true }
        m[p] = true
        p = p.next
    }
    return false
}