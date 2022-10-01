const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    username:{type:String,required:true},
    homeLocation:{type:String,required:false},
    password:{type:String,required:true}

})

const userModel = mongoose.model("user",userSchema);


module.exports = {userModel}

