
import { Row,Col,Rate,Typography,Divider,List,Button,Alert,Form,Select,Input} from 'antd'
import '../style/Product.scss'
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import React, { useEffect, useState } from 'react'
import { detailAction, productReviewAction } from '../redux/actions/productActions';
import { Spin } from 'antd';
import {PRODUCT_CREATE_REVIEW_RESET} from '../redux/constants/products'



const Product = ({history,match}) => {
    const id = match.params.id;
    const [qty,setQty] = useState(1);
    const dispatch = useDispatch();
    const {product,loading,error} = useSelector(state => state.detailList);
    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState('Good Job');

    const productReview = useSelector(state=> state.reviewList);
    const {loading:reviewLoading,error:reviewErrors,success} = productReview

    const userList = useSelector(state=> state.userList);
    const {userInfo} = userList

    useEffect(() => {
        dispatch(detailAction(id));
        if(success){
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        } 
    },[dispatch,match,success])

    const clickHandler =(e) => {
        e.preventDefault();

        history.push(`/cart/${id}?qty=${qty}`);
    }
    return (
        <>
           <Divider />
           {loading ? <Spin /> : error ? <Alert message = {error} /> :
           (
            <>
            <Row>
            <Col md={4}>
                &nbsp;
            </Col>
            <Col md={6}>
                <Link to='/' style={{color:'black', marginBottom:'2rem',marginTop:'2rem'}}>
                    <div style={{fontSize:'1.6rem'}}>&larr;GO BACK</div>
                </Link>
                <figure>
                    <img src={product.image} width={300}/>
                </figure>
            </Col>
            <Col md={5}>
                <List>
                    <List.Item>
                        <Typography.Title level={4}>
                            {product.name}
                        </Typography.Title>
                    </List.Item>
                    <List.Item>
                        <Rate defaultValue={Number(product.rating)} allowHalf disabled style={{color:'pink'}} />
                        <span>{`from ${product.numReviews} reviews` }</span>
                    </List.Item>
                    <List.Item>
                        <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            Price: ${product.price}
                        </Typography.Text>
                    </List.Item>
                    <List.Item>
                        <Typography.Text >
                            Description: ${product.description}
                        </Typography.Text>
                    </List.Item>
                </List>
            </Col>
            <Col md={5}>
                <div className='card'>
                    <div>
                    <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            Price: ${product.price}
                    </Typography.Text>
                    </div>
                    <div>
                    <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}}>
                            Status: {product.countInStock ? 'In Stock' : 'Out Of Stock'}
                    </Typography.Text>
                    </div>
                    <div className = 'card_selector'>
                        <Typography.Text strong style={{fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}} >
                            Quantity:
                        </Typography.Text>
                        <Select onChange = {(value) => {setQty(value)}}
                        defaultValue={1} style={{width:'50%',textAlign:'center'}}>
                            {
                                [...new Array(product.countInStock).keys()].map(n => (
                                    <option key={n+1}>{n+1}</option>
                                ))
                            }
                        </Select>
                    </div>
                    <Link to='/'>
                    <Button onClick = {clickHandler}
                    disabled={!product.countInStock} className='card_btn'>
                        ADD TO CART
                    </Button>
                    </Link>
                    
                </div>
            </Col>
           </Row>
           <Divider></Divider>
           <Row>
           <Col md={4}>
                &nbsp;
            </Col>
            <Col md={12}>
                <Typography.Title level={5}>
                    Reviews:
                </Typography.Title>
                <List>
                    {reviewLoading ? <Spin /> :
                    (
                        <>
                            {product.reviews.map(r => (
                                <List.Item style={{display:'block'}}>
                                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <Typography.Text strong style={{display:'block',fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}} >
                                        {r.name}
                                    </Typography.Text>
                                    <Typography.Text strong style={{display:'block',fontSize:'1.5rem',fontWeight:'800',letterSpacing:'.2rem'}} >
                                        {r.createdAt.substr(0,10)}
                                    </Typography.Text>
                                    </div>
                                    
                                    <Rate defaultValue={r.rating} allowHalf />
                                    <Typography.Text style={{display:'block',fontSize:'1.2rem',fontWeight:'500',letterSpacing:'.2rem',marginTop:'1rem'}} >
                                        {r.comment}
                                    </Typography.Text>
                                </List.Item>
                            ))}
                        </>
                    )
                    }

                </List>
                <Typography.Title level={5}>
                    Write Your Reviews:
                </Typography.Title>
                { !userInfo ? <Alert type='error' message='Login First' />
                
            :(
                <Form
                wrapperCol={8}
                layout='vertical'
                >
                    <Form.Item
                    label='Rating'
                    name='rating'
                    required
                    colon
                    >
                    <Select onChange={(value) => {setRating(value)}}>
                        {
                            [1,2,3,4,5].map(r => (
                                <Select.Option value={r}>{r}</Select.Option>
                            ))
                        }
                    </Select>
                    </Form.Item>

                    <Form.Item
                    label='Comment'
                    name='comment'
                    required
                    colon
                    >
                   <Input.TextArea style={{height:'10rem'}} onchange={(e)=>{setComment(e.target.value)}}/>
                    </Form.Item>

                    <Form.Item>
                   <Button 
                   style={{color:'white',backgroundColor:'black'}}
                   onClick={() => {dispatch(productReviewAction(id,{rating,comment}))}}>
                       Submit
                   </Button>
                    
                    </Form.Item>
                </Form>
            )}
                
            </Col>
           </Row>
           </>

           )

           }
           
        </>
    )
}

export default Product
