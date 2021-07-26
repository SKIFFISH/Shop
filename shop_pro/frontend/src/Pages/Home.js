import React, { useEffect, useState } from 'react'
import { Row,Col,Rate,Typography,Spin,Alert,Carousel,Image} from 'antd'
import '../style/Home.scss'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { productListAction } from '../redux/actions/productActions'
import {Helmet} from 'react-helmet'

const Home = ({match}) => {
    const {Title,Text} = Typography;

    const dispatch = useDispatch();

    const keyword = match.params.keyword ? match.params.keyword : '';

    const productsList = useSelector(state => state.productList);

    const {products,loading,error} = productsList;

    useEffect(() => {
        dispatch(productListAction(keyword))
    },[dispatch,keyword])
    return (
        <>
        <Helmet>
            <title>Welcomet to my Shop</title>
            <meta name='description' content='This is just an exercise for CRIS' />
            <meta name='author' content='According to the Pro Shop' />
        </Helmet>
            <div className='section-home'>
                {
                    match.params.keyword ? <></> :
                    (
                        <Carousel autoplay>
                            <div>
                            <h3 style={{height: '36rem',
                                color: '#fff',
                                lineHeight: '160px',
                                textAlign: 'center',
                                backgroundImage:`url('https://res.vmallres.com/pimages//pages/picImages/39607142272614170693.png')`,
                                backgroundPosition:'cover'
                             }}></h3>
                            </div>
                            <div>
                            <h3 style={{height: '36rem',
                                color: '#fff',
                                lineHeight: '160px',
                                textAlign: 'center',
                                backgroundImage:`url('https://res.vmallres.com/pimages//pages/picImages/92192062272616029129.jpg')`,
                                backgroundPosition:'cover'
                             }}>2</h3>
                            </div>
                            <div>
                            <h3 style={{height: '36rem',
                                color: '#fff',
                                lineHeight: '160px',
                                textAlign: 'center',
                                backgroundImage:`url('https://res.vmallres.com/pimages//pages/picImages/44448932272613984444.jpg')`,
                                backgroundSize:'cover'
                             }}>3</h3>
                            </div>
                            <div>
                            <h3 style={{height: '36rem',
                                color: '#fff',
                                lineHeight: '160px',
                                textAlign: 'center',
                                backgroundImage:`url('https://res.vmallres.com/pimages//pages/picImages/16729332962613392761.jpg')`,
                                backgroundPosition:'cover'
                             }}>4</h3>
                            </div>
                        </Carousel>
                    )
                }
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
