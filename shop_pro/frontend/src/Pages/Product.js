
import { Row,Col,Rate,Typography,Divider,List,Button,Alert} from 'antd'
import '../style/Product.scss'
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import React, { useEffect, useState } from 'react'
import { detailAction } from '../redux/actions/productActions';
import { Spin } from 'antd';
import { Select } from 'antd';



const Product = ({history,match}) => {
    const id = match.params.id;
    const [qty,setQty] = useState(1);
    const dispatch = useDispatch();
    const {product,loading,error} = useSelector(state => state.detailList);

    useEffect(() => {
        dispatch(detailAction(id));  
    },[dispatch,match])

    const clickHandler =(e) => {
        e.preventDefault();

        history.push(`/cart/${id}?qty=${qty}`);
    }
    return (
        <>
           <Divider />
           {loading ? <Spin /> : error ? <Alert message = {error} /> :
           (
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
           )
           }
           
        </>
    )
}

export default Product
