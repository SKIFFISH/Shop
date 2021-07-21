const express = require('express');
const {dbConnect} = require('../utils/dbConnect')
const router = express.Router()
const User = require('../models/UserModel')
const AsyncHandler = require('express-async-handler');
const {generateToken} = require('../utils/generateToken');
const auth = require('../middlewares/auth');

dbConnect()

router.post('/login',AsyncHandler(async (req,res) => {
    console.log(req.body)

    const {email,password} = req.body

    const user = await User.findOne({email:email});

    if(!user){
        res.status(400).json({
            success:false,
            message:'No such User'
        })
    }

    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        res.status(400).json({
            success:false,
            message:'Wrong Password'
        })
    };

    if(isMatch && user){
        res.status(200).json({
            success:true,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
            }
        })
    }

    res.json({
        success:true,
        products
    })

}))

//Regist post /api/user/regist
router.post('/regist', AsyncHandler(async (req,res) => {
    const {name,email,password,passwordCheck} = req.body;

    const existUser = User.find({email:email});
    if(existUser){
        res.status(400).json({
            success:false,
            message:'The email has been registed'
        })
    }

    if(password != passwordCheck){
        res.status(400).json({
            success:fale,
            message:'The password is not equal to check'
        })
    }

    const user = await User.create({
        name,
        email,
        password,
        passwordCheck
    })

    if(user){
        res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(400).json({
            message:'Invalid data'
        })
    }

}))


//GET PROFILE 
router.get('/profile',auth,async (req,res)=>{
    
    const user = await User.findById(req.user._id);

    if(!user){
        res.status(401).json({
            success:false,
            message:'Wrong authorization'
        })
    }

    res.status(200).json({
        success:true,
        profile:{
            email:user.email,
            id:user._id,
            name:user.name,
            isAdmin:user.isAdmin
        }
    })
})

router.get('/',(req,res)=>{
    res.send('hello')
})

module.exports = router;
