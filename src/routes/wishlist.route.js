/** @format */

const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRole,
} = require("../middlewares/auth.middleware");
const { validateParams } = require("../middlewares/validate");
const { validateWishlistBookId } = require("../validations/wishlist.request");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlist.controller");

router.use(isAuthenticated);
router.use(authorizeRole("member"));

router.get("/", getWishlist);
router.post("/:bookId", validateParams(validateWishlistBookId), addToWishlist);
router.delete(
  "/:bookId",
  validateParams(validateWishlistBookId),
  removeFromWishlist,
);

module.exports = router;
