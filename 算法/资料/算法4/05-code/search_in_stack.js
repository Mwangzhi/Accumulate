/**
 * 不推荐在Stack/Queue中搜索
 * 下面代码会破坏Stack的结构无法进行第二次搜索
 */
 function search(stack, key){
   while(stack.size) {
      const item = stack.pop()
      if(item === key) {
        return item
      }
   }
   return null
 }