/* 
题目3:解析数组
写一个函数parse将字符串解析为数组。

不可以使用原生方法直接处理，比如JSON.parse等。

示例
parse(`(1,2,3)`) // [1,2,3]
parse(`(1,'2a',3)`) // [1,'2a',3]
parse(`(1, (3, 4) ,5)`) // [1,[3,4],5]
parse(`(1, (3,5), 0)`) // [1,[3,5],0]
parse(`(()())`) // [[],[]]
parse(`123`) // null
parse(`(1,2`) // null
parse(`()()`) // null

// 字符串只支持单引号
parse(`("123")`) // null
parse(`('"123"')`) // ['"123"']

// 不需要考虑转义符号等情况
parse(`('1\''`) // null

// 不需要考虑null的情况
parse(`(null)`) // null
*/
function parse(str) {
    let k = 0
    function _parse_array_inner() {
        if (!str || str[k++] !== '(') {
            return null
        }
        let r = []
        let last = ''
        let has_token = false
        let state = 0
        function mk_token() {
            k++
            if (state > 2 || state === 1) {
                throw new Error('unexpected token', last)
            }
            if (last.length === 0) {
                return null
            }
            let v = null
            if (state === 0) {
                v = Number(last)
                if (isNaN(v)) {
                    throw new Error('unexpected token', last)
                }

            } else {
                v = last
            }
            has_token = true
            last = ''
            state = 0
            return v
        }
        while (k !== str.length + 1) {
            const c = str[k]
            switch (c) {
                case '(': {
                    const result = _parse_array_inner()
                    if (result === null) { return null }
                    r.push(result)
                    break
                }
                case ')': {
                    const token = mk_token()
                    if (token !== null) {
                        r.push(token)
                    }
                    return r
                }
                case '':
                    if (state === 1 && last) {
                        return null
                    }
                    k++
                    break
                case ',': {
                    const token = mk_token()
                    if (token !== null) {
                        r.push(token)
                    }
                    break
                }
                case '\'':
                    state++
                    k++
                    break
                default:
                    k++
                    last += c
            }
        }
        return null
    }
    try {
        const result = _parse_array_inner()
        if (k !== str.length) {
            return null
        }
        return result
    } catch (e) {
        return null
    }
}

console.log(parse(`((),())`))