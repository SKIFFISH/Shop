import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_RESET,

    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,

} from '../constants/order';
import axios from 'axios';

export const createOrder = (orderData) => async (dispatch,getState) =>{
    try{
        dispatch({type:ORDER_CREATE_REQUEST});

        const {userList: {userInfo}} = getState()

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post('/api/order',orderData,config);

        dispatch({type:ORDER_CREATE_SUCCESS,
                payload:data
        })
    }catch(error){
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}

export const fetchOrderDetail = (id) => async (dispatch,getState) =>{
    try{
        dispatch({type:ORDER_DETAILS_REQUEST});

        const {userList: {userInfo}} = getState()

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/order/${id}`,config);

        dispatch({type:ORDER_DETAILS_SUCCESS,
                payload:data.order
        })
    }catch(error){
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}