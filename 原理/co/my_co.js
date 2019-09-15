function my_co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            try {
                var { value, done } = it.next(data);
            } catch (e) {
                return reject(e);
            }
            if (!done) {
                Promise.resolve(value).then(val => {
                    next(val);
                }, reject);
            } else {
                resolve(value);
            }
        }
        next();
    });
}

//部署迭代器接口，方法1
let obj = {
    name: 'csdc',
    location: 'beijing',
    *[Symbol.iterator]() {
        let self = this;
        let keys = Object.keys(self);
        for (let index = 0; index < keys.length; index++) {
            yield self[keys[index]];
        }
    }
}
for (let val of obj) {
    console.log(val)
}

//部署迭代器接口，方法2
let obj = {
    name: 'csdc',
    location: 'beijing',
    [Symbol.iterator]() {
        let self = this;
        let keys = Object.keys(self);
        let index = 0;
        return {
            next() {
                if (index < keys.length) {
                    return {
                        value: self[keys[index++]],
                        done: false
                    }
                } else {
                    return {
                        value: undefined,
                        done: true
                    }
                }
            }
        }
    }
}
for (let val of obj) {
    console.log(val)
}

