
//第一种
function allSub(S, decisions = []) {
    if (decisions.length === S.length) {
        console.log(decisions.map((flag, index) => flag ? S[index] : null).filter(i => i !== null))  //这里拿到子集
        return;
    }
    allSub(S, decisions.concat(true))
    allSub(S, decisions.concat(false))
}

//第二种
function allSub(S, decisions = []) {
    console.log(decisions.map(i => S[i]))//这里拿到子集
    const start = decisions.length > 0 ? decisions[decisions.length - 1] : -1
    for (let i = start + 1; i < S.length; i++) {
        allSub(S, decisions.concat(i))
    }
}


//第三种，优化后的
function* subsets(S) {
    // i代表的是每一种决策
    for (let i = 0; i < 1 << S.length; i++) {
        let s = []
        for (let k = 0; k < S.length; k++) {
            const take = i & (1 << k)
            take && s.push(S[k])
        }
        yield s.join('')
    }
}

const S = ['a', 'b', 'c']
console.log([...subsets(S)])
/* 
假设对abc求子集，每一次决策都是三个由T或F组成的元素集，如：[T,T,F]
T---选择
F---不选
那么所有的子集就是[F,F,F]到[T,T,T]之间的所有组合。用2进制可以表示成 [0,0,0] 到 [1,1,1]
0 0 0-------0
0 0 1-------1
0 1 0-------2
0 1 1-------3
1 0 0-------4
1 0 1-------5
1 1 0-------6
1 1 1-------7
*/