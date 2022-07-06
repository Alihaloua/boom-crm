"use strict";
const prisma = require("../helpers/prisma.helper");

/**
 * Get a Status from an ID
 * @param {Number} Id
 * @returns {Object} Status data
 */
const findStatusById = async (id) => {
	const status = prisma.status.findFirst({
		where: {
			id,
			AND: {
				deletedAt: null,
			},
		},
		select: {
			id: true,
			name: true,
		},
	});
	return status;
};

/**
 * Get All status
 * @returns {Object}
 */
const findAllStatus = async (skip = null, take = null, filters = {}) => {
	const status = await prisma.status.findMany({
		// skip,
		// take,
		where: filters,
		select: {
			id: true,
			name: true,
		},
	});
	return status;
};

/**
 * Add a new Status
 * @param {Object}
 * @returns {Object}
 */
const addStatus = async (data) => {
	const status = await prisma.status.create({
		data,
	});
	return status;
};

/**
 * Update a Status
 * @param {Object}
 * @returns {Number}
 */
const editStatus = async (id, data) => {
	const status = await prisma.status.updateMany({
		where: {
			id,
			AND: {
				deletedAt: null,
			},
		},
		data,
	});
	return status;
};

/**
 * Delete a Status (soft delete)
 * @param {Object}
 * @returns {Number}
 */
const deleteStatus = async (id) => {
	const status = await prisma.status.updateMany({
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
	return status;
};

module.exports = {
	findStatusById,
	findAllStatus,
	addStatus,
	editStatus,
	deleteStatus,
};
