const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHeader(200, { "Content-Type": "text/html" });
  res.end(
    'This is a Node.js server running on Now 2.0 <hr> <a href="/about">Navigate to About Page</a>'
  );
});

server.listen();
