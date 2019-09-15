
let http = require('http')
//http模块导出的部分属性方法有以下几个
/**
http.request() 该方法内部调用 new http.ClientRequest()
http.get()  该方法内部调用http.request(),然后调用req.end()
http.createServer() 该方法内部调用new http.Server(),http.Server()内部调用new net.Server.call()
http.Server()
http.ClientRequest()
http.STATUS_CODES  <==> require('_http_server').STATUS_CODES
http.METHODS

http.get()--->http.request()---> new ClientRequest()
http.createServer()--->new Server()

 */










