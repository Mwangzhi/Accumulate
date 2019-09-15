let http = require('http');

let options = {
    hostname: 'localhost',
    port: 9090,
    path: '/',
    method: 'get',
    headers: {
        'Content-Type': 'application/x-www-from-urlencoded',
        'Content-Length': 15
    }
}
let req = http.request(options);
req.on('response', function (res) {
    res.on('data', function (chunk) {

    })
})
req.end('name=wangzhi&age=29')

// 服务端如何支持多语言

let pack = {
    'zh-CN': { content: '你好' },
    'en': { content: 'hello' },
    'fr-FR': { content: 'Bonjour' }
}
let http = require('http');
let server = http.createServer();
server.on('request', (req, res) => {
    let lan = 'en';
    let language = req.headers['accept-language'];
    // Accept-Language: zh;q=0.9,en;q=0.7,fr-FR
    let arrs = [];
    if (language) {
        arrs = language.split(',').map(l => {
            l = l.split(';');
            return {
                name: l[0],
                q: l[1] ? Number(l[1].split('=')[1]) : 1
            }
        }).sort((lang1, lang2) => lang2.q - lang1.q);
    }
    res.setHeader('Content-type', 'text/plain;charset=utf8');
    for (var i = 0; i < arrs.length; i++) {
        let name = arrs[i].name;
        if (pack[name]) {
            res.end(pack[name].content);
            break;
        }
    }
    res.end(pack[lan].content)
}).listen(8888);


//图片防盗链
let fs = require('fs');
let path = require('path');
let http = require('http');
let url = require('url');
let getHostName = (str) => {
    let { hostname } = url.parse(str, true);
    return hostname
}
let whitList = ['www.wangzhi.cn'];
let server = http.createServer((req, res) => {
    let refer = req.headers['referer'] || req.headers['referrer'];
    let { pathname } = url.parse(req.url, true);
    let p = path.join(__dirname, 'public', '.' + pathname);
    fs.stat(p, (err) => {
        if (!err) {
            if (refer) {
                let referHostName = getHostName(refer);
                let host = req.headers['host'].split(':')[0];
                if (referHostName != host && !whitList.includes(referHostName)) {
                    //防盗链
                    fs.createReadStream(path.join(__dirname, 'public', './2.jpg')).pipe(res);

                } else {
                    fs.createReadStream(p).pipe(res);
                }
            } else {
                res.end()
            }
        }
    })
}).listen(9999)























