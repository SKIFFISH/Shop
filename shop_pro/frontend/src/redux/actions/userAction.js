import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from '../constants/user'
import axios from 'axios';

export const userLoginAction = (userData) => async (dispatch) =>{
    try{
        dispatch({type:USER_LOGIN_REQUEST});

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post('/api/user/login',userData,config);

        dispatch({type:USER_LOGIN_SUCCESS,
                payload:data.user
        })

        localStorage.setItem('userInfo',JSON.stringify(data.user));
    }catch(error){
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}

export const logOut = () => (dispatch) =>{
    localStorage.removeItem('userInfo');
    dispatch({type:USER_LOGOUT})
}

export const userRegistAction = (userData) => async (dispatch) =>{
    try{
        dispatch({type:USER_REGISTER_REQUEST});

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post('/api/user/regist',userData,config);

        dispatch({type:USER_REGISTER_SUCCESS,
                payload:data
        })

        localStorage.setItem('userInfo',JSON.stringify(data));
    }catch(error){
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}