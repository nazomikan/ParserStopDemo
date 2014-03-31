var static = require('node-static')
  , fileServer = new static.Server('./public/')
  , http = require('http')
  , path = require('path')
  ;

module.exports = http.createServer(function (req, res) {
  req.addListener('end', function () {
    var url = req.url
      , ext = path.extname(url)
      , file = path.basename(url)
      , delay = 0
      ;
    /* jsを遅延させる */
    if (ext === '.js') {
      switch (file) {
      case 'delay0.js':
        delay = 5000;
        break;
      }

      /* delay ms遅延させた後にコンテンツ配信する(delayX.js) */
      setTimeout(function () {
        fileServer.serve(req, res);
      }, delay);
    } else {
      if (/^\/demo2\/fw\//.test(url)) {
        res.end('<html><head></head><body>' + url + '</body></html>');
      } else {
console.log('hello');
        fileServer.serve(req, res);
      }
    }
  }).resume();
});
