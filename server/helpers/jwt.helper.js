"use strict";
const JWT = require("jsonwebtoken");
const creatError = require("http-errors");

module.exports = {
	signAccessToken: (userId) =>
		new Promise((resolve, reject) => {
			const id = String(userId);
			const payload = {};
			const secret = process.env.ACCESS_TOKEN_SECRET_KEY;
			const options = {
				issuer: "Bommers",
				audience: id,
			};
			JWT.sign(payload, secret, options, (err, token) => {
				if (err) {
					console.log(err.message);
					return reject(creatError.InternalServerError());
				}
				resolve(token);
			});
		}),

	verifyAccessToken: async (req, res, next) => {
		if (!req.headers["authorization"])
			return next(creatError.Unauthorized());
		const [Bearer, token] = req.headers["authorization"].split(" ");
		JWT.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET_KEY,
			(err, payload) => {
				if (err) {
					// Hide the error msg if the token is not valid, if it's just expired mention it in the error msg
					const message =
						err.name === "JsonWebTokenError" ? null : err.message;
					return next(creatError.Forbidden(message));
				}
				req.payload = payload;
				next();
			}
		);
	},

	signRefreshToken: (userId) =>
		new Promise((resolve, reject) => {
			const id = String(userId);
			const payload = {};
			const secret = process.env.REFRESH_TOKEN_SECRET_KEY;
			const options = {
				expiresIn: "1y",
				issuer: "Bommers",
				audience: id,
			};
			JWT.sign(payload, secret, options, (err, token) => {
				if (err) return reject(creatError.InternalServerError());
			});
		}),

	verifyRefreshToken: (refreshToken) =>
		new Promise((resolve, reject) => {
			JWT.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET_KEY,
				(err, payload) => {
					if (err) return reject(creatError.Unauthorized());
					const { aud: userId } = payload;
				}
			);
		}),
};
