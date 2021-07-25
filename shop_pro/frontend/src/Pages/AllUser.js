import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert,Form,Input} from 'antd'
import '../style/Home.scss'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { CheckCircleTwoTone,CloseCircleTwoTone } from '@ant-design/icons'
import { userdeleteAction, userListAction} from '../redux/actions/userAction'
import { Space } from 'antd'
import { Table } from 'antd'

const AllUser = () => {
    const columns = [
        {
            title:'ID',
            dataIndex:'_id',
            key:'ID',
            render: text => <p><a>{text}</a></p>
        },
        {
            title:'NAME',
            dataIndex:'name',
            key:'NAME',
        },
        {
            title:'EMAIL',
            dataIndex:'email',
            key:'email',
        },
        {
            title:'ADMIN',
            dataIndex:'isAdmin',
            key:'isPaid',
            render:text=> <p>{Boolean(text) ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : 
            <CloseCircleTwoTone twoToneColor="#eb2f96" />}</p>
        },
        {
            title:'ACTION',
            key:'action',
            render:(text,record)=>(
                    <Space size='middle'>
                    <a>Detail</a>
                    <a onClick={async (e) => {
                        e.preventDefault();
                        if(window.confirm('Are you sure?')){
                            await dispatch(userdeleteAction(record._id));
                            dispatch(userListAction());
                        }
                        
                    }}>Delete</a>
                </Space>
                
            )
        }

    ];

    const userList = useSelector(state=>state.allUserList);
    const {loading,users,error} = userList;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userListAction());
    },[dispatch])
    return (
        <Row>
            <Col md={4}>
            &nbsp;
            </Col>
            <Col md={16}>
                {loading? <Spin /> :
                <Table columns={columns} dataSource ={users} />
                }
                
            </Col>
        </Row>
        
    )
}

export default AllUser
