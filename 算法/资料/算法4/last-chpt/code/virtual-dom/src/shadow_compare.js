 /**
 * 浅比较两个对象
 * @param {*} p1
 * @param {*} p2
 */
export default function shadow_compare(a, b) {
  if(a === null
    || typeof a !== 'object'
    || b === null
    || typeof b !== 'object'){
    return a === b
  }

  const propsA = Object.getOwnPropertyDescriptors(a)
  const propsB = Object.getOwnPropertyDescriptors(b)
  if(Object.keys(propsA).length !== Object.keys(propsB).length){
    return false
  }
  return Object.keys(propsA).every( key => a[key] === b[key] )
}