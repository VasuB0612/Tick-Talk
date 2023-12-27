const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const port = process.env.PORT || 3000;
const uri = process.env.URI;

const cors = require("cors");
app.use(cors());

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to database established successfully!");
  } catch (error) {
    console.error("Errow connecting: ", error.message);
  }
};

connectDB();

app.use(express.json());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
