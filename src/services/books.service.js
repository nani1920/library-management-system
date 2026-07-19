/** @format */

const borrowModel = require("../models/borrow.model");
const bookModel = require("../models/books.model");
const createError = require("../utils/createError");
const _ = require("lodash");

const getBookFilters = (options, page, limit) => {
  const match = {
    ...(options.search && {
      $or: [
        { title: { $regex: options.search, $options: "i" } },
        { author: { $regex: options.search, $options: "i" } },
      ],
    }),
    ...(options.category && {
      category: { $regex: options.category, $options: "i" },
    }),
  };

  const project = {
    quantity: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  };

  const facet = {
    books: [{ $skip: (page - 1) * limit }, { $limit: limit }],
    total: [{ $count: "count" }],
  };

  const pipeline = [];
  pipeline.push({ $match: match });
  pipeline.push({ $project: project });
  pipeline.push({ $facet: facet });
  return pipeline;
};

const createBookService = async (data) => {
  const {
    title,
    author,
    isbn,
    category,
    quantity,
    availableQuantity,
    imgUrl,
    description,
  } = data;

  const bookExists = await bookModel.findOne({ isbn });
  if (bookExists) {
    throw createError(409, "book with this ISBN already exists");
  }
  const updatedBody = {
    title,
    author,
    isbn,
    category,
    quantity,
    availableQuantity: quantity,
    imgUrl,
    description,
  };

  const book = await bookModel.create(updatedBody);

  return book;
};
const getBooksService = async (data) => {
  const page = Number(data.page) || 1;
  const limit = Number(data.limit) || 10;
  const pipeline = getBookFilters(data, page, limit);

  const [result] = await bookModel.aggregate(pipeline);
  const books = result.books;
  const total = result?.total[0]?.count;
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;

  const hasPreviousPage = page > 1;

  return {
    page,
    limit,
    totalItems: total,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    books,
  };
};

const getBookByIdService = async (bookId) => {
  const book = await bookModel.findById(bookId);
  if (!book) {
    throw createError(404, "book not found");
  }
  return book;
};

const updateBookByIdService = async (bookId, data) => {
  const book = await bookModel.findById(bookId);
  if (!book) {
    throw createError(404, "book not found");
  }
  const updatedData = {
    ...(data.title && { title: data.title }),
    ...(data.author && { author: data.author }),
    ...(data.quantity && { quantity: data.quantity }),
    ...(data.availableQuantity && {
      availableQuantity: data.availableQuantity,
    }),
    ...(data.imgUrl && { imgUrl: data.imgUrl }),
    ...(data.description && { description: data.description }),
  };
  const updatedBook = await bookModel.findByIdAndUpdate(bookId, updatedData, {
    runValidators: true,
    returnDocument: "after",
  });
  return updatedBook;
};

const deleteBookByIdService = async (bookId) => {
  const book = await bookModel.findById(bookId);
  if (!book) {
    throw createError(404, "book not found");
  }
  const deletedBook = await bookModel.findByIdAndDelete(bookId);
  return deletedBook;
};

const borrowBookService = async (bookId, user) => {
  const book = await bookModel.findById(bookId);
  if (!book) {
    throw createError(404, "Book not found");
  }
  if (book.availableQuantity <= 0) {
    throw createError(400, "Book is currently unavailable");
  }
  const borrowedRecord = await borrowModel.findOne({
    memberId: user.id,
    bookId: book._id,
    status: "borrowed",
  });
  if (borrowedRecord) {
    throw createError(400, "User has already borrowed this book");
  }
  const updatedData = {
    memberId: user.id,
    bookId: book._id,
    status: "borrowed",
  };

  const borrowed = await borrowModel.create(updatedData);
  await bookModel.findByIdAndUpdate(
    book._id,
    {
      availableQuantity: book.availableQuantity - 1,
    },
    { runValidators: true, returnDocument: "after" },
  );
  const updatedBorrowedData = _.omit(borrowed.toObject(), ["returnDate"]);
  return updatedBorrowedData;
};

const returnBookService = async (bookId, user) => {
  const book = await bookModel.findById(bookId);
  if (!book) {
    throw createError(404, "Book not found");
  }
  const borrowedRecord = await borrowModel.findOne({
    memberId: user.id,
    bookId: book._id,
    status: "borrowed",
  });
  if (!borrowedRecord) {
    throw createError(400, "User has not borrowed this book");
  }
  const updatedBorrowRecord = await borrowModel.findByIdAndUpdate(
    borrowedRecord._id,
    { returnDate: new Date(), status: "returned" },
    { runValidators: true, returnDocument: "after" },
  );
  await bookModel.findByIdAndUpdate(
    book._id,
    {
      availableQuantity: book.availableQuantity + 1,
    },
    { runValidators: true, returnDocuments: "after" },
  );
  return updatedBorrowRecord;
};
module.exports = {
  createBookService,
  getBooksService,
  getBookByIdService,
  updateBookByIdService,
  deleteBookByIdService,
  borrowBookService,
  returnBookService,
};
