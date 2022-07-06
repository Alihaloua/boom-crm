const express = require("express");
const router = express.Router();

const RoleController = require("../Controllers/Role.controller");
const {
	createRoleMiddleware,
	deleteRoleMiddleware,
	findAllRolesMiddleware,
	findRoleByIdMiddleware,
	patchRoleMiddleware,
} = require("../Middlewares/role.middleware");

/**
 * Get All `Role`
 */
router.get("/", findAllRolesMiddleware, RoleController.findAll());

/**
 * Get `Role` by Id
 */
router.get("/:id", findRoleByIdMiddleware, RoleController.findOne());

/**
 * Create a `Role`
 */
router.post("/", createRoleMiddleware, RoleController.create());

/**
 * Update a `Role`
 */
router.put("/:id", patchRoleMiddleware, RoleController.patch());

/**
 * Delete a `Role`
 */
router.delete("/:id", deleteRoleMiddleware, RoleController.delete());

module.exports = router;
