import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert} from 'antd'
import '../style/Home.scss'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { productListAction } from '../redux/actions/productActions'

const Home = () => {
    const {Title,Text} = Typography;

    const dispatch = useDispatch();

    const productsList = useSelector(state => state.productList);

    const {products,loading,error} = productsList;

    useEffect(() => {
        console.log(1)
        dispatch(productListAction())
    },[dispatch])
    return (
        <>
            <div className='section-home'>
                <div className='section-home_title'>
                    WelCome to My Shop
                </div>
                {loading ? <Spin /> : 
                error ? <Alert message={error}/> :
                (
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
            )}  
               
                
            </div>
        </>
    )
}

export default Home
