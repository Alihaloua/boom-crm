"use strict";
const prisma = require("../helpers/prisma.helper");

/**
 * Get a Lead from an ID
 * @param {Number} Id
 * @returns {Object} Lead data
 */
const findLeadById = async (id) => {
	const lead = prisma.lead.findFirst({
		where: {
			id,
			AND: {
				deletedAt: null,
			},
		},
		select: {
			id: true,
			fullname: true,
			comment: true,
			email: true,
			phone: true,
			status: {
				select: {
					name: true,
				},
			},
			createdAt: true,
		},
	});
	return lead;
};

/**
 * Get All Leads
 * @returns {Object}
 */
const findAllLeads = async (skip = null, take = null, filters = {}) => {
	const leads = await prisma.lead.findMany({
		// skip,
		// take,
		where: filters,
		select: {
			id: true,
			fullname: true,
			comment: true,
			email: true,
			phone: true,
			status: {
				select: {
					name: true,
				},
			},
			createdAt: true,
		},
	});
	return leads;
};

/**
 * Add a new Lead
 * @param {Object}
 * @returns {Object}
 */
const addLead = async (data) => {
	const lead = await prisma.lead.create({
		data,
	});
	return lead;
};

/**
 * Update a Lead
 * @param {Object}
 * @returns {Number}
 */
const editLead = async (id, data) => {
	const lead = await prisma.lead.updateMany({
		where: {
			id,
			AND: {
				deletedAt: null,
			},
		},
		data,
	});
	return lead;
};

/**
 * Delete a Lead (soft delete)
 * @param {Object}
 * @returns {Number}
 */
const deleteLead = async (id) => {
	const lead = await prisma.lead.updateMany({
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
	return lead;
};

module.exports = {
	findLeadById,
	findAllLeads,
	addLead,
	editLead,
	deleteLead,
};
