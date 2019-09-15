
const babel = require('babel-core')
//1、生成ast 2、判断
const t = require('babel-types')

let code = `let sum=(a,b)=>a+b`

let ArrowPlugin = {
    visitor: {
        //path是树的路径
        ArrowFunctionExpression(path) {
            let node = path.node
            let params = node.params
            let body = node.body
            if (!t.isBlockStatement(body)) {
                let returnStatement = t.returnStatement(body)
                body = t.blockStatement([returnStatement])
            }
            let funcs = t.functionExpression(null, params, body, false, false)
            path.replaceWith(funcs)
        }
    }
}
//.babelrc
let r = babel.transform(code, {
    plugins: [
        ArrowPlugin
    ]
})

console.log(r.code)