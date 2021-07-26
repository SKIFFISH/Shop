import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { createProductRedu, deleteProductRedu, detailRedu, productListRedu, productReviewRedu, updateProductRedu } from './reducers/productReducer';
import { CartOperationRedu } from './reducers/cartReducer';
import { deleteUserRedu, userDetailRedu, userListlRedu, userLoginRedu, userRegistRedu, userUpdateDetailRedu } from './reducers/userReducer';
import { createOrderRedu, myOrdersRedu, orderDetailRedu, orderPayRedu } from './reducers/orderRedu';

const reducers = combineReducers({
    productList:productListRedu,
    detailList:detailRedu,
    cartList:CartOperationRedu,
    userList:userLoginRedu,
    registList:userRegistRedu,
    orderList:createOrderRedu,
    orderDetailList:orderDetailRedu,
    payresultList:orderPayRedu,
    profileList:userDetailRedu,
    UpdateProfileList:userUpdateDetailRedu,
    orderMyList:myOrdersRedu,
    allUserList:userListlRedu,
    deleteUserList:deleteUserRedu,  
    deleteProductList:deleteProductRedu,
    createProductList:createProductRedu,
    updateProductList:updateProductRedu,
    reviewList:productReviewRedu
});



const cartItemStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :
[];

const userStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) :
null;

const shipStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) :
{};

const payment = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) :
null;


const initialState = {
    cartList:{
        cartItems:cartItemStorage,
        shippingAddress:shipStorage,
        paymentMethod:payment
    },
    userList:{userInfo:userStorage}
};

const middleWares = [thunk];
const store = createStore(reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWares))
    );

export default store