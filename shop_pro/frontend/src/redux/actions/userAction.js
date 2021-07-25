import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,

    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,

    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS,

    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,

    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS
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
    dispatch({type:USER_LOGOUT});
    dispatch({type:USER_LIST_RESET})
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

export const userDetailAction = () => async (dispatch,getState) =>{
    try{
        dispatch({type:USER_DETAILS_REQUEST});

        const {userList:{userInfo}} = getState();

        const config ={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get('/api/user/profile',config);

        dispatch({type:USER_DETAILS_SUCCESS,
                payload:data
        })
    }catch(error){
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}

export const userUpdateDetailAction = (userData) => async (dispatch,getState) =>{
    try{
        console.log(userData);
        dispatch({type:USER_UPDATE_PROFILE_REQUEST});

        const {userList:{userInfo}} = getState();

        const config ={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put('/api/user/profile',userData,config);

        dispatch({type:USER_UPDATE_PROFILE_SUCCESS,
                payload:data
        })
    }catch(error){
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}

export const userListAction = () => async (dispatch,getState) =>{
    try{
        dispatch({type:USER_LIST_REQUEST});

        const {userList:{userInfo}} = getState();

        const config ={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get('/api/user/allusers',config);

        dispatch({type:USER_LIST_SUCCESS,
                payload:data
        })
    }catch(error){
        dispatch({
            type:USER_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}

export const userdeleteAction = (id) => async (dispatch,getState) =>{
    try{
        dispatch({type:USER_DELETE_REQUEST});

        const {userList:{userInfo}} = getState();

        const config ={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(`/api/user/${id}`,config);

        dispatch({type:USER_DELETE_SUCCESS,
                payload:data
        })
    }catch(error){
        dispatch({
            type:USER_DELETE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}