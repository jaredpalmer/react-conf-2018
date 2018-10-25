const http = require('http');
const port = 5000;
const fs = require('fs');
const querystring = require('querystring');

const requestHandler = (request, response) => {
  const delay = querystring.parse(request.url);
  if (request.url.startsWith('/fakestripe.js')) {
    setTimeout(() => {
      fs.readFile(__dirname + '/public/fakestripe.js', 'utf-8', (err, data) => {
        response.writeHead(200, { 'Content-Type': 'text/javascript' });
        response.end(data);
      });
    }, parseInt(delay['/fakestripe.js?delay']) /* it's a number */);
  } else {
    response.end('Hello Node.js Server!');
  }
};

const server = http.createServer(requestHandler);

server.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
