/** @format */

const z = require("zod");
const mongoose = require("mongoose");
const isMongoId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const validateMemberId = z.object({
  id: z.string().refine((id) => isMongoId(id), { message: "Invalid memberId" }),
});

module.exports = { validateMemberId };
