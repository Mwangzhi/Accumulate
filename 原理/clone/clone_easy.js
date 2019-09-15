
function clone(obj) {
    let newObj = undefined;
    if (typeof newObj === null || typeof newobj !== 'object') {
        return obj
    }
    if (obj.constructor === Date) {
        newObj = new Date(obj)
        return newObj
    }
    if (obj.constructor === RegExp) {
        newObj = new RegExp(obj)
        return newobj
    }
    newObj = new obj.constructor()
    for (let attr in Object.getOwnPropertyDescriptors(obj)) {
        newObj[attr] = clone(obj[attr])
    }
    return newObj
}
