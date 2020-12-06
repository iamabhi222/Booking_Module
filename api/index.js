const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

const PORT = process.env.PORT || 3004;

server.use(router);
server.listen(PORT, () => {
  console.log("JSON Server is running");
});
