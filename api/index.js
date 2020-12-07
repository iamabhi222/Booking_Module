const jsonServer = require("json-server");
const express = require("express");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const PORT = process.env.PORT || 3004;

server.use(router);
server.listen(PORT, () => {
  console.log("JSON Server is running");
});
