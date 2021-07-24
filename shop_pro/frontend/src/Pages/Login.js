import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert,Form,Input} from 'antd'
import '../style/Home.scss'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { productListAction } from '../redux/actions/productActions'
import { Button } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { userLoginAction } from '../redux/actions/userAction'

const Login = ({history}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userList);
    const {loading,userInfo,error}  = userLogin

    const clickHandler = () =>{
        dispatch(userLoginAction({email,password}))
    }

    useEffect(() => {
        if(userInfo){
            history.push('/');
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
                        SIGN IN
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
                            Sign In
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type='link' htmlType='button'>
                        <Link to='/regist'>New User? Regist  </Link>  
                        </Button> 
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default Login
