const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/User.controller");
const {
	createUserMiddleware,
	deleteUserMiddleware,
	findAllUsersMiddleware,
	findUserByIdMiddleware,
	patchUserMiddleware,
} = require("../Middlewares/user.middleware");

const {
	loginMiddleware,
	registerMiddleware,
} = require("../Middlewares/auth.middleware");

const { verifyAccessToken } = require("../helpers/jwt.helper");

/**
 * Get All `User`
 */
router.get("/", findAllUsersMiddleware, UserController.findAll());

/**
 * Get `User` by Id
 */
router.get("/:id", findUserByIdMiddleware, UserController.findOne());

/**
 * Create a `User`
 */
router.post("/", createUserMiddleware, UserController.create());

/**
 * Update a `User`
 */
router.put("/:id", patchUserMiddleware, UserController.patch());

/**
 * Delete a `User`
 */
router.delete("/:id", deleteUserMiddleware, UserController.delete());

router.post("/register", registerMiddleware, UserController.register());

router.post("/login", loginMiddleware, UserController.login());

router.post("/token", verifyAccessToken, UserController.token());

module.exports = router;
