import {
    PRODUCT_LIST_FAILED,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,

    PRODUCT_DETAIL_FAILED,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,

    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,

    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_RESET,

    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS
} from '../constants/products'
import axios from 'axios';

export const productListAction = (keyword) => async (dispatch) =>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data} = await axios.get(`/api/product?keyword=${keyword}`);
     
        dispatch({type:PRODUCT_LIST_SUCCESS,
                payload:data.products
        })
    }catch(error){
        dispatch({
            type:PRODUCT_LIST_FAILED,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}

export const detailAction = (id) => async (dispatch) =>{
    try{
        dispatch({type:PRODUCT_DETAIL_REQUEST});

        const {data} = await axios.get(`/api/product/${id}`);

        dispatch({type:PRODUCT_DETAIL_SUCCESS,
                payload:data.product
        })
    }catch(error){
        dispatch({
            type:PRODUCT_DETAIL_FAILED,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}

export const productdeleteAction = (id) => async (dispatch,getState) =>{
    try{
        dispatch({type:PRODUCT_DELETE_REQUEST});

        const {userList:{userInfo}} = getState();

        const config ={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(`/api/product/${id}`,config);

        dispatch({type:PRODUCT_DELETE_SUCCESS,
                payload:data
        })
    }catch(error){
        dispatch({
            type:PRODUCT_DELETE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}

export const createProductAction = () => async (dispatch,getState) =>{
    try{
        dispatch({type:PRODUCT_CREATE_REQUEST});

        const {userList:{userInfo}} = getState();

        const config ={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/product/newProduct`,config);

        dispatch({type:PRODUCT_CREATE_SUCCESS,
                payload:data
        })
    }catch(error){
        dispatch({
            type:PRODUCT_CREATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}

export const updateProductAction = (id,Pdata) => async (dispatch,getState) =>{
    try{
        dispatch({type:PRODUCT_UPDATE_REQUEST});

        const {userList:{userInfo}} = getState();
        const config ={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/product/${id}`,Pdata,config);

        dispatch({type:PRODUCT_UPDATE_SUCCESS,
                payload:data
        })
    }catch(error){
        dispatch({
            type:PRODUCT_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}

export const productReviewAction = (id,Pdata) => async (dispatch,getState) =>{
    try{
        dispatch({type:PRODUCT_CREATE_REVIEW_REQUEST});

        const {userList:{userInfo}} = getState();
        const config ={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/product/${id}/review`,Pdata,config);

        dispatch({type:PRODUCT_CREATE_REVIEW_SUCCESS,
                payload:data
        })
    }catch(error){
        dispatch({
            type:PRODUCT_CREATE_REVIEW_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message
            :error.message
        })
    }
}