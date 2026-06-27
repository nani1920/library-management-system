/** @format */

const { sendResponse, sendErrorResponse } = require("../utils/createResponse");
const {
  createBookService,
  getBooksService,
  getBookByIdService,
  updateBookByIdService,
  deleteBookByIdService,
  borrowBookService,
  returnBookService,
} = require("../services/books.service");

const createBook = async (req, res) => {
  try {
    const book = await createBookService(req.body);
    sendResponse(res, 201, "book created Successfully", book);
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Issue",
    );
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await getBooksService(req.query);
    sendResponse(res, 200, "Books fetched successfully", books);
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Issue",
    );
  }
};
const getBookById = async (req, res) => {
  try {
    const book = await getBookByIdService(req.params.id);
    sendResponse(res, 200, `Book fetched succesfully`, book);
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Issue",
    );
  }
};
const updateBook = async (req, res) => {
  try {
    const updatedBook = await updateBookByIdService(req.params.id, req.body);
    sendResponse(
      res,
      200,
      `${updatedBook.title} updated successfully`,
      updatedBook,
    );
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Issue",
    );
  }
};
const deleteBook = async (req, res) => {
  try {
    const book = await deleteBookByIdService(req.params.id);
    sendResponse(res, 200, `${book.title} is deleted successfully`, book);
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Issue",
    );
  }
};

const borrowBook = async (req, res) => {
  try {
    const response = await borrowBookService(req.params.id, req.user);
    sendResponse(res, 200, "book borrowed successfully", response);
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Issue",
    );
  }
};

const returnBook = async (req, res) => {
  try {
    const response = await returnBookService(req.params.id, req.user);
    sendResponse(res, 200, "book returned successfully", response);
  } catch (error) {
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Issue",
    );
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
};
