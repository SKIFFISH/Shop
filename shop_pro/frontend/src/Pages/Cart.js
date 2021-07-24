import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert,Select} from 'antd'
import '../style/Product.scss'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { productListAction } from '../redux/actions/productActions'
import { addToCartAction, deleteFromCart } from '../redux/actions/cartAction'
import { List } from 'antd'
import { Button } from 'antd'
import {DeleteOutlined} from '@ant-design/icons'

const Cart = ({match,location,history}) => {

    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cartList);

    const {cartItems} = cart; 


    useEffect(() =>{
        if(productId){
            dispatch(addToCartAction(productId,qty));
        }
    },dispatch,productId,qty)

    return (
        <>
            <Row>
                <Col md={4}>
                    &nbsp;
                </Col>
                <Col md = {12}>
                    <Typography.Title>
                        Your Cart
                    </Typography.Title>
                    {
                        cartItems.length === 0 ? <Alert message='Your cart is Empty' type='info' /> :
                        (
                            <List>
                                {
                                    cartItems.map(item => (
                                    <List.Item key={item.product}>
                                        <figure>
                                            <img src={item.image} width={70} />
                                        </figure>
                                        <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                                            {item.name}
                                        </Typography.Text>
                                        <div style={{
                                            display:'flex',
                                            justifyContent:'space-around'
                                        }}>
                                        <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                                            ${item.price}
                                        </Typography.Text>
                                        <Select 
                                        onChange={(value) => {
                                            dispatch(addToCartAction(item.product,Number(value)))
                                        }}
                                        defaultValue={item.qty} style={{width:'25%'}}>
                                            {
                                                [...new Array(item.countInStock).keys()].map(n => (
                                                    <option key={n+1} >{n+1}</option>
                                                ))
                                            }
                                        </Select>
                                        <Button style={{display:'flex',alignItems:'center',backgroundColor:'white'}}
                                        onClick = {() => dispatch(deleteFromCart(item.product))}
                                        >
                                            <DeleteOutlined style={{marginRight:'.7rem',color:'red',alignSelf:'center'}}/>
                                        </Button>
                                        </div>
                                        
                                    </List.Item>
                                    ))
                                }
                                
                            </List>
                        )
                    }
                </Col>
                <Col md={6} offset={1} >
                    <div className='card'>
                    <div>
                        <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            Total {cartItems.reduce((accu,curr) => {
                                return accu + curr.qty
                            },0)} Items
                        </Typography.Text>
                    </div>
                    <div>
                        <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            Total ${cartItems.reduce((accu,curr) => {
                                return accu + (curr.qty*curr.price)
                            },0).toFixed(2)} 
                        </Typography.Text>
                    </div>
                    <div>
                    <Button 
                    onClick = {()=>{history.push('/shipping')}}
                        disabled={!cartItems.length} className='card_btn'>
                        PROCESS TO CHECKOUT
                    </Button>
                    </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Cart
