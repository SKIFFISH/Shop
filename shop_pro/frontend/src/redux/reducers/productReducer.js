import {
    PRODUCT_LIST_FAILED,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,

    PRODUCT_DETAIL_FAILED,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,

    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS
} from '../constants/products'

export const productListRedu = (state = {products:[]},action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {...state,loading:true}
        case PRODUCT_LIST_SUCCESS:
            return {loading:false,products:action.payload};
        case PRODUCT_LIST_FAILED:
            return {...state,loading:false,error:action.payload};
        default:
            return state
    }
}

export const detailRedu = (state = {product:{}},action) => {
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return {...state,loading:true}
        case PRODUCT_DETAIL_SUCCESS:
            return {loading:false,product:action.payload};
        case PRODUCT_DETAIL_FAILED:
            return {...state,loading:false,error:action.payload};
        default:
            return state
    }
}


export const deleteProductRedu = (state = {},action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading:true}
        case PRODUCT_DELETE_SUCCESS:
            return {loading:false,meessage:action.payload};
        case PRODUCT_DELETE_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state
    }
}