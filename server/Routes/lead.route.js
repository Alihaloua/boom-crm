const express = require("express");
const router = express.Router();

const LeadController = require("../Controllers/Lead.controller");
const {
	createLeadMiddleware,
	deleteLeadMiddleware,
	findAllLeadsMiddleware,
	findLeadByIdMiddleware,
	patchLeadMiddleware,
} = require("../Middlewares/lead.middleware");

/**
 * Get All `Lead`
 */
router.get("/", findAllLeadsMiddleware, LeadController.findAll());

/**
 * Get `Lead` by Id
 */
router.get("/:id", findLeadByIdMiddleware, LeadController.findOne());

/**
 * Create a `Lead`
 */
router.post("/", createLeadMiddleware, LeadController.create());

/**
 * Update a `Lead`
 */
router.put("/:id", patchLeadMiddleware, LeadController.patch());

/**
 * Delete a `Lead`
 */
router.delete("/:id", deleteLeadMiddleware, LeadController.delete());

module.exports = router;
