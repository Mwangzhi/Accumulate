 
class HashTable{


  constructor(num = 1000){
    this.M = num 
    this.slots = new Array(num) 
  }

  h(str){
    str = str + ''
    [...str].reduce( (hash, c) => {
      hash = (331 * hash + c.charCodeAt(0)) % M
      return hash
    }, 1)
    return hash
  }

  add(key, value){
    const h = this.h(key) // [0, M)
    if(!this.slots[h]) {
      this.slots[h] = []
    }
    this.slots[h].unshift({key, value})
  }

  delete(key){
    const h = this.h(key) // [0, M)
    this.slots[h] = this.slots[h].filter(x => x.key !== key)
  }

  search(key){
    const h = this.h(key) // [0, M)
    const list = this.slots[h]
    const pair = list.find(x => x.key === key)
    return pair ? pair.value : null
  }


}

