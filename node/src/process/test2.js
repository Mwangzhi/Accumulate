let fs = require('fs');
let path = require('path');
let out = fs.createWriteStream(path.join(__dirname, 'msg.txt'));
process.stdin.on('data', function (data) {
 out.write(data);
});
process.stdin.on('end', function () {
 process.exit();
});