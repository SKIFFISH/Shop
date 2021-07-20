import React from 'react';
import '../style/Header.scss'
import {ShoppingCartOutlined, UserOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div className='header'>
                <Link to='/' style={{color:'white'}}>
                    <div className='header-brand'>Cris Shop</div>
                </Link>
                
                <div className='header-btn'>
                    <Link to='/cart' style={{color:'white'}}>
                    <div className='header-cart'>
                        <ShoppingCartOutlined className='header-icon'/>
                        <p className='header-text'>Cart</p>
                    </div>
                    </Link>
                    <Link to='/user'>
                    <div className='header-user' style={{color:'white'}}>
                        <UserOutlined className='header-icon'/>
                        <p className='header-text'>Login</p>
                    </div>
                    </Link>
                    
                </div>
            </div>
        </>
    )
}

export default Header
