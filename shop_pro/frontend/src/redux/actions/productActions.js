import {
    PRODUCT_LIST_FAILED,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,

    PRODUCT_DETAIL_FAILED,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS
} from '../constants/products'
import axios from 'axios';

export const productListAction = () => async (dispatch) =>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST});

        const {data} = await axios.get('/api/product');

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