/** @format */

const z = require("zod");
const mongoose = require("mongoose");
const isMongoId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
const createBookRequest = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "title should have atleast 3 characters")
      .max(200, "title cannot exceed 200 characters"),
    author: z
      .string()
      .trim()
      .min(2, "author name should have atleast 2 characters")
      .max(100, "Author name cannot exceed 100 characters"),
    isbn: z.string().trim().min(10, "ISBN Number must be 10 characters"),
    category: z.string().trim().min(2, "Category is required"),
    quantity: z.coerce.number().min(0, "Quantity can't be negative"),
    imgUrl: z.string().trim().url("Please provide a valid image URL"),
    description: z
      .string()
      .trim()
      .min(10, "Description should have at least 10 characters")
      .max(2000, "Description cannot exceed 2000 characters"),
  })
  .strict();

const updateBookRequest = createBookRequest
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "atLeast one field required to update book",
  });

const validateBookId = z.object({
  id: z.string().refine((id) => isMongoId(id), { message: "Invalid bookId" }),
});

module.exports = { createBookRequest, updateBookRequest, validateBookId };
