"use strict";
const express = require("express");
const app = express();
const router = express.Router();
const createError = require("http-errors");
const morgan = require("morgan");
const { verifyAccessToken } = require("./helpers/jwt.helper");
const corsMiddleware = require("./Middlewares/Config/Cors.middleware");

// require all needed routes to the project :)
const UserRoute = require("./Routes/user.route");
const LeadRoute = require("./Routes/lead.route");
const LogRoute = require("./Routes/log.route");
const StatusRoute = require("./Routes/status.route");
const RoleRoute = require("./Routes/role.route");

app.options("*", corsMiddleware);
app.use(corsMiddleware);
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

if (app.get("env") === "development") {
	app.use(morgan("dev"));
	console.log("Morgan is enabled ..!");
}

router.get("/", verifyAccessToken, async (req, res) => {
	res.send("Hello Boomers :)");
});

app.use("/api/v1", router);

app.use("/api/v1/users", UserRoute);
app.use("/api/v1/leads", LeadRoute);
app.use("/api/v1/status", StatusRoute);
app.use("/api/v1/logs", LogRoute);
app.use("/api/v1/roles", RoleRoute);

app.use(async (req, res, next) => {
	next(createError.NotFound("Route not found!"));
});

app.use(async (err, req, res, next) => {
	console.log(err);
	res.status(err.status || 500);
	res.send({
		success: false,
		error: {
			status: err.status || 500,
			message: err.message,
		},
	});
});

module.exports = app;
