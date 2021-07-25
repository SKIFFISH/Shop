import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_RESET,

    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,

    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS,

    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_RESET

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

export const OrderPayAction = (id,paymentResult) => async (dispatch,getState) =>{
    try{
        dispatch({type:ORDER_PAY_REQUEST});

        const {userList: {userInfo}} = getState()

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/order/${id}/pay`,paymentResult,config);

        dispatch({type:ORDER_PAY_SUCCESS,
                payload:data.order
        })
    }catch(error){
        dispatch({
            type:ORDER_PAY_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}

export const myOrdersAction = () => async (dispatch,getState) =>{
    try{
        dispatch({type:ORDER_LIST_MY_REQUEST});

        const {userList: {userInfo}} = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/order/myorders`,config);

        dispatch({type:ORDER_LIST_MY_SUCCESS,
                payload:data
        })
    }catch(error){
        dispatch({
            type:ORDER_LIST_MY_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}