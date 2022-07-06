"use strict";
const prisma = require("../helpers/prisma.helper");

/**
 * Get a User from an ID
 * @param {Number} Id
 * @returns {Object} User data
 */
const findUserById = async (id) => {
	const user = prisma.user.findFirst({
		where: {
			id,
			AND: {
				deletedAt: null,
			},
		},
		select: {
			id: true,
			fullname: true,
			email: true,
			password: true,
			phone: true,
			role: {
				select: {
					name: true,
				},
			},
			createdAt: true,
		},
	});
	return user;
};

/**
 * Get All Users
 * @returns {Object}
 */
const findAllUsers = async (skip = null, take = null, filters = {}) => {
	const users = await prisma.user.findMany({
		// skip,
		// take,
		where: filters,
		select: {
			id: true,
			fullname: true,
			email: true,
			password: true,
			phone: true,
			role: {
				select: {
					name: true,
				},
			},
			createdAt: true,
		},
	});
	return users;
};

/**
 * Add a new User
 * @param {Object}
 * @returns {Object}
 */
const addUser = async (data) => {
	const user = await prisma.user.create({
		data,
	});
	return user;
};

/**
 * Update a User
 * @param {Object}
 * @returns {Number}
 */
const editUser = async (id, data) => {
	const user = await prisma.user.updateMany({
		where: {
			id,
			AND: {
				deletedAt: null,
			},
		},
		data,
	});
	return user;
};

/**
 * Delete a User (soft delete)
 * @param {Object}
 * @returns {Number}
 */
const deleteUser = async (id) => {
	const user = await prisma.user.updateMany({
		where: {
			id,
			AND: {
				deletedAt: null,
			},
		},
		data: {
			deletedAt: new Date(),
		},
	});
	return user;
};

module.exports = {
	findUserById,
	findAllUsers,
	addUser,
	editUser,
	deleteUser,
};
