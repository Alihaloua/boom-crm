"use strict";
const BaseController = require("./Base.controller");

class UserController extends BaseController {
	register = () => async (req, res, next) => {
		res.status(201).json({
			success: true,
			results: {
				user: req?.user,
				accessToken: req.accessToken,
			},
		});
	};

	login = () => async (req, res, next) => {
		res.status(200).json({
			success: true,
			results: {
				user: req?.user,
				accessToken: req?.accessToken,
			},
		});
	};

	token = () => async (req, res, next) => {
		res.status(200).json({
			success: true,
			results: {
				user: req?.payload,
				// accessToken: req?.accessToken,
			},
		});
	};
}

module.exports = new UserController();
