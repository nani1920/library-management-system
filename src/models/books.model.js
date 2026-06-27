/** @format */

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    availableQuantity: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

// bookSchema.pre("save", function (next) {
//   if (this.isNew && this.availableQuantity == null) {
//     this.availableQuantity = this.quantity;
//   }
//   next();
// });

bookSchema.set("toJSON", {
  versionKey: false,
});

const bookModel = mongoose.model("Book", bookSchema);

module.exports = bookModel;
