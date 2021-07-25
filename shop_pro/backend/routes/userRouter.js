const express = require('express');
const {dbConnect} = require('../utils/dbConnect')
const router = express.Router()
const User = require('../models/UserModel')
const AsyncHandler = require('express-async-handler');
const {generateToken} = require('../utils/generateToken');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin')

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
    console.log(email,password)

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

    const existUser = await User.find({email:email});
    if(existUser.length > 0){
        res.status(400).json({
            success:false,
            message:'The email has been registed'
        })
        throw new Error('The email has been registed')
    }

    if(password != passwordCheck){
        res.status(400).json({
            success:fale,
            message:'The password is not equal to check'
            
        })
        throw new Error('The password is not equal to check')
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
        email:user.email,
        id:user._id,
        name:user.name,
        isAdmin:user.isAdmin
    })
})

router.put('/profile',auth, AsyncHandler(async(req,res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
          user.password = req.body.password
        }
    
        const updatedUser = await user.save()
        console.log(req.body)

        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser._id),
        })
      } else {
        res.status(404)
        throw new Error('User not found')
      }
}))

router.get('/allusers',[auth,admin],AsyncHandler(async (req,res)=>{
    const users = await User.find({});
    res.json(users);
})
)

router.delete('/:id',[auth,admin],AsyncHandler(async (req,res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        user.remove();
        res.json({
            message:'User Removed'
        })
    }else{
        res.status(404).json({
            message:'Not found'
        })
    }
    
})
)


router.get('/',(req,res)=>{
    res.send('hello')
})

module.exports = router;
