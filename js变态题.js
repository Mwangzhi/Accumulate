

//demo1
var a = 1.0 - 0.9;
if (a == 0.1) {
    console.log(true)
} else {
    console.log(false)
}
var b = 0.8 - 0.7;
if (a == b) {
    console.log(true)
} else {
    console.log(false)
}
// 答案:false false 0.9 0.8本身在二进制表示下已经失去精度。

/* 
0.9 * 2 = 1.8   1
0.8 * 2 = 1.6   1
0.6 * 2 = 1.2   1
0.2 * 2 = 0.4   0
0.4 * 2 = 0.8   0
0.8 * 2 = 1.6   1
0.6 * 2 = 1.2   1
0.2 * 2 = 0.4   0
0.4 * 2 = 0.8   0
0.8 * 2 = 1.6   1
0.6 * 2 = 1.2   1
0.2 * 2 = 0.4   0
0.4 * 2 = 0.8   0
0.8 * 2 = 1.6   1
0.6 * 2 = 1.2   1
0.2 * 2 = 0.4   0
0.4 * 2 = 0.8   0
0.8 * 2 = 1.6   1

*/
//=================================================================
function foo(a, b) {
    console.log(b);
    return {
        foo: function (c) {
            return foo(c, a);
        }
    }
}

var func1 = foo(0);
func1.foo(1);
func1.foo(2);
func1.foo(3);
var func2 = foo(0).foo(1).foo(2).foo(3);
var func3 = foo(0).foo(1);
func3.foo(2);
func3.foo(3);
/* 
undefined
0
0
0
undefined  0 1 2
undefined 0
1
1
*/