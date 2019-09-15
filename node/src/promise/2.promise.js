function Promise(executor) {
    let self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];
    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject)
        }
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'resolved';
                self.value = value;
                self.onResolvedCallbacks.forEach(item => item(value))
            }
        });
    }
    function reject(reason) {
        setTimeout(function () {
            if (self.status == 'pending') {
                self.value = reason;
                self.status = 'rejected';
                self.onRejectedCallbacks.forEach(item => item(reason));
            }
        });
    }
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('循环引用'));
    }
    let then, called;

    if (x != null && ((typeof x == 'object' || typeof x == 'function'))) {
        try {
            then = x.then;
            if (typeof then == 'function') {
                then.call(x, function (y) {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, function (r) {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
    let promise2;
    let self = this;
    if (self.status === 'resolve') {
        promise2 = Promise(function (resolve, reject) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        })
    }
    if (self.satus === 'rejected') {
        promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e);
                }
            })
        })
    }
    if (self.status === 'pending') {
        promise2 = new Promise(function (resolve, reject) {
            self.onResolvedCallbacks.push(function (value) {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            self.onRejectedCallbacks.push(function (reason) {
                try {
                    let x = onRejected(reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            })
        })
    }
    return promise2;
}
let p1 = new Promise(function (resolve, reject) {
    resolve('a')
})
let p2 = p1.then(function (data) {
    let x = new Promise(function (resolve, reject) {
        resolve(123)
    })
    return x;
})
p2.then(function (data) {
    console.log(data)
}, function () { })