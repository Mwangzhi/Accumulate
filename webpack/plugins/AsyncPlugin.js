
class AsyncPlugin{
    apply(compiler) {
        compiler.hooks.emit.tapAsync('AsyncPlugin', (compliation, cb) => {
            setTimeout(() => {
                console.log('等一秒~~~')
                cb()
            }, 1000);
        });
        compiler.hooks.emit.tapPromise('AsyncPlugin', (compliation) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('在等1秒~~~')
                    resolve()
                }, 1000);
           })
        })
    }
}
module.exports = AsyncPlugin