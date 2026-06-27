/** @format */
const _ = require("lodash");
const userModel = require("../models/users.model");
const createError = require("../utils/createError");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/helpers");

const register = async (data) => {
  const { name, email, password, role } = data;
  const isEmailExist = await userModel.findOne({ email: email });
  if (isEmailExist) {
    throw createError(409, "email already exists");
  }
  const updatedPassword = await hashPassword(password);
  const updatedBody = {
    name,
    email,
    password: updatedPassword,
    role,
  };
  const user = await userModel.create(updatedBody);
  const safeUser = _.omit(user.toObject(), ["password"]);
  return { user: safeUser };
};

const login = async (data) => {
  const { email, password } = data;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    throw createError(404, "user not found with this email");
  }

  const isPasswordMatched = await comparePassword(password, user.password);

  if (!isPasswordMatched) {
    throw createError(401, "password is not matched");
  }
  const token = generateToken({ id: user._id, role: user.role });
  const safeUser = _.omit(user.toObject(), ["password"]);
  return { token };
};

module.exports = { register, login };
