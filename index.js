require("dotenv").config();
// const port = 3000
const Server = require("./models/server")
const server = new Server();

server.listen();