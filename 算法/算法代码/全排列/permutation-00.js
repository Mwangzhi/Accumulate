
function permutation1(str, select = []) {
    if (select.length === str.length) {
        return select.map(i => str[i]).join('')
    }
    let r = []
    for (let i = 0; i < str.length; i++) {
        if (select.indexOf(i) === -1) {
            r = r.concat(permutation1(str, select.concat(i)))
        }
    }
    return r
}

function permutation2(str, select = [], left = [...str]) {
    if (left.length === 0) {
        return select.join('')
    }
    return [].concat(...left.map((c, i) => permutation2(
        str,
        select.concat(c),
        left.slice(0, i).concat(left.slice(i + 1))
    )))
}
console.log(permutation2('abc'))





