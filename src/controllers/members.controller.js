/** @format */

const { sendResponse, sendErrorResponse } = require("../utils/createResponse");
const {
  getMembersService,
  deleteMemberByIdService,
  getMyBorrowedBookService,
  getMyHistoryBookService,
  getMyProfileService,
} = require("../services/members.service");
const getMembers = async (req, res) => {
  try {
    const members = await getMembersService(req.query);
    sendResponse(res, 200, "All registered members", members);
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Issue",
    );
  }
};
const deleteMemberById = async (req, res) => {
  try {
    const member = await deleteMemberByIdService(req.params.id);
    sendResponse(res, 200, "member deleted successfully", member);
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Issue",
    );
  }
};

const getMyBorrowedBooks = async (req, res) => {
  try {
    const response = await getMyBorrowedBookService(req.user);
    sendResponse(res, 200, "books fetched successfully", response);
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Issue",
    );
  }
};
const getMyHistoryBooks = async (req, res) => {
  try {
    const response = await getMyHistoryBookService(req.user);
    sendResponse(res, 200, "books fetched successfully", response);
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Issue",
    );
  }
};

const getMyProfile = async (req, res) => {
  try {
    const user = await getMyProfileService(req.user.id);
    sendResponse(res, 200, "Profile fetched successfully", user);
  } catch (error) {
    sendErrorResponse(res, error.statusCode || 500, error.message || "Internal Server Issue");
  }
};

module.exports = {
  getMembers,
  deleteMemberById,
  getMyBorrowedBooks,
  getMyHistoryBooks,
  getMyProfile,
};
