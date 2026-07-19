/** @format */

const wishlistModel = require("../models/wishlist.model");
const bookModel = require("../models/books.model");
const createError = require("../utils/createError");

const addToWishlistService = async (bookId, userId) => {
  const book = await bookModel.findById(bookId);
  if (!book) throw createError(404, "Book not found");

  const exists = await wishlistModel.findOne({ userId, bookId });
  if (exists) throw createError(409, "Book already in wishlist");

  const entry = await (await wishlistModel.create({ userId, bookId })).populate("bookId", "-quantity -__v -createdAt -updatedAt");
  return entry;
};

const removeFromWishlistService = async (bookId, userId) => {
  const entry = await wishlistModel
    .findOneAndDelete({ userId, bookId })
    .populate("bookId", "-quantity -__v -createdAt -updatedAt");
  if (!entry) throw createError(404, "Book not found in wishlist");
  return entry;
};

const getWishlistService = async (userId) => {
  const wishlist = await wishlistModel
    .find({ userId })
    .populate("bookId", "-quantity -__v -createdAt -updatedAt");
  return wishlist;
};

module.exports = {
  addToWishlistService,
  removeFromWishlistService,
  getWishlistService,
};
