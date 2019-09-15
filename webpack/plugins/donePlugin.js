
class DonePlugin {
    apply(compiler) {
        compiler.hooks.done.tap('DonePlugin', (stats) => {
            console.log('compiler done le ')
        })
    }
}
module.exports = DonePlugin