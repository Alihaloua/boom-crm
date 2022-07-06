const express = require("express");
const router = express.Router();

const StatusController = require("../Controllers/Status.controller");
const {
	createStatusMiddleware,
	deleteStatusMiddleware,
	findAllStatusMiddleware,
	findStatusByIdMiddleware,
	patchStatusMiddleware,
} = require("../Middlewares/status.middleware");

/**
 * Get All `Status`
 */
router.get("/", findAllStatusMiddleware, StatusController.findAll());

/**
 * Get `Status` by Id
 */
router.get("/:id", findStatusByIdMiddleware, StatusController.findOne());

/**
 * Create a `Status`
 */
router.post("/", createStatusMiddleware, StatusController.create());

/**
 * Update a `Status`
 */
router.put("/:id", patchStatusMiddleware, StatusController.patch());

/**
 * Delete a `Status`
 */
router.delete("/:id", deleteStatusMiddleware, StatusController.delete());

module.exports = router;
