const express = require('express');
const {dbConnect} = require('../utils/dbConnect')
const router = express.Router()
const Product = require('../models/ProductModel')
const AsyncHandler = require('express-async-handler');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin')

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

router.delete('/:id',[auth,admin],AsyncHandler(async (req,res)=>{
    const product = await User.findById(req.params.id);
    if(product){
        product.remove();
        res.json({
            message:'Product Removed'
        })
    }else{
        res.status(404).json({
            message:'Not found'
        })
    }
    
})
)

module.exports = router;
