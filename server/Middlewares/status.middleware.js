"use strict";
const Joi = require("joi");
const createError = require("http-errors");

const {
	findStatusById,
	findAllStatus,
	addStatus,
	editStatus,
	deleteStatus,
} = require("../Models/status.model");

/**
 * Validate Add Status
 */
const statusSchema = Joi.object({
	name: Joi.string(),
});

/**
 * Validate Status Id
 */

const statusIdSchema = Joi.object({
	id: Joi.number(),
});

/**
 * Add a Status
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createStatusMiddleware = async (req, res, next) => {
	try {
		const result = await statusSchema.validateAsync(req.body, {
			abortEarly: false,
		});
		const addedStatus = await addStatus(result);

		req.data = addedStatus;
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Edit a `Status`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const patchStatusMiddleware = async (req, res, next) => {
	try {
		const result = await statusSchema.validateAsync(req.body, {
			abortEarly: false,
		});

		const status = await statusIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const editedStatus = await editStatus(Number(status.id), result);

		if (editedStatus.count) {
			req.data = await findStatusById(Number(status.id));
		} else throw createError.NotFound("Record to update not found!");
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Get one `Status`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const findStatusByIdMiddleware = async (req, res, next) => {
	try {
		const result = await statusIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const id = Number(result.id);
		const status = await findStatusById(id);
		if (!status) throw createError.NotFound("No data found!");
		req.data = status;
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Get All `Status`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const findAllStatusMiddleware = async (req, res, next) => {
	try {
		const allStatus = await findAllStatus();
		if (allStatus.length === 0) return res.sendStatus(204).end();
		else if (!allStatus) throw createError.NotFound("No data found!");
		req.data = allStatus;
		next();
	} catch (error) {
		next(error);
	}
};

/**
 * Delete a `Status`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteStatusMiddleware = async (req, res, next) => {
	try {
		const result = await statusIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const id = Number(result.id);
		const status = await deleteStatus(id);
		if (!status.count)
			throw createError.NotFound("Record to delete not found!");
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Add a `Status`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createStatusFn = async (result) => {
	try {
		const addedStatus = await addStatus({
			raison_social: result.raison_social,
			professionnel: result.professionnel,
			fixe: result.fixe,
		});

		return addedStatus;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createStatusMiddleware,
	patchStatusMiddleware,
	findStatusByIdMiddleware,
	findAllStatusMiddleware,
	deleteStatusMiddleware,
	createStatusFn,
};
