"use strict";
const prisma = require("../helpers/prisma.helper");

/**
 * Get a user data from his email
 * @param {String} userEmail
 * @returns {Object} users data
 */
const findUser = async (email) => {
	const user = await prisma.user.findFirst({
		select: {
			id: true,
			email: true,
			password: true,
			fullname: true,
		},
		where: {
			email,
			AND: {
				deletedAt: null,
			},
		},
	});
	return user;
};

/**
 *  Check if there is a user using this username before
 * @param {String} email
 * @returns email users count
 */
const IsUnique = async (email) => {
	const count = await prisma.user.count({
		where: {
			email,
			AND: {
				deletedAt: null,
			},
		},
	});
	return count;
};

module.exports = {
	findUser,
	IsUnique,
};
