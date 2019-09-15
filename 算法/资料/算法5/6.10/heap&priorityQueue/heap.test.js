/**
 * 验证堆
 */

const {assert} = require('chai')
const Heap = require('./Heap')


describe('测试堆', () => {

  it('max-heapify-01', () => {

    const heap = new Heap([15, 2, 8, 12 , 5 ,2 ,3, 4, 7])
    heap.maxHeapify(1)
    assert.deepEqual(heap.data, [15, 12, 8, 7 , 5 ,2 ,3, 4, 2])
    
  })

  it('max-heapify-2', () => {
    const heap = new Heap([15])
    heap.maxHeapify(0)
    assert.deepEqual(heap.data, [15])
  })

  it('max-heapify-3', () => {
    const heap = new Heap([ 1, 4, 3, 2, 5])
    heap.size--
    heap.maxHeapify(0)
    assert.equal(heap.data[4], 5, '边界条件处理出错')
    // assert.deepEqual(heap.data, [4, 2, 3, 1, 5], '边界条件错误')
  })

  it('rebuild-heap-01', () => {
    const heap = new Heap([1,2,3,4,5]) 
    heap.rebuildHeap()
    assert.deepEqual([5, 4, 3 , 1 ,2 ], heap.data)
  })

  it('rebuild-heap-02', () => {
    const heap = new Heap([1,2,3,4,5, 6, 7, 7.3, 2 ,1,2]) 
    heap.rebuildHeap()
    assert.equal(heap.isHeap(), true)
  })

  it('sort', () => {
    const heap = new Heap([5,4,3,2,1]) 
    heap.rebuildHeap()
    heap.sort()
    assert.deepEqual(heap.data, [1,2,3,4,5])
  })

  it('优先级队列-insert', () => {
    const queue = new Heap([])
    queue.add(10)
    queue.add(20)
    queue.add(30)
    queue.add(40)
    queue.add(5)

    assert.deepEqual(queue.data, [40, 30, 20, 10, 5])

  })

  it('优先级队列-取出', () => {
    const queue = new Heap([])
    queue.add(10)
    queue.add(20)
    queue.add(30)
    queue.add(40)
    queue.add(5)


    assert.equal(queue.extractMax(), 40)
    assert.equal(queue.extractMax(), 30)

  })

})