"use strict";
const Joi = require("joi");
const createError = require("http-errors");

const {
	findRoleById,
	findAllRoles,
	addRole,
	editRole,
	deleteRole,
} = require("../Models/role.model");

/**
 * Validate Add Role
 */
const roleSchema = Joi.object({
	name: Joi.string(),
});

/**
 * Validate Role Id
 */

const roleIdSchema = Joi.object({
	id: Joi.number(),
});

/**
 * Add a Role
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createRoleMiddleware = async (req, res, next) => {
	try {
		const result = await roleSchema.validateAsync(req.body, {
			abortEarly: false,
		});
		const addedRole = await addRole(result);

		req.data = addedRole;
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Edit a `Role`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const patchRoleMiddleware = async (req, res, next) => {
	try {
		const result = await roleSchema.validateAsync(req.body, {
			abortEarly: false,
		});

		const role = await roleIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const editedRole = await editRole(Number(role.id), {});

		if (editedRole.count) {
			req.data = await findRoleById(Number(role.id));
		} else throw createError.NotFound("Record to update not found!");
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Get one `Role`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const findRoleByIdMiddleware = async (req, res, next) => {
	try {
		const result = await roleIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const id = Number(result.id);
		const role = await findRoleById(id);
		if (!role) throw createError.NotFound("No data found!");
		req.data = role;
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Get All `Role`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const findAllRolesMiddleware = async (req, res, next) => {
	try {
		const allRoles = await findAllRoles();
		if (allRoles.length === 0) return res.sendStatus(204).end();
		else if (!allRoles) throw createError.NotFound("No data found!");
		req.data = allRoles;
		next();
	} catch (error) {
		next(error);
	}
};

/**
 * Delete a `Role`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteRoleMiddleware = async (req, res, next) => {
	try {
		const result = await roleIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const id = Number(result.id);
		const role = await deleteRole(id);
		if (!role.count)
			throw createError.NotFound("Record to delete not found!");
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Add a `Role`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createRoleFn = async (result) => {
	try {
		const addedRole = await addRole({
			raison_social: result.raison_social,
			professionnel: result.professionnel,
			fixe: result.fixe,
		});

		return addedRole;
	} catch (error) {
		console.role(error);
	}
};

module.exports = {
	createRoleMiddleware,
	patchRoleMiddleware,
	findRoleByIdMiddleware,
	findAllRolesMiddleware,
	deleteRoleMiddleware,
	createRoleFn,
};
