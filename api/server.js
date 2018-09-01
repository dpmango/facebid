const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const https = require('https');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8000;

// deploy server to heroku for the surge

server.use(middlewares);

if (process.env.NODE_ENV === 'production') {
  const router = jsonServer.router('db.json');
  server.use(router);
  server.listen(port);
} else {
  // for the deveolpment with https
  const router = jsonServer.router('api/db.json');
  server.use(router);
  var certOptions = {
    key: fs.readFileSync(path.resolve('certs/server.key')),
    cert: fs.readFileSync(path.resolve('certs/server.crt'))
  };

  https.createServer(certOptions, server).listen(port, () => {
    console.log('listening...')
  });
}
