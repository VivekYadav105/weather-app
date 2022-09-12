const express = require("express");

const app = express();
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 5000;

const weatherRouter = require('./routes/weatherRoutes')

app.route("/").get((req, res, next) => {
  console.log("home page");
  res.send("hello world")
});

app.use('/weather',weatherRouter)

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
});

