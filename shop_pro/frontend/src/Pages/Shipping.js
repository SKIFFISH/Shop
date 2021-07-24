import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert,Form,Input,Breadcrumb} from 'antd'
import '../style/Home.scss'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { productListAction } from '../redux/actions/productActions'
import { Button } from 'antd'
import { LockOutlined, UserOutlined ,HomeOutlined} from '@ant-design/icons'
import { userLoginAction } from '../redux/actions/userAction'
import { saveShippingAddress } from '../redux/actions/cartAction'
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem'

const Shipping = ({history}) => {

    const cartList = useSelector(state => state.cartList);
    const {shippingAddress} = cartList

    const [road,setRoad] = useState(shippingAddress.road);
    const [city,setCity] = useState(shippingAddress.city);
    const [country,setCountry] = useState(shippingAddress.country);
    const [postCode,setPostCode] = useState(shippingAddress.postCode);

    const dispatch = useDispatch();

    const clickHandler = () =>{
        dispatch(saveShippingAddress({road,city,country,postCode}))
        history.push('/payment')
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
                        
                    </Breadcrumb>
                    <Form name='Ship'
                    colon={true}
                    labelCol={{span:8}}
                    wrapperCol={{span:24}}
                    initialValues={{remember:true}}
                    layout='vertical'
                    >
                    <Form.Item 
                    label= 'Road'
                    name='road'
                    
                    rules={[
                        { required : true , message:'You should input your Road'}
                    ]}>
                        <Input 
                        placeholder={road}
                        onChange={(e) => {setRoad(e.target.value)}}
                        prefix={<HomeOutlined  style={{marginRight:'1rem',marginLeft:'-.5rem'}}/>} />
                    </Form.Item>

                    <Form.Item 
                    label= 'City'
                    name='city'
                    
                    rules={[
                        { required : true , message:'You should input your City'}
                    ]}>
                        <Input 
                        placeholder={city}
                        onChange={(e) => {setCity(e.target.value)}}
                        prefix={<HomeOutlined style={{marginRight:'1rem',marginLeft:'-.5rem'}}/>} />
                    </Form.Item>

                    <Form.Item 
                    label= 'Country'
                    name='country'
                    
                    rules={[
                        { required : true , message:'You should input your Country'}
                    ]}>
                        <Input 
                        placeholder={country}
                        onChange={(e) => {setCountry(e.target.value)}}
                        prefix={<HomeOutlined style={{marginRight:'1rem',marginLeft:'-.5rem'}}/>} />
                    </Form.Item>

                    <Form.Item 
                    label= 'PostCode'
                    name='postcode'
                    
                    rules={[
                        { required : true , message:'You should input your Postcode'}
                    ]}>
                        <Input 
                        placeholder={postCode}
                        onChange={(e) => {setPostCode(e.target.value)}}
                        prefix={<HomeOutlined style={{marginRight:'1rem',marginLeft:'-.5rem'}}/>} />
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

export default Shipping
