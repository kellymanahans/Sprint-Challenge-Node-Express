const express = require('express');
const server = express();
const parser = express.json();

const projectRouter = require('./data/routers/projectRouter.js');
const actionRouter = require('./data/routers/actionRouter.js');
server.use(parser);
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send('<h1>Node Express Sprint Challenge</h1>');
});

module.exports = server;

