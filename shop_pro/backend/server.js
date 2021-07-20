const express = require('express');
const products = require('./data/products');
const dotenv = require('dotenv');

dotenv.config()

const app = express();

app.get('/api/products',(req,res) => {
    res.json({
        success:true,
        products
    })
})

app.get('/api/product/:id',(req,res)=>{
    const product = products.find(p => p._id === req.params.id);
    res.json({
        success:true,
        product
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,(() => {
    console.info(`Suceessfully connect the port ${PORT}`)
}))