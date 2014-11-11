var http = require('http');
var mime = require('mime');
var fs = require('fs');
var path = require('path');

function staticServer(response, filePath) {
    fs.readFile(filePath, function(status, data){
      getFile(response, filePath, data)
    })
}

function getFile(response, filePath, content) {
  response.writeHead(200,
    {'Content-Type': mime.lookup(
          path.basename(filePath)
          )
    });
  response.end(content);
}


http.createServer(function (req, res) {
  var filePath = false;
  if(req.url === '/' || !req.url) {
    filePath = 'index.html';
  } else {
    filePath = req.url
  }
  var fullPath = './' + filePath;
  staticServer(res, fullPath)
}).listen(process.env.PORT || 3000);
console.log('Server running')
