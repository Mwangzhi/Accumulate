let fs = require('fs');
let rs = fs.createReadStream();
var stream = require('stream');
var util = require('util');
util.inherits(Writer, stream.Writable);
let stock = [];
function Writer(opt) {
    stream.Writable.call(this, opt);
}
Writer.prototype._write = function (chunk, encoding, callback) {
    setTimeout(() => {
        stock.push(chunk.toString('utf8'));
        console.log('add' + chunk)
        callback();
    }, 500);
}
var w = new Writer();
for (var i = 1; i <= 5; i++) {
    w.write("项目:" + i, 'utf8');
}
w.end("结束写入", function () {
    console.log(stock);
});