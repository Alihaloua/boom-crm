"use strict";

const cors = require("cors");

var corsOptions = {
	origin: ["http://localhost:3000", "*"],
	optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
