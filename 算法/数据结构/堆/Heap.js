function swap(A, i, j) {
    const t = A[i]
    A[i] = A[j]
    A[j] = t
}
class Heap {
    constructor(data, Max = 10000) {
        this.list = Array(Max)
        for (let i = 0; i < data.length; i++) {
            this.list[i] = data[i]
        }
        this.heapSize = data.length
        this.build()
    }
    //建堆
    build() {
        let i = Math.floor(this.heapSize / 2) - 1
        while (i >= 0) {
            this.max_heapify(i--)
        }
    }
    //最大堆化
    max_heapify(i) {
        const leftIndex = 2 * i + 1
        const rightIndex = 2 * i + 2
        let maxIndex = i
        if (leftIndex < this.heapSize && this.list[leftIndex] > this.list[maxIndex]) {
            maxIndex = leftIndex
        }
        if (rightIndex < this.heapSize && this.list[rightIndex] > this.list[maxIndex]) {
            maxIndex = rightIndex
        }
        if (i !== maxIndex) {
            swap(this.list, maxIndex, i)
            this.max_heapify(maxIndex)
        }
    }
    //提取最大堆第一个节点并恢复堆为最大堆
    extract() {
        if (this.heapSize === 0) return null
        const item = this.list[0]
        swap(this.list, 0, this.heapSize - 1)
        this.heapSize--
        this.max_heapify(0)
        return item
    }
}
//优先队列
class PriorityQueue {
    constructor(data, prediction) {
        this.list = [];
        data.forEach((v, i) => this.list[i] = v);
        this.prediction = prediction;
        this.build()
    }
    swap(A, i, j) {
        [A[i], A[j]] = [A[j], A[i]];
    }
    build() {
        let i = ~~(this.list.length / 2) - 1;
        while (i >= 0) {
            this.max_heapify(i--);
        }
    }
    max_heapify(i) {
        let leftIndex = 2 * i + 1;
        let rightIndex = 2 * i + 2;
        let maxIndex = i;
        if (leftIndex < this.list.length && this.prediction(this.list[leftIndex]) > this.prediction(this.list[maxIndex])) {
            maxIndex = leftIndex;
        }
        if (rightIndex < this.list.length && this.prediction(this.list[rightIndex]) > this.prediction(this.list[maxIndex])) {
            maxIndex = rightIndex;
        }
        if (i !== maxIndex) {
            this.swap(this.list, i, maxIndex);
            this.max_heapify(maxIndex);
        }
    }
    poll() {
        if (this.list.length === 0) return null;
        const item = this.list[0];
        this.swap(this.list, 0, this.list.length - 1);
        this.list.length--;
        this.max_heapify(0);
        return item;
    }
    add(item) {
        this.list.push(item);
        this.build();
    }
    size() {
        return this.list.length;
    }
}

//利用最大堆实现一个排序算法
function heap_sort(A) {
    const heap = new MaxHeap(A)
    console.log(heap.list)
    while (heap.heapSize > 0) {
        A[heap.heapSize - 1] = heap.extract()
    }
}


//用堆实现求一个数组前k大值的函数`maxk(A, k)`
function maxk(A, k) {
    const heap = new MaxHeap(A)
    const r = []
    while (k-- > 0) {
        r.push(heap.extract())
    }
    return r
}
let solution = Array(num_people).fill(0)
let n = 1;
let i = 0;
while (candies > 0) {
    solution[i % num_people] += n;
    candies -= n;
    if (candies < 0) {
        solution[i % num_people] = candies;
    }
    n++;
    i++;
}
return solution;




