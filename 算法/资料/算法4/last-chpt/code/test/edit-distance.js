function array2d(rows, cols, fill) {
  const arr = new Array(rows)
  let i = arr.length
  while(i-- > 0)  {
    arr[i] = new Array(cols)
    if(fill) {

      for(let j = 0; j < arr[i].length; j++){
        arr[i][j] = fill(i, j)
      }
    }
  }
  return arr
}

class EditDistance{

  constructor(s, t){
    this.s = s 
    this.t = t
  }

  find(){
    const d = array2d(s.length + 1, t.length + 1)

    for(let i = 0; i < s.length + 1; i++) {
      d[i][0] = i
    }

    for(let j = 0; j < t.length + 1; j++) {
      d[0][j] = j
    }

    for(let i = 1; i < s.length; i++) {
      for(let j = 1; j < t.length; j++) {
        if(s[i] === t[j]) {
          d[i][j] = d[i-1][j-1]
        }
        else {
          d[i][j] = Math.min(
            d[i-1][j],  // del
            d[i][j-1],  // ins
            d[i-1][j-1] // replace
          ) + 1
        }
      }
    }

    return d
  }
}