
const babel = require('babel-core')
//1、生成ast 2、判断
const t = require('babel-types')

let code = `
class Wz{
    constructor(name){
        this.name=name
    }
    getName(){
        return this.name
    }
}
`
let ClassPlugin = {
    visitor: {
        ClassDeclaration(path) {
            let { node } = path
            let className = node.id.name
            className = t.identifier(className)
            let classList = node.body.body
            let funcs = t.functionDeclaration(className, [], t.blockStatement([]), false, false)
            path.replaceWith(funcs)
            let es5Func = []
            classList.forEach((item, index) => {
                let body = classList[index].body
                if (item.kind === 'constructor') {
                    let params = item.params.length ? item.params.map(item => item.name) : []
                    params = t.identifier(params)
                    funcs = t.functionDeclaration(className, [params], body, false, false)
                    path.replaceWith(funcs)
                } else {
                    let protoObj = t.memberExpression(className, t.identifier('prototype'))
                    let left = t.memberExpression(protoObj, t.identifier(item.key.name))
                    let right = t.functionExpression(null, [], body, false, false)
                    let assign = t.assignmentExpression('=', left, right)
                    es5Func.push(assign)
                }
            })
            if (es5Func.length === 0) {
                path.replaceWith(funcs)
            } else {
                es5Func.push(funcs)
                path.replaceWithMultiple(es5Func)
            }
        }
    }
}
let r = babel.transform(code, {
    plugins: [
        ClassPlugin
    ]
})
console.log(r.code)