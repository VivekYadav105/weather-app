const jwt = require('jsonwebtoken')
const {userModel} = require('../models/user')

const lat = 0
const lon = 0
const APIkey = '3c69e44246ed2a47cfbeb82438bad733'

const getweatherWeekly = (req,res,next) =>{
    
    const weeklyApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${APIkey}`
    
    https.get(weeklyApiUrl,(response)=>{
        response.on('data',(d)=>{res.send(d.json())})
        response.on('error',(err)=>{console.log(err)})
    })
}

const getWeatherLive = (req,res,next)=>{
    const liveApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${APIkey}`
    https.get(liveApiUrl,(response)=>{
        response.on('data',(d)=>{res.send(JSON.parse(d))})
        response.on('error',(err)=>{console.log(err)})
    })
}

const addLocation = async (req,res,next)=>{
    try{
        const {location,userToken} = await req.body;
        const username = jwt.decode(userToken)
        const user = await userModel.findOne({username})
        if(!user){res.json({success:"false",status:404,data:"user not found"});return}
        const existing = user.savedLocations.filter((i)=>{
            return i.name === location
        })
        if(existing){
            res.json({success:false,status:400,data:"Given Location exists"})
        }
        res.json({success:true,status:200,data:"location added successfully"})
    }   
    catch(err){
        res.json({success:false,status:500,data:"internal server error"})
    }
}

const getSavedLocations = async (req,res,next)=>{
    try{
        const {userToken} = await req.body;
        if(!userToken) {res.json({success:false,status:400,data:"please login to continue"});return}
        const {username} = jwt.decode(userToken.user);
        console.log(username)
        const user = await userModel.findOne({username})
        if(!user){res.json({success:false,status:404,data:"user not found"});return}
        console.log(user)
        const savedLocations = user.savedLocations;
        console.log(savedLocations)
        res.json({success:true,status:200,data:{savedLocations}})
    }
    catch(err){
        res.json({success:false,status:500,data:"internal server error",message:err.message})
    }
}

const removeLocation = async (req,res,next)=>{
    try{
        const {userToken,location} = await req.body;
        const username = jwt.decode(userToken);
        const user = await userModel.findOne({username})
        if(!user){res.json({success:false,status:404,data:"user not found"});return}
        const savedLocations = user.savedLocations.filter((i)=>{return i.name!=location})
        const res = await userModel.findOneAndupdate({username:username},{savedLocations})
    }
    catch(err){
        res.json({success:false,status:500,data:"internal server error"})
    }
}



module.exports = {getweatherWeekly,getWeatherLive,getSavedLocations,addLocation,removeLocation}
