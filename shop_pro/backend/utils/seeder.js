const products = require('../data/products')
const {dbConnect} = require('../utils/dbConnect')
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');
const Order = require('../models/OrderModel')
const mongoose = require('mongoose');
const users = require('../data/users');

dbConnect()

console.log('Insert start');
const importData = async () => {
  try {
    await User.deleteMany()
    await Order.deleteMany()
    await Product.deleteMany()

    const adminUser = await User.insertMany(users);

    const user = adminUser[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: user }
    })

    console.log(sampleProducts)

    await Product.insertMany(sampleProducts)
    console.log('Insert Successfully');
    process.exit()
  } catch (error) {
    console.error(error.message)
  }
}

//GET PROFILE GET api/user/profile



const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()


    process.exit()
  } catch (error) {
    process.exit(1)
  }
}

importData()