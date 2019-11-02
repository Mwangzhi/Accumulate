function nextTick(cb, ctx) {
    let callbacks = [];
    let pending = false;
    let _resolve;
    function flushCallbacks() {
        pending = false;
        const copies = callbacks.slice(0);
        callbacks.length = 0;
        for (let i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
    let macroTimerFunc = function () {
        setTimeout(() => {
            flushCallbacks()
        });
    }
    let microTimerFunc = function () {
        let p = Promise.resolve();
        p.then(flushCallbacks);
    }
    callbacks.push(() => {
        if (cb) {
            cb.call(ctx);
        } else {
            _resolve(ctx)
        }
    })
    if (!pending) {
        macroTimerFunc()
        // microTimerFunc()

    }
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve;
        })
    }
}
