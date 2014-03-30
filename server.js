var http = require('http')
  , url = require('url')
  , demo1 = require('./demo1')
  ;

http.createServer(function(req, res) {
  var uri = req.url
    , dir = url.parse(uri).pathname
    ;

  switch (true) {
  case /^\/demo1\//.test(dir):
    demo1.emit('request', req, res);
    break;
  default:
    sendNotFound(res);
    break;
  }
}).listen(3050);

function sendNotFound(res) {
  res.writeHead(404);
  res.end();
}
