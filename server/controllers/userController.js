const jwt = require('jsonwebtoken');
const {userModel} = require('../models/user') 
const bcrypt = require('bcryptjs');

async function loginUser(req,res,next){
    try{    
        if(req.body){
            console.log(req.body)
        const {username,password} = await req.body
        const user = await userModel.findOne({username})
        if(user){
            if(await bcrypt.compare(password,user.password)){
                const userToken = jwt.sign({username,password},'user123')
                res.json({message:`user with given name is found`,status:200,user:userToken})
            }
            else{res.json({message:`wrong password`,status:400,user:false})
        }
        }
        else{
            res.json({message:`user not found`,status:404,user:false})
        }
    }
}
catch(err){
    console.log(err)
    res.json({message:err.message,status:err.status,user:false})
    }
}

async function signupUser(req,res){
    if(req.body){
        const {username,password,location} = await req.body
        console.log(req.body)
        const user = await userModel.findOne({username:username})
        const salt = await bcrypt.genSalt(10);
        if(user) {
            res.json({message:'user already exists',token:false,status:400})
            return 
        }
        const encryptedPassword = await bcrypt.hash(password,salt) 
        console.log(encryptedPassword)       
        const token = jwt.sign({
            username:username,
            password:encryptedPassword,
            homeLocation:location
            },'userkey123');
            const response = await userModel.create({username:username,password:encryptedPassword,homeLocation:location})
            res.json({message:'User created successfully',token:token,status:200})       
}
}

async function verifyUser(req,res,next){
    try{
        const token =  await req.params.token;
        if(jwt.verify(token)){
            const {payload} = jwt.decode(token,{complete:true})
            const {username,password,homeLocation} = payload;
            const result = await userModel.create({
                username:username,
                password:password,
                homeLocation:homeLocation
            })
            if(result){
                res.json({user:true,message:'user created successfully'}).status(200)
            }
            else{
                res.json({user:false,message:'some thing went wrong'}).status(404)
            }
        }
        else{
            res.json({message:'token is not valid',verifed:false}).status(498)
        }
    }
    catch(err){
        console.log(err)
    }
}

async function forgotPassword(req,res,next){
    const {username} = req.body;
        const user = await userModel.findOne({username:username})
        if(!user){res.json({success:false,status:404,token:false,message:"user with given mail doesn't exist"}).status(404)}
        else{
            const token = jwt.sign({username:username,password:user.password,homeLocation:user.homeLocation||null},'resetKey123')
            res.json({success:true,token:token,status:200,message:"please check you mail."}).status(200);
        }
}

module.exports = {loginUser,signupUser,verifyUser,forgotPassword}