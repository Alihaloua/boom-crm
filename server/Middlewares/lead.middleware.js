"use strict";
const Joi = require("joi");
const createError = require("http-errors");

const {
	findLeadById,
	findAllLeads,
	addLead,
	editLead,
	deleteLead,
} = require("../Models/lead.model");

/**
 * Validate Add Lead
 */
const leadSchema = Joi.object({
	fullname: Joi.string(),
	comment: Joi.string().max(255),
	email: Joi.string(),
	phone: Joi.string().max(255),

	statusId: Joi.number().allow(null),
});

/**
 * Validate patch Lead
 */
const patchLeadSchema = Joi.object({
	fullname: Joi.string().allow(null),
	comment: Joi.string().max(255).allow(null),
	email: Joi.string().allow(null),
	phone: Joi.string().max(255).allow(null),

	statusId: Joi.number().allow(null),
});

/**
 * Validate Lead Id
 */

const leadIdSchema = Joi.object({
	id: Joi.number(),
});

/**
 * Add a Lead
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createLeadMiddleware = async (req, res, next) => {
	try {
		const result = await leadSchema.validateAsync(req.body, {
			abortEarly: false,
		});
		const addedLead = await addLead(result);

		req.data = addedLead;
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Edit a `Lead`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const patchLeadMiddleware = async (req, res, next) => {
	try {
		const result = await patchLeadSchema.validateAsync(req.body, {
			abortEarly: false,
		});

		const lead = await leadIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const editedLead = await editLead(Number(lead.id), result);

		if (editedLead.count) {
			req.data = await findLeadById(Number(lead.id));
		} else throw createError.NotFound("Record to update not found!");
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Get one `Lead`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const findLeadByIdMiddleware = async (req, res, next) => {
	try {
		const result = await leadIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const id = Number(result.id);
		const lead = await findLeadById(id);
		if (!lead) throw createError.NotFound("No data found!");
		req.data = lead;
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Get All `Lead`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const findAllLeadsMiddleware = async (req, res, next) => {
	try {
		const allLeads = await findAllLeads();
		if (allLeads.length === 0) return res.sendStatus(204).end();
		else if (!allLeads) throw createError.NotFound("No data found!");
		req.data = allLeads;
		next();
	} catch (error) {
		next(error);
	}
};

/**
 * Delete a `Lead`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteLeadMiddleware = async (req, res, next) => {
	try {
		const result = await leadIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const id = Number(result.id);
		const lead = await deleteLead(id);
		if (!lead.count)
			throw createError.NotFound("Record to delete not found!");
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Add a `Lead`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createLeadFn = async (result) => {
	try {
		const addedLead = await addLead({
			raison_social: result.raison_social,
			professionnel: result.professionnel,
			fixe: result.fixe,
		});

		return addedLead;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createLeadMiddleware,
	patchLeadMiddleware,
	findLeadByIdMiddleware,
	findAllLeadsMiddleware,
	deleteLeadMiddleware,
	createLeadFn,
};
