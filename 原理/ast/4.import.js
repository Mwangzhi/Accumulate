const babel = require('babel-core')
const t = require('babel-types')
let code = `import {Button,Alert} from 'antd'`
let importPlugin = {
    visitor: {
        ImportDeclaration(path) {
            let { node } = path
            let source = node.source.value
            let specifiers = node.specifiers
            if (!t.isImportDefaultSpecifier(specifiers[0])) {
                specifiers = specifiers.map(specifier => {
                    return t.importDeclaration(
                        [t.importDefaultSpecifier(specifier.local)],
                        t.stringLiteral(`${source}/lib/${specifier.local.name.toLowerCase()}`)
                    )
                })
                path.replaceWithMultiple(specifiers)
            }
        }
    }
}
let r=babel.transform(code, {
    plugins: [importPlugin]
})
console.log(r.code)