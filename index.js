var http = require('http');

var server = http.createServer(function (request, response) {
  response.end('hello world!');
});

server.listen(3000);
