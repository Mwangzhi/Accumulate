
const esprima = require('esprima') //babylon
const escodegen = require('escodegen')//babel-traverse
const estraverse = require('estraverse')//babel-generator   babel-template  babel-types

let code = 'function* ast(){}'
let ast = esprima.parseScript(code)
// console.log(ast)
estraverse.traverse(ast, {
    enter(node) { 
        if (node.type === 'Identifier') {
            node.name='wz'
        }
    }
})
let re=escodegen.generate(ast)
console.log(re)



