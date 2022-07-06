"use strict";
const Joi = require("joi");
const createError = require("http-errors");

const {
	findLogById,
	findAllLogs,
	addLog,
	editLog,
	deleteLog,
} = require("../Models/log.model");

/**
 * Validate Add Log
 */
const logSchema = Joi.object({
	fullname: Joi.string(),
	email: Joi.string().max(255),
	passwrod: Joi.string(),
	phone: Joi.string().max(255),

	roleId: Joi.number(),
});

/**
 * Validate Log Id
 */

const logIdSchema = Joi.object({
	id: Joi.number(),
});

/**
 * Add a Log
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createLogMiddleware = async (req, res, next) => {
	try {
		const result = await logSchema.validateAsync(req.body, {
			abortEarly: false,
		});
		const addedLog = await addLog(result);

		req.data = addedLog;
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Edit a `Log`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const patchLogMiddleware = async (req, res, next) => {
	try {
		const result = await logSchema.validateAsync(req.body, {
			abortEarly: false,
		});

		const log = await logIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const editedLog = await editLog(Number(log.id), result);

		if (editedLog.count) {
			req.data = await findLogById(Number(log.id));
		} else throw createError.NotFound("Record to update not found!");
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Get one `Log`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const findLogByIdMiddleware = async (req, res, next) => {
	try {
		const result = await logIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const id = Number(result.id);
		const log = await findLogById(id);
		if (!log) throw createError.NotFound("No data found!");
		req.data = log;
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Get All `Log`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const findAllLogsMiddleware = async (req, res, next) => {
	try {
		const allLogs = await findAllLogs();
		if (allLogs.length === 0) return res.sendStatus(204).end();
		else if (!allLogs) throw createError.NotFound("No data found!");
		req.data = allLogs;
		next();
	} catch (error) {
		next(error);
	}
};

/**
 * Delete a `Log`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteLogMiddleware = async (req, res, next) => {
	try {
		const result = await logIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const id = Number(result.id);
		const log = await deleteLog(id);
		if (!log.count)
			throw createError.NotFound("Record to delete not found!");
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Add a `Log`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createLogFn = async (result) => {
	try {
		const addedLog = await addLog({
			raison_social: result.raison_social,
			professionnel: result.professionnel,
			fixe: result.fixe,
		});

		return addedLog;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createLogMiddleware,
	patchLogMiddleware,
	findLogByIdMiddleware,
	findAllLogsMiddleware,
	deleteLogMiddleware,
	createLogFn,
};
