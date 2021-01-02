const { Server } = require('node-static');
const { createServer } = require('http');

const fileServer = new Server('./dist');

const port = process.env.PORT || 8080;

createServer((req, res) => {
  fileServer.serve(req, res, (e) => {
    if (e) {
      fileServer.serveFile('/index.html', 200, {}, req, res);
    }
  });
}).listen(port);
