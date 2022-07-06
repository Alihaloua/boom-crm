"use strict";
const prisma = require("../helpers/prisma.helper");

/**
 * Get a Role from an ID
 * @param {Number} Id
 * @returns {Object} Role data
 */
const findRoleById = async (id) => {
	const role = prisma.role.findFirst({
		where: {
			id,
			NOT: {
				deletedAt: null,
			},
		},
		select: {
			id: true,
			name: true,
		},
	});
	return role;
};

/**
 * Get All Roles
 * @returns {Object}
 */
const findAllRoles = async (skip = null, take = null, filters = {}) => {
	const roles = await prisma.role.findMany({
		// skip,
		// take,
		where: filters,
		select: {
			id: true,
			name: true,
		},
	});
	return roles;
};

/**
 * Add a new Role
 * @param {Object}
 * @returns {Object}
 */
const addRole = async (data) => {
	const role = await prisma.role.create({
		data,
	});
	return role;
};

/**
 * Update a Role
 * @param {Object}
 * @returns {Number}
 */
const editRole = async (id, data) => {
	const role = await prisma.role.updateMany({
		where: {
			id,
		},
		data,
	});
	return role;
};

/**
 * Delete a Role (soft delete)
 * @param {Object}
 * @returns {Number}
 */
const deleteRole = async (id) => {
	const role = await prisma.role.updateMany({
		where: {
			id,
		},
		data: {
			deletedAt: new Date(),
		},
	});
	return role;
};

module.exports = {
	findRoleById,
	findAllRoles,
	addRole,
	editRole,
	deleteRole,
};
