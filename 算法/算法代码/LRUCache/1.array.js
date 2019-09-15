
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.members = []
    }
    put(key, value) {
        let found = false
        let oldestIndex = -1
        let oldestAge = -1
        for (let i = 0; i < this.members.length; i++) {
            let member = this.members[i]
            if (member.age > oldestAge) {
                oldestAge = member.age
                oldestIndex = i

            }
            if (member.key === key) {
                this.members[i] = { key, value, age: 0 }
                found = true
            } else {
                member.age++
            }
        }
        if (!found) {
            if (this.members.length >= this.capacity) {
                this.members.splice(oldestIndex, 1)
            }
            this.members[this.members.length] = {
                key, val, age: 0
            }
        }

    }
    get(key) {
        for (let i = 0; i < this.members.length; i++) {
            let member = this.members[i]
            if (member.key === key) {
                member.age = 0
                return member.value
            }
        }
        return -1
    }
}

