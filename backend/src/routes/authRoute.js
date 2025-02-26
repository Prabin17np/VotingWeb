
const express = require("express");
const authController = require("../controller/AuthController");
const {authenticateToken } = require('../middleware/token-middleware');

const router = express.Router();

router.get("/init", authController.init);
router.post("/login",authenticateToken, authController.login);

module.exports = router;
