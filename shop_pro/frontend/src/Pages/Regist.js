import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert,Form,Input} from 'antd'
import '../style/Home.scss'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { productListAction } from '../redux/actions/productActions'
import { Button } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { userLoginAction, userRegistAction } from '../redux/actions/userAction'

const Regist = ({history}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const dispatch = useDispatch();

    const userRegist = useSelector(state => state.registList);
    const {loading,userInfo,error}  = userRegist

    const clickHandler = ({history,location}) =>{
        dispatch(userRegistAction({email,password,name,passwordCheck}))
    }

    useEffect(() => {
        if(userInfo){
            history.push('/')
        }
    })

    return (
        <>
            <Row style={{marginTop:'3rem'}}>
                <Col md = {6}>
                    &nbsp;
                </Col>
                <Col md = {8}>
                    <Typography.Title level={4}>
                        SIGN UP
                    </Typography.Title>
                    {error ? <Alert type='error' message={error} />: <></>}
                    {loading ? <Spin /> : <></>}
                    <Form name='Login'
                    colon={true}
                    labelCol={{span:8}}
                    wrapperCol={{span:24}}
                    initialValues={{remember:true}}
                    layout='vertical'
                    >
                    <Form.Item 
                    label= 'Name'
                    name='name'
                    rules={[
                        { required : true , message:'You should input your UserNAME'}
                    ]}>
                        <Input onChange={(e) => {setName(e.target.value)}}
                        prefix={<UserOutlined style={{marginRight:'1rem',marginLeft:'-.5rem'}}/>} />
                    </Form.Item>
                    <Form.Item 
                    label= 'Email'
                    name='email'
                    rules={[
                        { required : true , message:'You should input your email address'}
                    ]}>
                        <Input onChange={(e) => {setEmail(e.target.value)}}
                        prefix={<UserOutlined style={{marginRight:'1rem',marginLeft:'-.5rem'}}/>} />
                    </Form.Item>
                    
                    <Form.Item 
                  
                    label= 'Password'
                    name='password'
                    rules={[
                        { required : true , message:'You should input your password',
                    }
                    ]}>
                        <Input.Password onChange={(e) => {setPassword(e.target.value)}}
                        prefix={<LockOutlined style={{marginRight:'1rem',marginLeft:'-.5rem'}}/>} />
                    </Form.Item>

                    <Form.Item 
                  
                    label= 'PasswordCheck'
                    name='passwordcheck'
                    rules={[
                        { required : true , message:'You should input your password',
                    }
                    ]}>
                        <Input.Password onChange={(e) => {setPasswordCheck(e.target.value)}}
                        prefix={<LockOutlined style={{marginRight:'1rem',marginLeft:'-.5rem'}}/>} />
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
                            Sign Up
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type='link' htmlType='button'>
                        <Link to='/login'>Old User? Login  </Link>  
                        </Button> 
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Regist
