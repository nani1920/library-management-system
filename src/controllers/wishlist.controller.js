/** @format */

const { sendResponse, sendErrorResponse } = require("../utils/createResponse");
const {
  addToWishlistService,
  removeFromWishlistService,
  getWishlistService,
} = require("../services/wishlist.service");

const addToWishlist = async (req, res) => {
  try {
    const entry = await addToWishlistService(req.params.bookId, req.user.id);
    sendResponse(res, 201, `${entry.bookId.title} added to wishlist`, entry);
  } catch (error) {
    sendErrorResponse(res, error.statusCode || 500, error.message || "Internal Server Issue");
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const entry = await removeFromWishlistService(req.params.bookId, req.user.id);
    sendResponse(res, 200, `${entry.bookId.title} removed from wishlist`, entry);
  } catch (error) {
    sendErrorResponse(res, error.statusCode || 500, error.message || "Internal Server Issue");
  }
};

const getWishlist = async (req, res) => {
  try {
    const wishlist = await getWishlistService(req.user.id);
    const message = wishlist.length === 0 ? "Your wishlist is empty" : "Wishlist fetched successfully";
    sendResponse(res, 200, message, wishlist);
  } catch (error) {
    sendErrorResponse(res, error.statusCode || 500, error.message || "Internal Server Issue");
  }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
