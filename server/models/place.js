const { default: mongoose } = require("mongoose");

const placeSchema = mongoose.Schema({
    name:{type:String,required:true},
    latitude:{type:Number,required:true},
    longitude:{type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'user'}
})

const placeModel = mongoose.Model('place',placeSchema);

module.exports = {placeModel}

