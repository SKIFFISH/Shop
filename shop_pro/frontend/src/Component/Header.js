import React from 'react';
import '../style/Header.scss'
import {ShoppingCartOutlined, UserOutlined,DownOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {Avatar,Menu,Dropdown} from 'antd'
import {useSelector,useDispatch} from 'react-redux';
import { logOut } from '../redux/actions/userAction';

const Header = () => {

    const dispatch = useDispatch()

    const menu = (
        <Menu style={{marginTop:'1rem'}}>
          <Menu.Item>
            <Link to='/profile'>
                Profile
            </Link>
          </Menu.Item>
          <Menu.Item >
            <p onClick={() => {dispatch(logOut())}}>Log out</p>
          </Menu.Item>
        </Menu>
      );

      const menuAdmin = (
        <Menu style={{marginTop:'1rem'}}>
            <Menu.Item>
            <Link to='/allusers'>
                UserList
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/allproducts'>
                ProductList
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/profile'>
                Profile
            </Link>
          </Menu.Item>
          <Menu.Item >
            <p onClick={() => {dispatch(logOut())}}>Log out</p>
          </Menu.Item>
        </Menu>
      );
    
    

    const userLogin = useSelector(state => state.userList);
    const {userInfo}  = userLogin 
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
                    {
                        userInfo ? userInfo.isAdmin ? (
                            <div>
                            <Avatar 
                            size='middle'
                            style={{backgroundColor:'orange' }}
                            gap={4}>
                                <p style={{marginRight:'1.5rem'}}>{userInfo.name[0]}</p>
                            </Avatar>
                            <Dropdown overlay={menuAdmin}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <DownOutlined />
                                </a>
                            </Dropdown>
                        </div>
                        ) :
                        (
                            <div>
                                <Avatar 
                                size='middle'
                                style={{backgroundColor:'orange' }}
                                gap={4}>
                                    <p style={{marginRight:'1.5rem'}}>{userInfo.name[0]}</p>
                                </Avatar>
                                <Dropdown overlay={menu}>
                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <DownOutlined />
                                    </a>
                                </Dropdown>
                            </div>
                        )
                            : 
                            (
                                <>
                                    <Link to='/login'>
                                    <div className='header-user' style={{color:'white'}}>
                                        <UserOutlined className='header-icon'/>
                                        <p className='header-text'>Login</p>
                                    </div>
                                </Link>
                                </>
                            )
                        
                    }
                    
                    
                    
                </div>
            </div>
        </>
    )
}

export default Header
