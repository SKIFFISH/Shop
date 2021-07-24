import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert,Form,Input,Breadcrumb,Radio,Space} from 'antd'
import '../style/Home.scss'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { productListAction } from '../redux/actions/productActions'
import { Button } from 'antd'
import { LockOutlined, UserOutlined ,HomeOutlined} from '@ant-design/icons'
import { userLoginAction } from '../redux/actions/userAction'
import { savePaymentAddress, saveShippingAddress } from '../redux/actions/cartAction'
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem'

const Payment = ({history}) => {

    const cartList = useSelector(state => state.cartList);
    const {shippingAddress} = cartList

    if(!shippingAddress){
        history.push('/')
    }

    const [payment,setPayment] = useState('PayPal');

    const dispatch = useDispatch();

    const clickHandler = () =>{
        dispatch(savePaymentAddress(payment))
        history.push('/order')
    }

    

    return (
        <>
            <Row style={{marginTop:'3rem'}}>
                <Col md = {6}>
                    &nbsp;
                </Col>
                <Col md = {8}>
                    <Typography.Title level={4}>
                        Shipping
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
                        
                    </Breadcrumb>
                    <Form name='Ship'
                    colon={true}
                    labelCol={{span:8}}
                    wrapperCol={{span:24}}
                    initialValues={{remember:true}}
                    layout='vertical'
                    >
                    <Form.Item 
                    label= 'Payment'
                    name='payment'
                    
                    rules={[
                        { required : true , message:'You should choose your Payment'}
                    ]}>
                        <Radio.Group value={payment} onChange={(e) => setPayment(e.target.value)}>
                            <Space direction="vertical">
                            <Radio value='Card'>Card</Radio>
                            <Radio value='Paypal'>Paypal</Radio>
                            <Radio value='AliPay'>AliPay</Radio>
                            
                        </Space>
                        </Radio.Group>
                    </Form.Item>
                    
                    
                    <Form.Item style={{alignItems:'center'}}>
                        <Button type='button' 
                        onClick = {clickHandler}
                        style={{
                            alignSelf:'center',
                            width:'200%',
                            textAlign:'center',
                            backgroundColor:'black',
                            color:'white'
                        }}>
                            CONTINUE
                        </Button>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Payment
