"use strict";
const http = require("http");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 1337;

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server is runing on port ${PORT}`);
});
