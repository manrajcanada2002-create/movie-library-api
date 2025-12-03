require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const moviesRouter = require("./src/routes/movies");
const authRouter = require("./src/routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/movielibrary";

app.use(cors());
app.use(express.json());


app.use("/auth", authRouter);
app.use("/api/movies", moviesRouter);

app.get("/", (req, res) => {
  res.send("Movie Library API is running");
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
