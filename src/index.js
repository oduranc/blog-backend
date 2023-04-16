const app = require("./app");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

dotenv.config();

mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
