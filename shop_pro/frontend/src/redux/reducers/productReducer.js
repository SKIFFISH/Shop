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
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_SUCCESS,

    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS
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

export const detailRedu = (state = {product:{ reviews: []}},action) => {
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


export const createProductRedu = (state = {},action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading:true}
        case PRODUCT_CREATE_SUCCESS:
            return {loading:false,product:action.payload};
        case PRODUCT_CREATE_FAIL:
            return {loading:false,error:action.payload};
        case PRODUCT_CREATE_RESET:
            return {};
        default:
            return state
    }
}

export const updateProductRedu = (state = { product: {} },action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading:true}
        case PRODUCT_UPDATE_SUCCESS:
            return {loading:false,product:action.payload};
        case PRODUCT_UPDATE_FAIL:
            return {loading:false,error:action.payload};
        case PRODUCT_UPDATE_RESET:
            return {};
        default:
            return state
    }
}

export const productReviewRedu = (state = { },action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading:true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading:false,message:action.payload};
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading:false,error:action.payload};
        case PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state
    }
}