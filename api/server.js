const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8000;

// deploy server to heroku for the surge

server.use(middlewares);
server.use(router);

server.listen(port);
