import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { detailRedu, productListRedu } from './reducers/productReducer';
import { CartOperationRedu } from './reducers/cartReducer';

const reducers = combineReducers({
    productList:productListRedu,
    detailList:detailRedu,
    cartList:CartOperationRedu
});



const cartItemStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :
[];

const initialState = {
    cartList:{cartItems:cartItemStorage}
};

const middleWares = [thunk];
const store = createStore(reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWares))
    );

export default store