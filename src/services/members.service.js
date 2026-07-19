/** @format */
const userModel = require("../models/users.model");
const borrowModel = require("../models/borrow.model");
const createError = require("../utils/createError");

const getMemberFilters = (options, page, limit) => {
  const match = {
    ...(options.search && { name: { $regex: options.search, $options: "i" } }),
    role: "member",
  };
  const project = {
    password: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  };
  const facet = {
    members: [{ $skip: (page - 1) * limit }, { $limit: limit }],
    total: [{ $count: "count" }],
  };
  const pipeline = [];
  pipeline.push({ $match: match });
  pipeline.push({ $project: project });
  pipeline.push({ $facet: facet });
  return pipeline;
};
const getMyProfileService = async (userId) => {
  const user = await userModel.findById(userId).select("-password -__v");
  if (!user) throw createError(404, "User not found");
  return user;
};

const getMembersService = async (data) => {
  const page = Number(data.page) || 1;
  const limit = Number(data.limit) || 10;
  const pipeline = getMemberFilters(data, page, limit);
  const [result] = await userModel.aggregate(pipeline);

  const members = result.members || [];
  const total = result?.total[0]?.count || 0;
  const totalPages = Math.ceil(total / limit);
  return { page, limit, totalItems: total, totalPages, members };
};

const deleteMemberByIdService = async (memberId) => {
  const member = await userModel.findById(memberId);
  if (!member) {
    throw createError(404, "member not found");
  }
  const deletedMember = await userModel.findByIdAndDelete(member._id);
  return deletedMember;
};

const getMyBorrowedBookService = async (user) => {
  const borrowedBooks = await borrowModel
    .find({
      memberId: user.id,
      status: "borrowed",
    })
    .populate({
      path: "bookId",
      select: "-quantity -availableQuantity -createdAt -updatedAt",
      as: "book",
    })
    .sort("-createdAt")
    .select("-returnDate -memberId");
  return borrowedBooks;
};

const getMyHistoryBookService = async (user) => {
  const borrowedBooks = await borrowModel
    .find({
      memberId: user.id,
    })
    .populate({
      path: "bookId",
      select: "-quantity -availableQuantity -createdAt -updatedAt",
      as: "book",
    })
    .sort("-createdAt")
    .select("-returnDate -memberId");

  return borrowedBooks;
};

module.exports = {
  getMembersService,
  deleteMemberByIdService,
  getMyBorrowedBookService,
  getMyHistoryBookService,
  getMyProfileService,
};
