
import { Row,Col,Rate,Typography,Divider,List,Button} from 'antd'
import products from '../data/products'
import '../style/Product.scss'
import {Link} from 'react-router-dom';
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Product = ({match}) => {
    const [product,setProduct] = useState([]);

    const fetchData = async () => {
        const {data} = await axios.get(`/api/product/${match.params.id}`);

        setProduct(data.product)
    }

    useEffect(() => {
        fetchData()
    })
    return (
        <>
           <Divider />
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
                    <Link to='/'>
                    <Button disabled={!product.countInStock} className='card_btn'>
                        ADD TO CART
                    </Button>
                    </Link>
                    
                </div>
            </Col>
           </Row> 
        </>
    )
}

export default Product
