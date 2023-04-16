const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/users");
const articleRouter = require("./routes/articles");
const commentRouter = require("./routes/comments");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("blog-uploads"));
app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter);
app.use("/api/comments", commentRouter);

app.get("/", (req, res) =>
  res.status(200).json({ message: "Tu real api manito." })
);

module.exports = app;
