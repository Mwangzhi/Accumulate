/* 
写一个函数，计算一个四则运算表达式的值。有加减乘除和括号，空格忽略。不许使用eval等直接求值的函数。

function calc(str) {
  // TODO
}

calc('1 + 2 + 3') // 6
calc('1+2+3') // 6
calc('1+2*3') // 7
calc('(1+2)*3+4') // 13

例如: 需要计算 ： 3 * (1 + 2 ) * 5 那么先计算 1+2，
我们记做 1 2 + 再计算 3 * (1 + 2) 记做 3 1 2 + * 
最后计算 3 * (1 + 2 ) * 5 记做 3 1 2 + * 5 *

然后再从左到右计算
*/


// 定义操作符优先级
const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '(': 0,
    ')': 0
}


// 出栈(pop stack)直到断言函数(prediction function) 返回false
// 并返回最终的结果
function poptill(stack, prediction) {
    let o = null
    let r = []
    while (o = stack.pop()) {
        if (!prediction(o)) {
            stack.push(o)
            break
        }
        r.push(o)
    }
    return r
}


// 将中缀(infix)序列转成后缀(postfix)序列，
// 比如 A + B -> A B +
// 再比如 A + B * C -> A B C * +
// 再比如 A * (B + C) -> A B C + *
// 本质上 ABC的相对顺序不变，后缀序列的操作符会在不同的地方
function infix2postfix(list) {
    // 操作符栈
    const opstack = []
    // 后缀序列结果
    let r = []
    list.forEach(c => {
        if (/(\+|-|\*|\/)/.test(c)) {
            const ops = poptill(opstack, op => precedence[op] >= precedence[c])
            r = r.concat(ops)
            opstack.push(c)
        }
        else if (c === '(') {
            opstack.push(c)
        }
        else if (c === ')') {
            const ops = poptill(opstack, op => op !== '(')
            opstack.pop()
            r = r.concat(ops)
        }
        else {
            r.push(c)
        }
    })
    opstack.reverse().forEach(x => r.push(x))
    return r
}

// 利用stack对后缀序列求值
function evaluate(list) {
    list = list.reverse()
    const stack = []
    while (list.length > 0) {
        const c = list.pop()
        if (/(\+|-|\*|\/)/.test(c)) {
            const o1 = Number(stack.pop())
            const o2 = Number(stack.pop())
            switch (c) {
                case '+':
                    stack.push(o1 + o2)
                    break
                case '-':
                    stack.push(o1 - o2)
                    break
                case '*':
                    stack.push(o1 * o2)
                    break
                case '/':
                    stack.push(o1 / o2)
                    break
            }
        }
        else {
            stack.push(c)
        }
    }
    return stack[0]
}

function calc(str) {
    const list = str.match(/(\d+|\+|-|\*|\/|[()])/g)
    const postfixs = infix2postfix(list)
    return evaluate(postfixs)
}



















