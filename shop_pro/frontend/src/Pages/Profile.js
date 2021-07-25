import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert,Form,Input,Menu,Table} from 'antd'
import '../style/Home.scss'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { Button } from 'antd'
import { LockOutlined, UserOutlined,MailOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import { userDetailAction, userUpdateDetailAction} from '../redux/actions/userAction'
import { myOrdersAction } from '../redux/actions/orderActions'

const Profile = ({history}) => {
    const columns = [
        {
            title:'ID',
            dataIndex:'_id',
            key:'ID',
            render: text => <p onClick={() => {history.push(`/order/${text}`)}}><a>{text}</a></p>
        },
        {
            title:'DATE',
            dataIndex:'createdAt',
            key:'createdTime',
            render: text=> <p>{text.substr(0,10)}</p>
        },
        {
            title:'PRICE',
            dataIndex:'itemPrice',
            key:'Price',
            render:text=> <p>${Number(text) + 10}</p>
        },
        {
            title:'Paid',
            dataIndex:'isPaid',
            key:'isPaid',
            render:text=> <p>{Boolean(text) ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : 
            <CloseCircleTwoTone twoToneColor="#eb2f96" />}</p>
        },
        {
            title:'Delivered',
            dataIndex:'isDelivered',
            key:'isDelivered',
            render:text=> <p>{Boolean(text) ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : 
            <CloseCircleTwoTone twoToneColor="#eb2f96" />}</p>
        }

    ]

    const profileList = useSelector(state => state.profileList);
    const {loading,profile,error} = profileList

    const orderList = useSelector(state => state.orderMyList);
    const {loading:orderLoading,error:orderError,orders} = orderList;

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {

        if(Object.keys(profile).length ===0){
            dispatch(userDetailAction());
        }

        if(orders.length===0){
            dispatch(myOrdersAction());
        }

    },[dispatch])

    const clickHandler = () => {

        const updateData = {
            name,
            email,
            password
        }

        dispatch(userUpdateDetailAction(updateData));
        
    }

    return (
        <>

            <Row style={{marginTop:'4rem'}}>
                <Col md={2}>

                &nbsp;
                </Col>
                <Col md={6}>
                <Typography.Title level={4}>
                        PROFILE
                    </Typography.Title>
                    {error ? <Alert type='error' message={error} />: <></>}
                    {loading ? <Spin /> : (
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
                         >
                             <Input
                             onChange={(e) => {setName(e.target.value)}}
                             placeholder = {profile.name}
                             prefix={<UserOutlined style={{marginRight:'1rem',marginLeft:'-.5rem'}}/>} />
                         </Form.Item>
                         <Form.Item 
                         label= 'Email'
                         name='email'
                        >
                             <Input onChange={(e) => {setEmail(e.target.value)}}
                             placeholder={profile.email}
                             prefix={<MailOutlined style={{marginRight:'1rem',marginLeft:'-.5rem'}}/>} />
                         </Form.Item>

                         <Form.Item 
                         label= 'Password'
                         name='password'
                         >
                             <Input.Password onChange={(e) => {setPassword(e.target.value)}}
                             placeholder=''
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
                            UPDATE
                        </Button>
                        </Form.Item>
                         </Form>

                    )}                   
                </Col>

                <Col md={12} offset={1}>
                    <Typography.Title level={4}>
                        ORDER:
                    </Typography.Title>
                    {orderLoading ? <Spin /> :
                    (
                        <Table columns={columns} dataSource={orders}></Table>
                    )}
                </Col>
            </Row>
           
        </>
    )
}

export default Profile
