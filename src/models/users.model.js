/** @format */

const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["member", "librarian"],
      default: "member",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.set("toJSON", {
  versionKey: false,
});
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
