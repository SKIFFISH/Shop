import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert,Select,Breadcrumb} from 'antd'
import '../style/Product.scss'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { List } from 'antd'
import { Button } from 'antd'
import { createOrder } from '../redux/actions/orderActions'
const Order = ({history}) => {
    const cartList = useSelector(state => state.cartList);
    const {shippingAddress,paymentMethod,cartItems} = cartList

    let shippingPrice;
    let itemPrice;

    if(cartItems.length > 0){
        shippingPrice = 10;
        itemPrice = Number(cartItems.reduce((accu,curr) => {
            return accu + (curr.qty*curr.price)
        },0).toFixed(2))
    }

    const dispatch = useDispatch();
    const orderCreate = useSelector(state => state.orderList);

    const {success,order,error} = orderCreate;

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        };
    },[dispatch,order])

    const clickHandler = () => {
        dispatch(createOrder({shippingAddress,shippingPrice,paymentMethod,
            product:cartItems, itemPrice
        }))


    }

    return (
        <div>
            <Row style={{marginTop:'3rem'}}>
            
                <Col md = {6}>
                    &nbsp;
                </Col>
                <Col md = {11}>
                    <Typography.Title level={4}>
                        ORDER
                    </Typography.Title>
                    <Breadcrumb style={{marginBottom:'1rem'}}>
                    <Breadcrumb.Item >
                        <Link to='/shipping' >
                            <a>Shipping</a>
                        </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item >
                        <Link to='/payment' >
                            <a>Payment</a>
                        </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item >
                        <Link to='/order' >
                            <a>Order</a>
                        </Link>
                    </Breadcrumb.Item>
                    </Breadcrumb>

                    <List>
                        <List.Item>
                        <Typography.Text strong style={{display:'block', fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            SHIPPING ADDRESS :
                        </Typography.Text>
                        <Typography.Text strong style={{display:'block', fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            {shippingAddress.road+',' + shippingAddress.city+',' + shippingAddress.country+','
                            +shippingAddress.postCode}
                        </Typography.Text>
                        
                        </List.Item>

                        <List.Item>
                        <Typography.Text strong style={{display:'block', fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            PAYMENT METHOD : 
                        </Typography.Text>
                        <Typography.Text strong style={{display:'block', fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            {paymentMethod}
                        </Typography.Text>
                        
                        </List.Item>

                        <List.Item style={{
                            display:'block'
                        }}>
                        <Typography.Text strong style={{display:'block', fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            ORDER ITEMS : 
                        </Typography.Text>
                        <List>
                            {cartItems.map(item => (
                                <List.Item>
                                    <figure>
                                        <img src={item.image} width={70} />
                                    </figure>
                                    <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                                            {item.name}
                                    </Typography.Text>

                                    <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                                           ${item.price} * {item.qty} 
                                    </Typography.Text>
                                </List.Item>
                            ))}
                        </List>
                        </List.Item>
                    </List>
                </Col>
                <Col md={5} offset={1}>
                <div className='card' style={{height:'25rem'}}>
                    <div>
                        <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            Total {cartItems.reduce((accu,curr) => {
                                return accu + curr.qty
                            },0)} Items
                        </Typography.Text>
                    </div>
                    <div>
                        <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            Shipping: ${shippingPrice}
                        </Typography.Text>
                    </div>
                    <div>
                        <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            Item: ${itemPrice} 
                        </Typography.Text>
                    </div>
                    <div>
                    <Button onClick = {clickHandler}
                        disabled={!cartItems.length} className='card_btn'>
                        PAY $({itemPrice + shippingPrice})
                    </Button>
                    </div>
                    </div>
                </Col>
            </Row>
            
        </div>
    )
}

export default Order
