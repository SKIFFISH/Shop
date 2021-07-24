import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert,Select,Breadcrumb} from 'antd'
import '../style/Product.scss'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { List } from 'antd'
import { Button } from 'antd'
import { createOrder, fetchOrderDetail } from '../redux/actions/orderActions'
const OrderPay = ({match}) => {
    const orders = useSelector(state => state.orderDetailList);
    const {order,loading,error} = orders;

    

    const dispatch = useDispatch();

    useEffect(() => {
        if(!order || order._id !== match.params.id) {
            dispatch(fetchOrderDetail(match.params.id))
        }
    },[dispatch,order])

    return (
        <div>
            {loading ? <Spin /> : 
            error ? <Alert type='error' message={error} /> :
            (
                <Row style={{marginTop:'3rem'}}>
            
                <Col md = {6}>
                    &nbsp;
                </Col>
                <Col md = {11}>
                    <Typography.Title level={4}>
                        PAY ORDER: #{order._id}
                    </Typography.Title>

                    <List>
                        <List.Item style={{display:'block'}}>
                        <Typography.Text strong style={{display:'block', fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            SHIPPING ADDRESS :
                        </Typography.Text>
                        <Typography.Text strong style={{display:'block', fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem',marginTop:'1rem'}}>
                            {order.user.name}
                        </Typography.Text>
                        <Typography.Text strong style={{display:'block', fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            {order.user.email}
                        </Typography.Text>
                        <Typography.Text strong style={{display:'block', fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            {order.shippingAddress.road+',' + order.shippingAddress.city+',' + order.shippingAddress.country+','
                            +order.shippingAddress.postCode}
                        </Typography.Text>
                        <Alert 
                        style={{marginTop:'1rem'}}
                        showIcon
                        type={order.isDelivered ? 'success' : 'warning'} 
                        message={order.isDelivered ? 'Delievered' :'Not Delievered'} />
                        </List.Item>

                        <List.Item style={{display:'block'}}>
                        <Typography.Text strong style={{display:'block', fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            PAYMENT METHOD : 
                        </Typography.Text>
                        <Typography.Text strong style={{display:'block', fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            {order.paymentMethod}
                        </Typography.Text>
                        <Alert
                        style={{marginTop:'1rem'}}
                        showIcon
                        type={order.isPaid ? 'success' : 'warning'} 
                        message={order.isDelivered ? 'Paid' :'Not Paid'} />
                        </List.Item>

                        <List.Item style={{
                            display:'block'
                        }}>
                        <Typography.Text strong style={{display:'block', fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            ORDER ITEMS : 
                        </Typography.Text>
                        <List>
                            {order.product.map(item => (
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
                            Total {order.product.reduce((accu,curr) => {
                                return accu + curr.qty
                            },0)} Items
                        </Typography.Text>
                    </div>
                    <div>
                        <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            Shipping: ${order.shippingPrice}
                        </Typography.Text>
                    </div>
                    <div>
                        <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            Item: ${order.itemPrice} 
                        </Typography.Text>
                    </div>
                    <div>
                    <Button 
                        disabled={!order.product.length} className='card_btn'>
                        PAY $({order.itemPrice + order.shippingPrice})
                    </Button>
                    </div>
                    </div>
                </Col>
            </Row>
            )
            }
            
            
        </div>
    )
}

export default OrderPay
