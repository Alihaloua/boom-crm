"use strict";
const prisma = require("../helpers/prisma.helper");

/**
 * Get a Log from an ID
 * @param {Number} Id
 * @returns {Object} Log data
 */
const findLogById = async (id) => {
	const log = prisma.activityLog.findFirst({
		where: {
			id,
			AND: {
				deletedAt: null,
			},
		},
		select: {
			id: true,
			action: true,
			description: true,
			targetId: true,
			targetModel: true,

			affectedBy: true,
			affectedByModel: true,
			createdAt: true,
		},
	});
	return log;
};

/**
 * Get All Logs
 * @returns {Object}
 */
const findAllLogs = async (skip = null, take = null, filters = {}) => {
	const logs = await prisma.activityLog.findMany({
		// skip,
		// take,
		where: filters,
		select: {
			id: true,
			action: true,
			description: true,
			targetId: true,
			targetModel: true,

			affectedBy: true,
			affectedByModel: true,
			createdAt: true,
		},
	});
	return logs;
};

/**
 * Add a new Log
 * @param {Object}
 * @returns {Object}
 */
const addLog = async (data) => {
	const log = await prisma.activityLog.create({
		data,
	});
	return log;
};

/**
 * Update a Log
 * @param {Object}
 * @returns {Number}
 */
const editLog = async (id, data) => {
	const log = await prisma.activityLog.updateMany({
		where: {
			id,
			AND: {
				deletedAt: null,
			},
		},
		data,
	});
	return log;
};

/**
 * Delete a Log (soft delete)
 * @param {Object}
 * @returns {Number}
 */
const deleteLog = async (id) => {
	const log = await prisma.activityLog.updateMany({
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
	return log;
};

module.exports = {
	findLogById,
	findAllLogs,
	addLog,
	editLog,
	deleteLog,
};
