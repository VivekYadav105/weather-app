const express = require("express");

const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 5000;

app.route("/").get((req, res, next) => {
  console.log("home page");
  res.send("hello world")
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
});

