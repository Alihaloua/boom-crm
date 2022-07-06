const express = require("express");
const router = express.Router();

const LogController = require("../Controllers/Log.controller");
const {
	createLogMiddleware,
	deleteLogMiddleware,
	findAllLogsMiddleware,
	findLogByIdMiddleware,
	patchLogMiddleware,
} = require("../Middlewares/log.middleware");

/**
 * Get All `Log`
 */
router.get("/", findAllLogsMiddleware, LogController.findAll());

/**
 * Get `Log` by Id
 */
router.get("/:id", findLogByIdMiddleware, LogController.findOne());

/**
 * Create a `Log`
 */
router.post("/", createLogMiddleware, LogController.create());

/**
 * Update a `Log`
 */
router.put("/:id", patchLogMiddleware, LogController.patch());

/**
 * Delete a `Log`
 */
router.delete("/:id", deleteLogMiddleware, LogController.delete());

module.exports = router;
