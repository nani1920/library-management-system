/** @format */

const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRole,
} = require("../middlewares/auth.middleware");
const { validateBody, validateParams } = require("../middlewares/validate");
const {
  createBookRequest,
  updateBookRequest,
  validateBookId,
} = require("../validations/books.request");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require("../controllers/books.controller");

router.use(isAuthenticated);

router.post(
  "/",
  validateBody(createBookRequest),
  authorizeRole("librarian"),
  createBook,
);
router.get("/", getBooks);
router.get("/:id", validateParams(validateBookId), getBookById);
router.put(
  "/:id",
  validateParams(validateBookId),
  validateBody(updateBookRequest),
  authorizeRole("librarian"),
  updateBook,
);
router.delete(
  "/:id",
  validateParams(validateBookId),
  authorizeRole("librarian"),
  deleteBook,
);
router.post(
  "/:id/borrow",
  validateParams(validateBookId),
  authorizeRole("member"),
  borrowBook,
);
router.post(
  "/:id/return",
  validateParams(validateBookId),
  authorizeRole("member"),
  returnBook,
);
module.exports = router;
