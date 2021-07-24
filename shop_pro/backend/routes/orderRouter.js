const express = require('express');
const {dbConnect} = require('../utils/dbConnect')
const router = express.Router()
const AsyncHandler = require('express-async-handler');
const auth = require('../middlewares/auth');
const Order = require('../models/OrderModel')

dbConnect()

//get /api/order/:id
router.post('/',auth,AsyncHandler(async(req,res) =>{
        const {shippingAddress,paymentMethod,itemPrice,shippingPrice,product} = req.body
        console.log(product)

        const order = new Order({
            product,
            shippingPrice,
            shippingAddress,
            paymentMethod,
            itemPrice,
            user:req.user._id
        })

        const createdOrder = await order.save();

        res.status(200).json(createdOrder);
} ))


router.get('/:id',auth,AsyncHandler(async(req,res) =>{
    
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(order){
        res.status(200).json({
            order
        })
    };
} ))

router.put('/:id/pay',auth,AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }
  
      const updatedOrder = await order.save()
  
      res.status(200).json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
)


module.exports = router;
