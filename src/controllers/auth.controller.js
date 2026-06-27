/** @format */

const { sendResponse, sendErrorResponse } = require("../utils/createResponse");
const { register, login } = require("../services/auth.service");
const registerUser = async (req, res) => {
  try {
    const user = await register(req.body);
    sendResponse(res, 201, "user created successfully", user);
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Issue",
    );
  }
};
const loginUser = async (req, res) => {
  try {
    const response = await login(req.body);
    sendResponse(res, 200, "user logged in successfully", response);
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Issue",
    );
  }
};

module.exports = { registerUser, loginUser };
