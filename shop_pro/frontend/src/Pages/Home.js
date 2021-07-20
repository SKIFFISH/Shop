import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography} from 'antd'
import '../style/Home.scss'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const {Title,Text} = Typography;

    const [products,setProducts] = useState([]);

    const fetchData = async () => {
        const {data} = await axios.get('/api/products');

        setProducts(data.products)
    }

    useEffect(() => {
        fetchData()
    })
    return (
        <>
            <div className='section-home'>
                <div className='section-home_title'>
                    WelCome to My Shop
                </div>  
                <Row style={{alignItems:'stretch'}}>
                         {   
                            products.map((product,index) => (
                                <Col key={index} md={6} >
                                    <div className='section-home_card'>
                                        <Link to={`/product/${product._id}`}>
                                            <figure className='section-home_card_img'>
                                                <img src={product.image} width={200} />
                                            </figure>
                                        </Link>
                                        <Link to={`/product/${product._id}`}>
                                            <Title level={4} style={{ fontSize:'1.4rem'}} className='section-home_card_title'>
                                                {product.name}
                                            </Title>
                                        </Link>
                                        
                                        <Rate defaultValue={product.rating} allowHalf disabled style={{color:'pink'}} className='section-home_card_rating'/>
                                        <span>{`from ${product.numReviews} reviews` }</span>
                                        <Title level={4} className='section-home_card_price'>${product.price}</Title>
                                    </div>

                                </Col>
                            ))
                        }
                </Row>
                
            </div>
        </>
    )
}

export default Home
