/** @format */

const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const {
  registerRequest,
  loginRequest,
} = require("../validations/auth.request");
const { validateBody } = require("../middlewares/validate");
const router = express.Router();

router.post("/register", validateBody(registerRequest), registerUser);
router.post("/login", validateBody(loginRequest), loginUser);
module.exports = router;
