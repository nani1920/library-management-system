/** @format */

const express = require("express");
const router = express.Router();
const { validateMemberId } = require("../validations/members.request");
const { validateParams } = require("../middlewares/validate");
const {
  isAuthenticated,
  authorizeRole,
} = require("../middlewares/auth.middleware");
const {
  getMembers,
  deleteMemberById,
  getMyBorrowedBooks,
  getMyHistoryBooks,
} = require("../controllers/members.controller");

router.use(isAuthenticated);

router.get("/", authorizeRole("librarian"), getMembers);
router.delete(
  "/:id",
  validateParams(validateMemberId),
  authorizeRole("librarian"),
  deleteMemberById,
);
router.get("/me/books", authorizeRole("member"), getMyBorrowedBooks);
router.get("/me/history", authorizeRole("member"), getMyHistoryBooks);

module.exports = router;
