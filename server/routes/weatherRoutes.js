const weatherRouter = require('express').Router()
const {getweatherWeekly,getWeatherLive,getSavedLocations,addLocation,removeLocation} = require('../controllers/weatherContoller')

weatherRouter.route('/liveloc').get(getWeatherLive)

weatherRouter.route('/weekly').get(getweatherWeekly)

weatherRouter.route('/getSavedLocations').post(getSavedLocations)
weatherRouter.route('/addLocation').post(addLocation)
weatherRouter.route('/deleteLocation').post(removeLocation)

module.exports = {weatherRouter}