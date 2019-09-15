

/* 
模板引擎原理：字符串拼接，变量取值问题通过with解决，js代码通过new Function来解决。
1、将类似<%=item%>这种取值问题通过正则替换成${item}
2、with会产生新的作用域，可以解决变量取值问题
3、循环语句、判断语句通过new Function解决
4、new Function()
5、return
*/
function render(str, obj) {
    str = str.replace(/<%=([\s\S]+?)%>/g, function () {
        return '${' + arguments[1] + '}';
    });
    let head = `let str='';\r\n`;
    head += `with(obj){\r\n`;
    let content = 'str+=`';
    content += str.replace(/<%([\s\S]+?)%>/g, function () {
        return '`\r\n' + arguments[1] + '\r\nstr+=`';
    });
    let tail = '`\r\n} return str';
    let scriptStr = head + content + tail;
    let fn = new Function('obj', scriptStr);
    return fn(obj);
}





