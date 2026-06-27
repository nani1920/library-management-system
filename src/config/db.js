/** @format */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.URI;
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database is connected  Successfully");
  } catch (error) {
    console.log("DB Error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
