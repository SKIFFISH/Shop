const express = require('express');
const {dbConnect} = require('../utils/dbConnect')
const router = express.Router()
const Product = require('../models/ProductModel')
const AsyncHandler = require('express-async-handler');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin')

dbConnect()

router.get('/',AsyncHandler(async (req,res) => {
    const keyword = req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options:'i'
        }
    } : {};

    const products = await Product.find({...keyword})

    res.json({
        success:true,
        products
    })

}))


router.get('/newProduct',[auth,admin], AsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })
  
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  })
)


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
    const product = await Product.findById(req.params.id);
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



router.put('/:id',[auth,admin], AsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const {name,price,countInStock,description,image,brand,category} = req.body;
    console.log(req.body)
    if(product){
        product.name = name || product.name;
        product.price = price || product.price;
        product.countInStock = countInStock ||product.countInStock;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;    
    }else{
        res.status(404).json({
            message:'Not found'
        })
    }

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  })
);

router.post('/:id/review',[auth], AsyncHandler(async (req, res) => {

    const {rating,comment} = req.body;
    console.log(req.body)

    const product = await Product.findById(req.params.id);
    if(product){
        const reviewed = product.reviews.find(r => r.user.toString() === req.params.id.toString());

        if(reviewed){
            reviewed.rating = Number(rating);
            reviewed.comment = comment;
        }else{
            product.reviews.push({
                name:req.user.name,
                rating:Number(rating),
                comment,
                user:req.user._id
            });

            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((accu,curr) => curr.rating + accu,0) / 
            product.reviews.length;

            await product.save();
            res.status(200).json({
                message:'Add Successfully !'
            })
        }
    }
    else{
        res.status(404).json({
            message:'Not found'
        })
    }
  })
);

module.exports = router;
