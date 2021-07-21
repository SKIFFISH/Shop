const express = require('express');
const {dbConnect} = require('../utils/dbConnect')
const router = express.Router()
const Product = require('../models/ProductModel')
const AsyncHandler = require('express-async-handler');
dbConnect()

router.get('/',AsyncHandler(async (req,res) => {

    const products = await Product.find({})

    res.json({
        success:true,
        products
    })

}))


router.get('/:id',AsyncHandler( async (req,res)=>{
    const product = await Product.findById(req.params.id);

    if(product){
        res.json({
            success:true,
            product
        })
    }else{
        res.status(404).json({
            success:false,
            message:'Not Found'
        })
    }
    
}))

module.exports = router;
