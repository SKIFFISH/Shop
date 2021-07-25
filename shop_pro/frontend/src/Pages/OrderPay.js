import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert,Select,Breadcrumb} from 'antd'
import '../style/Product.scss'
import {Link} from 'react-router-dom'
import {PayPalButton} from 'react-paypal-button-v2'
import {useDispatch,useSelector} from 'react-redux'
import { List } from 'antd'
import { Button } from 'antd'
import { ORDER_PAY_RESET } from '../redux/constants/order'
import { createOrder, fetchOrderDetail, OrderPayAction } from '../redux/actions/orderActions'
const OrderPay = ({match}) => {
    const id = match.params.id;
    const orders = useSelector(state => state.orderDetailList);
    const {order,loading,error} = orders;
    let APIKEYS = 'AY82eHkQm_PMLx7HnIys8UGp7aWXorBuATssEj5GEKAUOjKg4ImxlBetCERx1TEgc9_lVt0MiZYIDR2y'
    
    const [sdk,setSdk] = useState(false);

    const dispatch = useDispatch();

    const orderPay = useSelector(state => state.payresultList)
    const {loading:payLoading,success} = orderPay

    useEffect(() => {

        const addPayPalScript = () => {
            const script = document.createElement('script');
            script.type ='text/javascript';

            script.src = `https://www.paypal.com/sdk/js?client-id=${APIKEYS}`;

            script.async = true;

            script.onload = () => {
                setSdk(true);
            }

            document.body.appendChild(script);
        }

        if((Object.keys(order).length === 0)|| success || order._id !==id){
            dispatch({type:ORDER_PAY_RESET});
            dispatch(fetchOrderDetail(match.params.id))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript();
            }else{
                setSdk(true)
            }
        }

    },[dispatch,order,success])

    const SuccessHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(OrderPayAction(order._id,paymentResult))
    }

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
                        message={order.isPaid ? 'Paid' :'Not Paid'} />
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
                <div className='card' style={order.isPaid ? {height:'15rem'} : {height:'35rem'}}>
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
                    {
                        !order.isPaid && (
                            <div >
                                {
                                    payLoading ? <Spin /> : (
                                        <PayPalButton amount ={order.itemPrice + order.shippingPrice} 
                                        onSuccess = {SuccessHandler}/>
                                        
                                    )
                                }
                            </div>
                        )
                    }
                    
                    </div>
                </Col>
            </Row>
            )
            }
            
            
        </div>
    )
}

export default OrderPay
