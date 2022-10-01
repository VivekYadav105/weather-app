const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20")

//passport uses strategies to allow login from different platforms

const googleStrategy = new GoogleStrategy({/* options here */ }) 

passport.use(googleStrategy,()=>{/* callback functions for passport */})