const express = require('express');
const products = require('./data/products');
const dotenv = require('dotenv');
const {dbConnect} = require('./utils/dbConnect')
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRouter')

dotenv.config()

const app = express();

dbConnect()


app.use(express.json())
app.use('/api/product',productRoute);
app.use('/api/user',userRoute)

app.use((err,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message:err.message,
    })
    next()
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,(() => {
    console.info(`Suceessfully connect the port ${PORT}`)
}))