
function clone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj
    let newObj = null
    if (obj.constructor === Date) {
        newObj = new obj.constructor(obj)
    } else {
        newObj = new obj.constructor()
    }
    for (let key in Object.getOwnPropertyDescriptors(obj)) {
        newObj[key] = clone(obj[key])
    }
    return newObj
}


