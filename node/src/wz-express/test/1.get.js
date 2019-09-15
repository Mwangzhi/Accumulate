let express = require('../lib/express');
let app = express();
app.post('/', function a(req, res, next) {
    res.end('hello');
    next();
}, function b(req, res) {
    console.log(123)
})
app.listen(8080, function () {
    console.log('server is listening on 8080');
})