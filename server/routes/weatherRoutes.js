const weatherRouter = require('express').Router()
const {getweatherWeekly,getWeatherLive} = require('../controllers/weatherContoller')

weatherRouter.route('/liveloc').get(getWeatherLive)

weatherRouter.route('/saved').get(()=>{'getSavedPlaces()'})
weatherRouter.route('/weekly').get(getweatherWeekly)

weatherRouter.route('/add').post(()=>{'saveLocation()'})
weatherRouter.route('/update/:id').post(()=>{'updateLocation()'})
weatherRouter.route('/delete/:id').post(()=>{'deleteLocation()'})


weatherRouter.route('/login').post(()=>{'loginUser()'})
weatherRouter.route('/signup').post(()=>{'signupUser()'})
weatherRouter.route('/verify').post(()=>{'signupUser()'})
weatherRouter.route('/resetPassword').post(()=>{'signupUser()'})

module.exports = weatherRouter