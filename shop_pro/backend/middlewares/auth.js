const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const AsyncHandler = require('express-async-handler')
const {secretKey} = require('../utils/generateToken')

const auth = AsyncHandler(async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            
            token = req.headers.authorization.split(' ')[1]
            

            const decoded =  jwt.verify(token,secretKey);

            req.user = await User.findById(decoded.id).select('-password -passwordCheck')

            next()
        }catch(error){
            res.status(401).json({
                success:false,
                message:'Wrong token'
            })
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = auth