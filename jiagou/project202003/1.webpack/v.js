let base64 = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
];

function encode(num) {
    debugger;
    let binary = (num).toString(2);// 10000 转成二进制 
    binary = num > 0 ? binary + '0' : binary + '1';//正数最后边补0，负数最右边补1   100000
    //00001 00000
    let zero = 5 - (binary.length % 5);//4
    if (zero > 0) {
        binary = binary.padStart(Math.ceil(binary.length / 5) * 5, '0');
    }// 00001 00000
    let parts = [];
    for (let i = 0; i < binary.length; i += 5) {
        parts.push(binary.slice(i, i + 5));
    }
    parts.reverse();// ['00000','00001']
    for (let i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
            parts[i] = '0' + parts[i];// ['100000','000001']
        } else {
            parts[i] = '1' + parts[i];
        }
    }
    let chars = [];
    for (let i = 0; i < parts.length; i++) {
        chars.push(base64[parseInt(parts[i], 2)]);
    }
    return chars.join('')
}
//16需要二个字符
let ret = encode(16);
console.log(ret);
