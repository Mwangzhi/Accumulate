let http = require('http');
let options = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'GET'
}
for (let i = 0; i < 10; i++) {
    let req = http.request(options, (res) => {
        res.on('data', chunk => console.log('响应内容为：' + chunk))
    })
    req.end();
}