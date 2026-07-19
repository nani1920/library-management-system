/** @format */

const z = require("zod");
const mongoose = require("mongoose");

const isMongoId = (id) => mongoose.Types.ObjectId.isValid(id);

const validateWishlistBookId = z.object({
  bookId: z.string().refine(isMongoId, { message: "Invalid bookId" }),
});

module.exports = { validateWishlistBookId };
