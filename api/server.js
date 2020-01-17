const express = require("express");
const helmet = require("helmet");
const actionRouter = require("../action/actionRouter");
const projectRouter = require("../project/projectRouter");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);

//endpoints
server.use("/api/action", actionRouter);
server.use("/api/project", projectRouter);
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some NODE!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}]${req.method} to ${req.url} from ${
      req.originalUrl
    }`
  );
  next();
}

module.exports = server;
