/** @format */
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const connectDb = require("./src/config/db");

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

const authRoute = require("./src/routes/auth.route");
const bookRoute = require("./src/routes/books.route");
const memberRoute = require("./src/routes/members.route");
const wishlistRoute = require("./src/routes/wishlist.route");
app.use("/api/auth/", authRoute);
app.use("/api/books/", bookRoute);
app.use("/api/members", memberRoute);
app.use("/api/wishlist", wishlistRoute);

app.get("/", async (req, res) => {
  res.json({ success: true, message: "Server is Healthy" });
});
const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, async () => {
      console.log(`server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
