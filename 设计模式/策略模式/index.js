
/* 
策略模式的定义是：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来


*/







//没有使用策略模式
function calculateBonus(performanceLevel, salary) {
    if (performanceLevel === 'S') {
        return salary * 4;
    }
    if (performanceLevel === 'A') {
        return salary * 3;
    }
    if (performanceLevel === 'B') {
        return salary * 2;
    }
}
//JavaScript版本的策略模式
let strategies = {
    'S': function (salary) { return salary * 4 },
    'A': function (salary) { return salary * 3 },
    'B': function (salary) { return salary * 2 }
}
function calculateBonus(level, salary) {
    return strategies[level](salary);
}





