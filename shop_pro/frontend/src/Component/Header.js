import React ,{useState}from 'react';
import '../style/Header.scss'
import {ShoppingCartOutlined, UserOutlined,DownOutlined,SearchOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {Avatar,Menu,Dropdown,Button} from 'antd'
import {useSelector,useDispatch} from 'react-redux';
import { logOut } from '../redux/actions/userAction';
import {useHistory} from 'react-router-dom'

const Header = () => {

    const dispatch = useDispatch()
    const history = useHistory();
    const [keyword,setKeyWord] = useState('');
    const [show,setShow] = useState(false);
    const [searchData,setSearchData] = useState([]);
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
    const clickHandler = () => {
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }

    const debounce = (f,time) => {
        let timer;
        return function(){
            let cxt = this
            if(timer){
                console.log('clear')
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                f()
            },time)
        }
    }

    


    const keyUpHandler = () => {
        let script = document.createElement('script');
        script.type = 'text/javascript';

        script.src = `http://suggestqueries.google.com/complete/search?client=youtube&q=${keyword}&jsonp=window.google.ac.h`;

        document.body.appendChild(script)

        window.google = {
            ac:{
                h: function(json){
                console.log(json);
                if(json[1].length > 0){
                    setSearchData(json[1])
                }
            }
            }
        }

        setShow(true)
    }

    let keyUpHandlerAfterDebounce = debounce(keyUpHandler,1000);

    return (

        <>
            <div className='header'>
                <Link to='/' style={{color:'white'}}>
                    <div className='header-brand'>Cris Shop</div>
                </Link>
                <div>
                <input style={{fontSize:'1rem',width:'25rem', padding:'.5rem 1rem',
                borderRadius:'.8rem',outline:'none',backgroundColor:'gray'}}
                type='text' 
                onChange={(e) => {setKeyWord(e.target.value)}}
                onKeyUp={keyUpHandlerAfterDebounce}
                value={keyword}
                onBlur={() => {setShow(false)}}
                placeholder='Search your shopping here'/>
                <SearchOutlined style={{
                    position:'relative',
                    top:'.4rem',
                    cursor:'pointer',
                    right:'4rem',
                    backgroundColor:'transparent',
                    outline:'none',
                    border:'none',
                    color:'white'
                }} 
                onClick={clickHandler}
                />
               {
                   show ? (
                       <ul style={{
                           padding:'1rem',
                           listStyle:'none',
                           position:'absolute',
                           color:'black',
                           fontSize:'1rem',
                           backgroundColor:'white',
                           zIndex:'3'
                       }}
                       onClick={(e) => {console.log(e.target.value)}}
                       >
                           {searchData.map(s => (
                               <li style={{
                                cursor:'pointer',
                                padding:'.5rem 1rem'
                               }}
                               key={Math.random()}
                               
                               >{s[0]}</li>
                           ))}
                       </ul>
                   ) : <></>
               }
                </div>
                
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
