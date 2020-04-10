const express = require('express')

const projectRouter = require('./data/routers/projectsRouter')
const actionRouter = require('./data/routers/actionsRouter')
const server = express()

server.use(express.json())

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)


server.get("/", logger, (req, res) => {
    res.send('<h2>this is a test</h2>')
})

//middleware
function logger(req, res, next) {
    console.log(req.url);
    console.log(
      `[${new Date().toString()}] ${req.method} to ${req.url} ${req.get(
        "Origin"
      )}`
    );
    next();
  }

module.exports = server;