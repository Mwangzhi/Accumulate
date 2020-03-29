



var entry = {
    a: {
        b: {
            c: {
                dd: 'abcdd'
            }
        },
        d: {
            xx: 'adxx'
        },
        e: 'ae'
    }
}
// 要求转换成如下对象
var output = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
}

function forMat(entry) {
    let res = {}
    function recur(obj, path = []) {
        if (typeof obj == 'object' && obj != null) {
            Object.keys(obj).forEach(key => {
                recur(obj[key], path.concat(key))
            })
        } else {
            let attr = path.join('.');
            let val = obj;
            res[attr] = val;
        }
    }
    recur(entry);
    return res;
}

//逆向转换
function forMate(entry) {
    let res = {};
    Object.keys(entry).forEach(key => {
        key.split('.').reduce((pre, cur, index, arr) => {
            if (!pre[cur] && index !== arr.length - 1) {
                pre[cur] = {};
                return pre[cur];
            } else if (pre[cur] && index !== arr.length - 1) {
                return pre[cur];
            } else {
                pre[cur] = entry[key];
                return res;
            }
        }, res)
    });
    return res;
}


/* 
将target对象上的source属性的值代理到target上
代理前：target.source.key
代理后：target.key;
*/
function proxy(target, source, key) {
    Object.defineProperty(target, key, {
        get() {
            return target[source][key];
        },
        set(newValue) {
            return target[source][key] = newValue;
        }
    })
}