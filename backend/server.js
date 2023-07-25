const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

// creating an instance of express application
const app = express();

// middleware configurations
app.use(express.json());
app.use(express.cookieParser());
app.use(express.urlencoded({ extended: true }));

// listening to server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});
