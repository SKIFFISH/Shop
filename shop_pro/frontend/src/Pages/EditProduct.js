import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert,Form,Input} from 'antd'
import '../style/Home.scss'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { detailAction, updateProductAction } from '../redux/actions/productActions'
import { Button } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { userLoginAction, userRegistAction } from '../redux/actions/userAction'

const EditProduct = ({match,history}) => {

    const productId = match.params.id;

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.detailList);
    const {loading,product,error}  = productDetail

    const updateList = useSelector(state => state.updateProductList);
    const {loading:updateLoading}  = updateList

    const clickHandler = () =>{
        const data = {
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }

        dispatch(updateProductAction(productId,data));
        setTimeout(() => {
            history.push('/');
        },0)
    }

    useEffect(() => {
        dispatch(detailAction(productId));
    },[dispatch])

    return (
        <>
            {updateLoading ? <Spin /> : (
                <Row style={{marginTop:'3rem'}}>
                <Col md = {6}>
                    &nbsp;
                </Col>
                <Col md = {8}>
                    <Typography.Title level={4}>
                        EDIT PRODUCT
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
                    
                    >
                        <Input placeholder={product.name}
                        onChange={(e) => {setName(e.target.value)}}
                         />
                    </Form.Item>
                    <Form.Item 
                    label= 'Price'
                    name='price'
                   >
                        <Input placeholder={product.price}
                        onChange={(e) => {setPrice(e.target.value)}}
                       />
                    </Form.Item>

                    <Form.Item 
                    label= 'Brand'
                    name='brand'
                    >
                        <Input placeholder={product.brand}
                        onChange={(e) => {setBrand(e.target.value)}}
                       />
                    </Form.Item>
                    
                    <Form.Item 
                    label= 'Category'
                    name='category'
                    >
                        <Input placeholder={product.category}
                        onChange={(e) => {setCategory(e.target.value)}}
                       />
                    </Form.Item>
                    
                    <Form.Item 
                    label= 'Image'
                    name='image'
                    >
                        <Input placeholder={product.image}
                        onChange={(e) => {setImage(e.target.value)}}
                       />
                    </Form.Item>

                    <Form.Item 
                    label= 'CountInStock'
                    name='CountInStock'
                    >
                        <Input placeholder={product.countInStock}
                        onChange={(e) => {setCountInStock(e.target.value)}}
                       />
                    </Form.Item>

                    <Form.Item 
                    label= 'Description'
                    name='description'
                    >
                        <Input.TextArea placeholder={product.description}
                        onChange={(e) => {setDescription(e.target.value)}}
                       />
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
                            Update
                        </Button>
                    </Form.Item>
                    
                    </Form>
                </Col>
            </Row>
            )}
            
        </>
    )
}

export default EditProduct
