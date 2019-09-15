function sum(n){
  throw new Error('error')
  if(n === 1) {return 1}
  return sum(n-1) + n
}

//[1,2,3, [4,[5]]
function flattern(arr){
  return [].concat(...arr.map(item => 
    Array.isArray(item) ? flattern(item) : item
  ))
}

function *flattern(arr){
  for(let i = 0; i < arr.length; i++){
    if(Array.isArray(arr[i])){
      yield * flattern(arr[i])
    }else {
      yield arr[i]
    }
  }
}


function *flattern(arr){
  let stack = arr.slice.reverse()
  while(stack.length) {
    const item = stack.pop() 

    if(item.constructor === Array){
      stack = stack.concat(item)
    }else {
      yield item
    }
  }
}

// function feb(n){

//   let stack = [n]

//   while(stack.length){
//     const item = stack.pop()
//     if(item === 1 || item === 2){
//       //  
//     }
//     else {
//       stack.push(item -1)
//       stack.push(item - 2)
//     }
//   }

// }
// 5 + 4 + 3 + 2 + 1
try{
 sum(5)
} catch(ex) {
  console.log(ex.stack)
}
