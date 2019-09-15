/**
 * Generate a two-dimension array
 */
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


module.exports = array2d