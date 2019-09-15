let http = require('http');
let fs = require('fs');
let zlib = require('zlib');
http.createServer((request, response) => {
    let raw = fs.createReadStream('.' + request.url);
    let acceptEncoding = request.headers['accept-encoding'];
    if (!acceptEncoding) {
        acceptEncoding = '';
    }
    if (acceptEncoding.math(/\bdeflate\b/)) {
        response.setHeader('Content-Encoding', 'deflate');
        raw.pipe(zlib.createGzip()).pipe(response);
    } else {
        raw.pipe(response)
    }
}).listen(9090);