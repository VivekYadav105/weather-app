const https = require('https')

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

const saveLocation = (req,res,next)=>{
    
}


module.exports = {getweatherWeekly,getWeatherLive}
