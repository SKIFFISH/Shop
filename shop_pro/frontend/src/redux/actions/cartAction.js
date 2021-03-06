import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,

    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cart'
import axios from 'axios';

export const addToCartAction = (id,qty) => async (dispatch,getState) =>{
    try{
        const {data} = await axios.get(`/api/product/${id}`);

        dispatch({type:CART_ADD_ITEM,
                payload:{
                    product:data.product._id,
                    name:data.product.name,
                    price:data.product.price,
                    image:data.product.image,
                    countInStock:data.product.countInStock,
                    qty:qty
                }
        });

        localStorage.setItem('cartItems',JSON.stringify(getState().cartList.cartItems))
    }catch(error){
        console.error(error.response && error.response.data.message ? error.response.data.message
            :error.message);
    }
}


export const deleteFromCart = (id) => async (dispatch,getState) =>{
    try{

        dispatch({
            type:CART_REMOVE_ITEM,
            payload:id
                    
        });
        console.log(id)
        localStorage.setItem('cartItems',JSON.stringify(getState().cartList.cartItems))
    }catch(error){

        console.error(error.response && error.response.data.message ? error.response.data.message
            :error.message);
    }
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    })
  
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  }

  export const savePaymentAddress = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    })
  
    localStorage.setItem('paymentMethod', JSON.stringify(data))
  }