const {Router} = require('express');

const {loginUser,signupUser} = require('../controllers/userController');
const { userModel } = require('../models/user');

const userRouter = Router();

userRouter.post('/login',loginUser);

userRouter.get('/',(req,res)=>{res.send('hello from user')})

userRouter.get('/users',(req,res,next)=>{
    const users = userModel.find({})
    res.send(users)
})

userRouter.post('/signup',signupUser);

// userRouter.post('/forgotPassword',forgotPassword);

// userRouter.post('/resetPassword',resetPassword);

// userRouter.post('/verifyUser',verifyUser);

module.exports = {userRouter}

