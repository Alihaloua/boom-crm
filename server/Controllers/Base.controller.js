"use strict";

class BaseController {
	create = () => async (req, res) => {
		res.status(201).json({
			success: true,
			results: req.data,
		});
	};

	findAll = () => async (req, res) => {
		res.status(200).json({
			success: true,
			results: req.data,
		});
	};

	findOne = () => async (req, res) => {
		res.status(200).json({
			success: true,
			results: req.data,
		});
	};

	patch = () => async (req, res) => {
		res.status(200).json({
			success: true,
			results: req.data,
		});
	};

	delete = () => async (req, res) => {
		res.status(200).json({
			success: true,
		});
	};
}

module.exports = BaseController;
