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
      , delay = 500
      ;

    /* jsを遅延させる */
    if (ext === '.js') {
      switch (file) {
      case 'delay0.js':
        delay = delay * 1;
        break;
      case 'delay1.js':
        delay = delay * 2;
        break;
      case 'delay2.js':
        delay = delay * 3;
        break;
      case 'delay3.js':
        delay = delay * 4;
        break;
      }

      /* delay ms遅延させた後にコンテンツ配信する(delayX.js) */
      setTimeout(function () {
        fileServer.serve(req, res);
      }, delay);
    } else {
      fileServer.serve(req, res);
    }
  }).resume();
});
