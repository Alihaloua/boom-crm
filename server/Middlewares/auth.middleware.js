"use strict";
const Joi = require("joi");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { signAccessToken } = require("../helpers/jwt.helper");
const { findUser, IsUnique } = require("../Models/auth.model");
const { addUser } = require("../Models/user.model");

const loginSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});

const registerSchema = Joi.object({
	fullname: Joi.string(),
	email: Joi.string().max(255),
	password: Joi.string(),
	phone: Joi.string().max(255),

	roleId: Joi.number(),
	// role: Joi.any().valid("admin", "staff", "utilisateur").required(),
});

const loginMiddleware = async (req, res, next) => {
	try {
		const result = await loginSchema.validateAsync(req.body, {
			abortEarly: false,
		});

		console.log("from backend", result);

		// Get user data
		const user = await findUser(result.email);
		if (!user)
			throw createError.Unauthorized("Invalid Username or Password!");

		// compare passwords
		const isCorrect = await bcrypt.compare(result.password, user.password);

		if (!isCorrect)
			throw createError.Unauthorized("Invalid Username or Password!");

		// clean the ouput result
		const newResult = {
			id: user.id,
			email: user.email,
			fullname: user.fullname,
		};

		const accessToken = await signAccessToken(user.id);

		req.accessToken = accessToken;
		req.user = newResult;
		next();
	} catch (error) {
		if (error.isJoi)
			return next(createError.Unauthorized("Invalid Email or Password!"));
		next(error);
	}
};

const registerMiddleware = async (req, res, next) => {
	try {
		// validate Data
		const result = await registerSchema.validateAsync(req.body, {
			abortEarly: false,
		});

		// Check Email is used or not
		const user = await IsUnique(result.email);
		if (user) throw createError.Conflict("Email is already used!");

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(result.password, salt);

		const addedUser = await addUser({
			fullname: result.fullname,
			email: result.email,
			password: hashedPassword,
			roleId: result.role,
		});

		// filter returned data
		const newUser = {
			id: addedUser.id,
			fullname: addedUser.fullname,
			email: addedUser.email,
		};

		const accessToken = await signAccessToken(addedUser.id);

		req.accessToken = accessToken;

		req.user = newUser;
		next();
	} catch (error) {
		if (error.isJoi) next(createError.UnprocessableEntity(error.details));
		next(error);
	}
};

module.exports = { loginMiddleware, registerMiddleware };
