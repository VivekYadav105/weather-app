const cookieParser = require("cookie-parser");
const express = require("express");
const { mongoose, connection } = require("mongoose");
const morgan = require("morgan");
const cors = require('cors')

const app = express();
require('dotenv').config()

const {userRouter} = require('./routes/userRoutes')
const {weatherRouter} = require('./routes/weatherRoutes')
console.log(userRouter)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

const PORT = process.env.PORT || 5000;


app.get('/',(req, res, next) => {
  console.log("home page");
  res.send("hello world")
});

app.use(morgan('tiny'))

mongoose.connect(`mongodb+srv://vivek:${process.env.MONGO_PASSWORD}@cluster0.ydumq.mongodb.net/weather`).then((success,err)=>{
  if(success){console.log('success\ndatabase name:',connection.db.databaseName)}
  else 
    console.log('err:',err.message)
  
})

app.use('/weather',weatherRouter)
app.use('/user',userRouter)

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  else{
     console.log("listening to port "+PORT)
  }
});

