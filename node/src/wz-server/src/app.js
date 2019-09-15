let http = require('http');
let config = require('./config');
let chalk = require('chalk');
let url = require('url');
let path = require('path');
let fs = require('fs');
let util = require('util');
let mime = require('mime');
let crypto = require('crypto');
let { promisify } = require('util');
let stat = promisify(fs.stat);
let readdir = promisify('fs.stat');
let handlebars = require('handlebars');
let debug = require('debug')('static:app');
let zlib = require('zlib');

function getList() {
    let list = fs.readFileSync(path.join(__dirname, 'tmpl', 'list.html'), 'utf8');
    return handlebars.compile(list);
}

class Server {
    constructor(options) {
        this.config = Object.assign({}, config, options);
        this.list = getList();
    }
    start() {
        let server = http.createServer();
        server.on('request', this.onRequest.bind(this));
        server.listen(this.config.port, this.config.host, () => {
            let url = `http://${this.config.host}:${this.config.port}`;
            console.log(`server started at ${chalk.green(url)}`);
        })
    }
    async onRequest(req, res) {
        let { pathname } = url.parse(req.url, true);
        if (pathname === '/favicon.ico') return this.sendError(req, res, 'Not Found');
        let filepath = path.join(this.config.root, pathname);
        debug(`${req.method}${req.url}${filepath}`);
        try {
            let fileStat = await stat(filepath);
            if (fileStat.isDirectory()) {
                this.sendDirectory(req, res, pathname, filepath, fileStat);

            } else {
                this.sendFile(req, res, pathname, filepath, fileStat);
            }
        } catch (e) {
            this.sendError(req, res, e);
        }
    }
    sendFile(req, res, pathname, filepath, fileStat) {
        if (this.handleCache(req, res, fileStat)) return;
        let contentType = mime.getType(filepath);
        res.setHeader('Content-Type', `${contentType};charset=utf-8`);
        let stream = this.getStream(req, res, filepath, fileStat);
        let encoding = this.getEncoding(req, res);
        encoding ? stream.pipe(encoding).pipe(res) : stream.pipe(res);
    }
    getStream(req, res, filepath, fileStat) {
        res.setHeader('Accept-Range', 'bytes');
        let range = req.headers['range'];
        let start = 0;
        let end = fileStat.size;
        if (range) {
            let reg = /bytes=(\d*)-(\d*)/;
            let result = range.match(reg);
            if (result) {
                start = isNaN(result[1]) ? 0 : parseInt(result[1]);
                end = isNaN(result[2]) ? 0 : parseInt(result[2]);
            }
        }
        debug(`start=${start},end=${end}`);
        return fs.createReadStream(filepath, { start, end });
    }
    handleCache(req, res, fileStat) {
        let expires = this.getExpire();
        res.setHeader('Expires', expires);
        res.setHeader('Cache-Control', `Max-Age=${this.config.maxAge}`);
        res.setHeader('Last-Modify', fileStat.ctime.toUTCString());
        let etag = `${fileStat.ctime}-${fileStat.size}`;
        res.setHeader('ETag', etag);
        let ifModifiedSince = req.headers['if-modified-since'];
        let ifNoneMatch = req.headers['if-none-match'];
        console.log(ifModifiedSince, fileStat.ctime.toUTCString(), ifNoneMatch, etag);
        if (ifModifiedSince == fileStat.ctime.toUTCString() && ifNoneMatch == etag) {
            res.statusCode = 304;
            res.end();
            return true;
        }
        return false;
    }
    getExpire() {
        return new Date(Date.now() + this.config.maxAge).toUTCString();
    }
    getEncoding(req, res) {
        let acceptEncoding = req.headers['accept-encoding'];
        if (!acceptEncoding) return null;
        if (acceptEncoding.match(/\bgzip\b/)) {
            res.setHeader('Content-Encoding', 'gzip');
            return zlib.createGzip();
        } else if (acceptEncoding.match(/\bdeflate\b/)) {
            res.setHeader('Content-Type', 'deflate');
            return zlib.createDeflate();
        } else {
            return null;
        }
    }
    async sendDirectory(req, res, pathname, filepath, fileStat) {
        let files = await readdir(filepath);
        files = files.map(name => ({
            name,
            url: path.join(pathname, name)
        }))
        let html = this.list({
            title: name,
            files
        });
        res.writeHead(200, {
            "Content-Type": "text/html;charset=utf-8"
        });
        res.end(html);
    }
    sendError(req, res, err) {
        console.log(err);
        debug(util.inspect(err));
        res.writeHead(404);
        res.end('The resource you requrest does net exist!')
    }
}

module.exports = Server;















