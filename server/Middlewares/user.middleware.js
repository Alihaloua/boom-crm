"use strict";
const Joi = require("joi");
const createError = require("http-errors");

const {
	findUserById,
	findAllUsers,
	addUser,
	editUser,
	deleteUser,
} = require("../Models/user.model");

/**
 * Validate Add User
 */
const userSchema = Joi.object({
	fullname: Joi.string(),
	email: Joi.string().max(255),
	password: Joi.string(),
	phone: Joi.string().max(255),

	roleId: Joi.number(),
});

/**
 * Validate Add User
 */
const patchUserSchema = Joi.object({
	fullname: Joi.string().allow(null),
	email: Joi.string().max(255).allow(null),
	password: Joi.string().allow(null),
	phone: Joi.string().max(255).allow(null),

	roleId: Joi.number().allow(null),
});

/**
 * Validate User Id
 */

const userIdSchema = Joi.object({
	id: Joi.number(),
});

/**
 * Add a User
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createUserMiddleware = async (req, res, next) => {
	try {
		const result = await userSchema.validateAsync(req.body, {
			abortEarly: false,
		});

		// console.log(result);
		const addedUser = await addUser(result);

		req.data = addedUser;
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Edit a `User`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const patchUserMiddleware = async (req, res, next) => {
	try {
		const result = await patchUserSchema.validateAsync(req.body, {
			abortEarly: false,
		});

		const user = await userIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const editedUser = await editUser(Number(user.id), result);

		if (editedUser.count) {
			req.data = await findUserById(Number(user.id));
		} else throw createError.NotFound("Record to update not found!");
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Get one `User`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const findUserByIdMiddleware = async (req, res, next) => {
	try {
		const result = await userIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const id = Number(result.id);
		const user = await findUserById(id);
		if (!user) throw createError.NotFound("No data found!");
		req.data = user;
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Get All `User`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const findAllUsersMiddleware = async (req, res, next) => {
	try {
		const allUsers = await findAllUsers();
		if (allUsers.length === 0) return res.sendStatus(204).end();
		else if (!allUsers) throw createError.NotFound("No data found!");
		req.data = allUsers;
		next();
	} catch (error) {
		next(error);
	}
};

/**
 * Delete a `User`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteUserMiddleware = async (req, res, next) => {
	try {
		const result = await userIdSchema.validateAsync(req.params, {
			abortEarly: false,
		});

		const id = Number(result.id);
		const user = await deleteUser(id);
		if (!user.count)
			throw createError.NotFound("Record to delete not found!");
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

/**
 * Add a `User`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createUserFn = async (result) => {
	try {
		const addedUser = await addUser({
			raison_social: result.raison_social,
			professionnel: result.professionnel,
			fixe: result.fixe,
		});

		return addedUser;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Delete a `User`
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const validateTokenMiddleware = async (req, res, next) => {
	try {
		const id = Number(result.id);
		const user = await deleteUser(id);
		if (!user.count)
			throw createError.NotFound("Record to delete not found!");
		next();
	} catch (error) {
		if (error.isJoi) next(createError.BadRequest(error.details));
		next(error);
	}
};

module.exports = {
	createUserMiddleware,
	patchUserMiddleware,
	findUserByIdMiddleware,
	findAllUsersMiddleware,
	deleteUserMiddleware,
	createUserFn,
};
