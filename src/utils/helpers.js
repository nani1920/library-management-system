/** @format */

const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const jwt_secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const hashPassword = async (pass) => {
  return await bcrypt.hash(pass, 10);
};

const comparePassword = async (newPassword, hashedPassword) => {
  return await bcrypt.compare(newPassword, hashedPassword);
};

const generateToken = (data) => {
  return jwt.sign(data, jwt_secret, { expiresIn: "7d" });
};

const validateToken = (token) => {
  return jwt.verify(token, jwt_secret);
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  validateToken,
};
