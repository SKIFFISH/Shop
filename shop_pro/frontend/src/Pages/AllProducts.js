import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert,Form,Input} from 'antd'
import '../style/Home.scss'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { CheckCircleTwoTone,CloseCircleTwoTone,PlusCircleOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { Table } from 'antd'
import { createProductAction, productdeleteAction, productListAction } from '../redux/actions/productActions'
import { Button } from 'antd'
import { PRODUCT_CREATE_RESET } from '../redux/constants/products'

const AllProducts = ({history}) => {
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
            title:'PRICE',
            dataIndex:'price',
            key:'price',
            render: text => <p>${text}</p>
        },
        {
            title:'CATEGORY',
            dataIndex:'category',
            key:'category',
        },
        {
            title:'BRAND',
            dataIndex:'brand',
            key:'brand',
        },
        {
            title:'ACTION',
            key:'action',
            render:(text,record)=>(
                    <Space size='middle'>
                    <Link to={`/admin/product/${record._id}/edit`}><a>Edit</a></Link>
                    <a onClick={async (e) => {
                        e.preventDefault();
                        if(window.confirm('Are you sure?')){
                            await dispatch(productdeleteAction(record._id))
                            dispatch(productListAction());
                        }
                        
                    }}>Delete</a>
                </Space>
                
            )
        }

    ];

    const productList = useSelector(state=>state.productList);
    const {loading,products,error} = productList;
    
    const createList = useSelector(state => state.createProductList);
    const {loading:createLoading,product} = createList
    const dispatch = useDispatch()

    useEffect(() => {
        

        if(product){
            dispatch({type:PRODUCT_CREATE_RESET})
            history.push(`admin/product/${product._id}/edit`);
        }

        dispatch(productListAction(''));
    },[dispatch,createLoading])

    const addProduct = async () =>{
        await dispatch(createProductAction());
  
    }
    return (
        
        <Row>
            <Col md={4}>
            &nbsp;
            </Col>
            <Col md={16}>
                <Typography.Title>
                    Products
                </Typography.Title>
                <PlusCircleOutlined style={{position:'relative',left:'2rem',zIndex:'2',color:'white',cursor:'pointer'}}/>
                <Button 
                onClick = {addProduct}
                style={{backgroundColor:'black',color:'white',marginBottom:'2rem'}}>Add Products</Button>
                {loading? <Spin /> :
                <Table columns={columns} dataSource ={products} />
                }
                
            </Col>
        </Row>
        
    )
}

export default AllProducts
